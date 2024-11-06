"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoveLetterDisplayProps {
  code?: string;
  className?: string;
  waitingText: string;
}

export function LoveLetterDisplay({ code, className, waitingText }: LoveLetterDisplayProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (code && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(code);
        iframeDocument.close();

        // 调整 iframe 高度以适应内容
        const resizeObserver = new ResizeObserver(() => {
          if (iframeDocument.body) {
            iframe.style.height = `${iframeDocument.body.scrollHeight}px`;
          }
        });

        resizeObserver.observe(iframeDocument.body);

        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [code]);

  if (!code) {
    return (
      <div className="text-muted-foreground italic text-center">
        {waitingText}
      </div>
    );
  }

  return (
    <div 
      id="love-letter-content"
      className={cn(
        "w-full min-h-[400px]",
        className || ""
      )}
    >
      <iframe
        ref={iframeRef}
        className="w-full border-none"
        title="love-letter"
        sandbox="allow-same-origin"
      />
    </div>
  );
}