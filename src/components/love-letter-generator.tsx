"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LoveLetterDisplay } from "./love-letter-display";
import { captureElement } from "@/lib/utils";

export function LoveLetterGenerator() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [code, setCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // 这里是示例代码，实际应该调用 AI API
      setTimeout(() => {
        const generatedCode = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>三行情书：夏夜私语</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- 引入书法字体 -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap">
</head>
<body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-4">
  <div class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20">
    <!-- 标题 -->
    <div class="text-center p-6">
      <h1 class="text-4xl font-bold text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">夏夜私语</h1>
      <p class="text-sm text-white/80 italic" style="font-family: 'Noto Serif SC', serif;">Summer Night's Whisper</p>
      <p class="text-sm text-white/80" style="font-family: 'Noto Serif SC', serif;">夏の夜のささやき</p>
    </div>
    <!-- SVG 图片 -->
    <div class="flex items-center justify-center p-4">
      <svg viewBox="0 0 200 200" class="w-32 h-32">
        <!-- 月亮 -->
        <path d="M160 100c0-33.137-26.863-60-60-60-33.137 0-60 26.863-60 60 0 33.137 26.863 60 60 60 33.137 0 60-26.863 60-60zm-100 0c0-22.091 17.909-40 40-40 22.091 0 40 17.909 40 40s-17.909 40-40 40c-22.091 0-40-17.909-40-40z" fill="#FFF5D6"/>
        <!-- 星星 -->
        <g id="stars">
          <circle cx="40" cy="40" r="2" fill="white"/>
          <circle cx="160" cy="40" r="2" fill="white"/>
          <circle cx="100" cy="20" r="2" fill="white"/>
          <circle cx="180" cy="100" r="2" fill="white"/>
          <circle cx="20" cy="160" r="2" fill="white"/>
          <circle cx="140" cy="160" r="2" fill="white"/>
        </g>
        <!-- 萤火虫 -->
        <g class="firefly">
          <circle cx="80" cy="120" r="3" fill="#E2FF00" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="120" cy="80" r="3" fill="#E2FF00" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    </div>
    <!-- 诗句 -->
    <div class="p-6 space-y-8">
      <!-- 诗句 1 -->
      <div class="text-center p-3 rounded-lg">
        <p class="text-2xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">繁星点点，是你眼中的温柔</p>
        <p class="text-sm text-white/60 italic" style="font-family: 'Noto Serif SC', serif;">The twinkling stars are the gentleness in your eyes</p>
        <p class="text-sm text-white/60" style="font-family: 'Noto Serif SC', serif;">瞬く星々は、君の瞳の中の優しさ</p>
      </div>
      <!-- 诗句 2 -->
      <div class="text-center p-3 rounded-lg">
        <p class="text-2xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">弯月如钩，勾起我心底思念</p>
        <p class="text-sm text-white/60 italic" style="font-family: 'Noto Serif SC', serif;">The crescent moon hooks my deepest longing</p>
        <p class="text-sm text-white/60" style="font-family: 'Noto Serif SC', serif;">三日月が、私の心の奥の想いを掬い上げる</p>
      </div>
      <!-- 诗句 3 -->
      <div class="text-center p-3 rounded-lg">
        <p class="text-2xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">萤火虫飞过，带走我的秘密</p>
        <p class="text-sm text-white/60 italic" style="font-family: 'Noto Serif SC', serif;">The fireflies fly by, carrying away my secrets</p>
        <p class="text-sm text-white/60" style="font-family: 'Noto Serif SC', serif;">蛍が飛び去り、私の秘密を連れ去る</p>
      </div>
    </div>
  </div>

  <style>
    @keyframes twinkle {
      0% { opacity: 1; }
      50% { opacity: 0.3; }
      100% { opacity: 1; }
    }
    #stars circle {
      animation: twinkle 2s infinite;
    }
    #stars circle:nth-child(2n) {
      animation-delay: 0.5s;
    }
    #stars circle:nth-child(3n) {
      animation-delay: 1s;
    }
  </style>
</body>
</html>`;
        
        setCode(generatedCode);
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const imageData = await captureElement('love-card');
    if (imageData) {
      const link = document.createElement('a');
      link.download = '我的情书.png';
      link.href = imageData;
      link.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('description')}
        </p>
      </div>
      
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full min-h-[200px] p-4 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder={t('input.placeholder')}
          disabled={isGenerating}
        />
        
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? t('input.generating') : t('input.button')}
        </button>
      </div>

      <div className="border rounded-lg p-6 space-y-4 bg-card">
        <h2 className="text-xl font-semibold">{t('result.title')}</h2>
        <LoveLetterDisplay code={code} waitingText={t('result.waiting')} />
        
        {code && (
          <div className="flex gap-2 pt-4">
            <button 
              onClick={handleShare}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {t('result.save')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 