"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoveLetterDisplayProps {
  code?: string;
  className?: string;
  waitingText: string;
}

export function LoveLetterDisplay({ code, className, waitingText }: LoveLetterDisplayProps) {
  code = false ? `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>夜牧寄思</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
</head>
<body class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
  <div class="w-full max-w-6xl backdrop-blur-sm rounded-xl overflow-hidden">
    <div class="flex flex-col md:flex-row h-full">
      <div class="w-full md:w-5/12 p-8 flex items-center justify-center">
        <svg viewBox="0 0 400 400" class="w-full h-full">
          <!-- 星空背景 -->
          <g class="stars">
            <circle cx="50" cy="50" r="1" fill="white" class="star"/>
            <circle cx="150" cy="80" r="1" fill="white" class="star"/>
            <circle cx="250" cy="60" r="1" fill="white" class="star"/>
            <circle cx="350" cy="90" r="1" fill="white" class="star"/>
            <circle cx="100" cy="150" r="1" fill="white" class="star"/>
            <circle cx="200" cy="120" r="1" fill="white" class="star"/>
            <circle cx="300" cy="140" r="1" fill="white" class="star"/>
          </g>

          <!-- 月亮 -->
          <circle cx="320" cy="80" r="40" fill="#fef3c7" class="moon"/>
          <circle cx="310" cy="75" r="38" fill="#1e293b" class="moon-shadow"/>

          <!-- 草地剪影 -->
          <path d="M0 350 Q200 330 400 350 L400 400 L0 400 Z" 
                fill="#1e293b" 
                class="grass"/>

          <!-- 牛的剪影 -->
          <path d="M150 300 Q160 290 170 300 L180 290 L190 300 Q200 280 210 300 L220 290 Q230 280 240 290 L250 300 Q260 290 270 300 L280 290 L290 300 Z" 
                fill="#0f172a" 
                class="ox"/>
        </svg>
      </div>
      
      <div class="w-full md:w-7/12 p-8 flex flex-col justify-center space-y-8">
        <div class="text-center mb-8">
          <h1 class="text-4xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">夜牧寄思</h1>
          <p class="text-lg text-white/80" style="font-family: 'Noto Serif SC', serif;">Night Pastoral Longing</p>
          <p class="text-lg text-white/80" style="font-family: 'Noto Serif JP', serif;">夜の牧場に寄せる思い</p>
        </div>
        
        <div class="space-y-8">
          <div class="text-center">
            <p class="text-2xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">老牛低首，星河无语，</p>
            <p class="text-base text-white/70" style="font-family: 'Noto Serif SC', serif;">The old ox bows its head, the Milky Way remains silent,</p>
            <p class="text-base text-white/70" style="font-family: 'Noto Serif JP', serif;">老牛が首を垂れ、天の川は黙している</p>
          </div>
          
          <div class="text-center">
            <p class="text-2xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">月光织就思念千缕，</p>
            <p class="text-base text-white/70" style="font-family: 'Noto Serif SC', serif;">Moonlight weaves a thousand threads of longing,</p>
            <p class="text-base text-white/70" style="font-family: 'Noto Serif JP', serif;">月明かりが織りなす千筋の想い</p>
          </div>
          
          <div class="text-center">
            <p class="text-2xl text-white mb-2" style="font-family: 'Ma Shan Zheng', cursive;">远方可是你的归途？</p>
            <p class="text-base text-white/70" style="font-family: 'Noto Serif SC', serif;">Is that distant path your way home?</p>
            <p class="text-base text-white/70" style="font-family: 'Noto Serif JP', serif;">遠くの道は君の帰り道なのか</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .star {
      animation: twinkle 2s ease-in-out infinite;
    }
    
    .moon {
      filter: drop-shadow(0 0 15px rgba(254, 243, 199, 0.3));
    }
    
    .grass {
      animation: sway 4s ease-in-out infinite;
    }
    
    .ox {
      animation: breathe 3s ease-in-out infinite;
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    
    @keyframes sway {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(5px); }
    }
    
    @keyframes breathe {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(2px); }
    }
    
    .stars circle:nth-child(2n) {
      animation-delay: -1s;
    }
    
    .stars circle:nth-child(3n) {
      animation-delay: -1.5s;
    }
  </style>
</body>
</html>` : '';
    if (!code) {
    return (
      <div className="text-muted-foreground italic text-center">
        {waitingText}
      </div>
    );
  }

  // 提取内容和样式
  const htmlContent = React.useMemo(() => {
    try {
      // 提取 body 标签和其内容
      const bodyMatch = code.match(/<body([^>]*)>([\s\S]*)<\/body>/i);
      if (!bodyMatch) {
        throw new Error('No body content found');
      }

      // 提取 body 的 class 属性
      const bodyClassMatch = bodyMatch[1].match(/class="([^"]*)"/);
      const bodyClasses = bodyClassMatch ? bodyClassMatch[1] : '';

      // 提取第一个 div 及其类名
      const content = bodyMatch[2];
      const firstDivMatch = content.match(/<div([^>]*)>([\s\S]*)<\/div>/);
      if (!firstDivMatch) {
        throw new Error('No main div found');
      }

      // 提取 style 标签内容
      const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const styles = styleMatch ? styleMatch[1] : '';

      const divClassMatch = firstDivMatch[1].match(/class="([^"]*)"/);
      const divClasses = divClassMatch ? divClassMatch[1] : '';
      const innerContent = firstDivMatch[2].trim();

      // 合并 body 和第一个 div 的类名，但只保留布局相关的类
      const layoutClasses = bodyClasses
        .split(' ')
        .filter(cls => 
          cls.includes('flex') || 
          cls.includes('items-') || 
          cls.includes('justify-') ||
          cls.includes('min-h-') ||
          cls.includes('p-')
        )
        .join(' ');

      // 合并背景相关的类到内部 div
      const bgClasses = bodyClasses
        .split(' ')
        .filter(cls => 
          cls.includes('bg-') || 
          cls.includes('from-') || 
          cls.includes('via-') || 
          cls.includes('to-')
        )
        .join(' ');

      // 构建新的 HTML 结构，包含样式
      return {
        layoutClasses,
        content: `<div class="${cn(divClasses, bgClasses)}">${innerContent}</div>`,
        styles
      };
    } catch (error) {
      console.error('Failed to process HTML:', error);
      return null;
    }
  }, [code]);

  if (!htmlContent) {
    return (
      <div className="text-red-500 italic text-center">
        Failed to render content. Please check the code.
      </div>
    );
  }

  return (
    <div 
      id="love-letter-content"
      className={cn(
        "w-full",
        className || ''
      )}
    >
      <div 
        id="love-card"
        className="w-full flex justify-center"
        dangerouslySetInnerHTML={{ __html: htmlContent.content }}
      />
      {/* 渲染提取的样式 */}
      <style dangerouslySetInnerHTML={{ __html: htmlContent.styles }} />
    </div>
  );
}