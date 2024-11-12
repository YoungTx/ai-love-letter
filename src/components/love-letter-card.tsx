"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Heart, Share2, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { LoveLetterDisplay } from "./love-letter-display";

interface LoveLetterCardProps {
  letter: {
    id: string;
    content: string;
    prompt: string;
    created_at: string;
    user_id: string;
    is_public: boolean;
    model?: string;
    api_host?: string;
    _count?: {
      favorites: number;
    };
  };
}

export function LoveLetterCard({ letter }: LoveLetterCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("history");

  return (
    <>
      {/* 卡片预览 */}
      <div 
        onClick={() => setIsOpen(true)}
        className="cursor-pointer group"
      >
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg border bg-card">
          <div className="absolute inset-0 scale-90">
            <LoveLetterDisplay 
              code={letter.content} 
              waitingText=""
              previewMode
            />
          </div>
          
          {/* 卡片信息覆盖层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(letter.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{letter._count?.favorites || 0}</span>
              </div>
              {letter.is_public && (
                <Share2 className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 详情弹出层 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 情书预览 */}
            <div className="aspect-[3/4] relative rounded-lg border bg-card overflow-hidden">
              <LoveLetterDisplay 
                code={letter.content} 
                waitingText=""
              />
            </div>

            {/* 详细信息 */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{t("promptTitle")}</h3>
                <p className="text-muted-foreground">{letter.prompt}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">{t("details")}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(letter.created_at).toLocaleString()}
                  </div>
                  {letter.model && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {letter.model}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  {letter._count?.favorites || 0} {t("favorites")}
                </Button>
                {letter.is_public && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {t("share")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 