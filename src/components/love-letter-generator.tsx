"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LoveLetterDisplay } from "./love-letter-display";
import { captureElement } from "@/lib/utils";

export function LoveLetterGenerator() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: 调用 AI API 生成情书
    // 临时模拟数据
    setTimeout(() => {
      setLines([
        "晨曦微露时分想你",
        "午后阳光里等你",
        "夜幕降临时吻你"
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleShare = async () => {
    const imageData = await captureElement('love-letter-content');
    if (imageData) {
      const link = document.createElement('a');
      link.download = '我的三行情书.png';
      link.href = imageData;
      link.click();
    }
  };

  const handleCopy = () => {
    const text = lines.map(line => `「${line}」`).join('\n');
    navigator.clipboard.writeText(text);
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
        <LoveLetterDisplay lines={lines} waitingText={t('result.waiting')} />
        
        {lines.length > 0 && (
          <div className="flex gap-2 pt-4">
            <button 
              onClick={handleCopy}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {t('result.copy')}
            </button>
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