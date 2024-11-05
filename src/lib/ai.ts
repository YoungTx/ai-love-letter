import { systemPrompts, type PromptKey } from "@/config/prompts";

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
    if(true){
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Love Letter</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&family=Noto+Serif+JP&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Noto Serif SC', serif;
            background: linear-gradient(135deg, #f3e5f5, #e1bee7);
        }
    </style>
</head>
<body class="flex items-center justify-center h-screen">
    <div class="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-4 rounded-lg shadow-lg bg-white bg-opacity-80">
        <div class="flex-1">
            <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.5)" />
            </svg>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center text-center p-4">
            <h1 class="text-2xl font-bold">A Love Letter</h1>
            <p class="text-lg">给我的男孩和狗</p>
            <p class="text-lg">私の少年と犬へ</p>
            <p class="mt-4 text-lg">You are the boy who brings joy to my heart,<br>你是让我心中充满快乐的男孩，<br>君は私の心に喜びをもたらす少年。 </p>
            <p class="mt-2 text-lg">With a loyal dog by your side,<br>身边有一只忠诚的狗，<br>そばに忠実な犬がいる。 </p>
            <p class="mt-2 text-lg">Together, you both light up my world.<br>你们一起照亮了我的世界。<br>二人とも私の世界を照らしている。 </p>
        </div>
    </div>
</body>
</html>
`"
    }
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