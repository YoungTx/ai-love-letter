
interface ApiConfig {
  provider: "openai" | "anthropic";
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

export async function generateLoveLetter(
  prompt: string,
  config: ApiConfig,
  locale: string
): Promise<string> {
  if (!config.apiKey) {
    throw new Error("API key is not configured");
  }

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      config,
      locale,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate content');
  }

  const data = await response.json();
  const content = data.content.replace(/```html\n([\s\S]*?)```/g, '`$1`');
  return content;
} 