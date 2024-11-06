import { NextRequest } from "next/server";
import { systemPrompts } from "@/config/prompts";

export async function POST(request: NextRequest) {
  try {
    const { prompt, config, locale } = await request.json();

    if (!config?.apiKey) {
      return new Response(JSON.stringify({ error: "API key is not configured" }), {
        status: 400,
      });
    }

    const systemPrompt = systemPrompts[locale as keyof typeof systemPrompts].love_letter;
    
    if (config.provider === "openai") {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model || "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 8192
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error response:', errorText);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      try {
        const data = await response.json();
        return new Response(JSON.stringify({ content: data.choices[0].message.content.trim() }));
      } catch (error) {
        console.error('Error parsing OpenAI response:', error);
        throw new Error('Invalid response format from OpenAI');
      }
    } else {
      const response = await fetch(`${config.baseUrl}/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: config.model || "claude-3-sonnet-20240229",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: `${systemPrompt}\n\n${prompt}`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Anthropic API error response:', errorText);
        throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
      }

      try {
        const data = await response.json();
        return new Response(JSON.stringify({ content: data.content[0].text.trim() }));
      } catch (error) {
        console.error('Error parsing Anthropic response:', error);
        throw new Error('Invalid response format from Anthropic');
      }
    }
  } catch (error) {
    console.error('Generation error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Failed to generate content",
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
    });
  }
} 