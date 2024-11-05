"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Sparkles } from "lucide-react";
import { ApiConfigDialog } from "./api-config-dialog";
import { LoveLetterDisplay } from "./love-letter-display";
import { generateLoveLetter } from "@/lib/ai";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { captureElement } from "@/lib/utils";

interface ApiConfig {
  provider: "openai" | "anthropic";
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

const defaultConfig: ApiConfig = {
  provider: "openai",
  apiKey: "",
  baseUrl: "https://api.openai.com/v1",
  model: "gpt-3.5-turbo"
};

export function LoveLetterGenerator() {
  const t = useTranslations();
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [config] = useLocalStorage<ApiConfig>("api-config", defaultConfig);

  const handleGenerate = async () => {
    if (!config?.apiKey) {
      alert(t("apiConfig.error.noConfig"));
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateLoveLetter(input, config, locale);
      console.log('result', result);
      
      setCode(result);
    } catch (error) {
      console.error(error);
      alert(t("apiConfig.error.failed"));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      const imageData = await captureElement('love-letter-content');
      if (imageData) {
        const link = document.createElement('a');
        link.download = `love-letter-${new Date().getTime()}.png`;
        link.href = imageData;
        link.click();
      }
    } catch (error) {
      console.error('Failed to save image:', error);
      alert(t("result.saveFailed"));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 标题部分 */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-transparent bg-clip-text">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>
      
      {/* 输入部分 */}
      <div className="space-y-6 bg-card/50 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full min-h-[200px] p-4 rounded-lg border bg-background/50 
            resize-none focus:outline-none focus:ring-2 focus:ring-primary/50
            placeholder:text-muted-foreground/60"
          placeholder={t('input.placeholder')}
          disabled={isGenerating}
        />
        
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="w-full h-12 bg-primary text-primary-foreground rounded-lg 
            font-medium hover:bg-primary/90 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {isGenerating ? t('input.generating') : t('input.button')}
        </button>
      </div>

      {/* 结果部分 */}
      <div className="space-y-6 bg-card/50 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {t('result.title')}
          </h2>
          <div className="flex items-center gap-4">
            <ApiConfigDialog />
            {code && (
              <button 
                onClick={handleShare}
                className="px-4 py-2 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-secondary/70 transition-colors"
              >
                {t('result.save')}
              </button>
            )}
          </div>
        </div>

        <div className="min-h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted/50">
          <LoveLetterDisplay 
            code={code} 
            waitingText={t('result.waiting')} 
          />
        </div>
      </div>
    </div>
  );
} 