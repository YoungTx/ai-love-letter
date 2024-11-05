"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoveLetterDisplayProps {
  code?: string;
  className?: string;
  waitingText: string;
}

export function LoveLetterDisplay({ code, className, waitingText }: LoveLetterDisplayProps) {
  console.log('Original code:', code);
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
      // 从反引号中提取 HTML 内容
      // const htmlMatch = code.match(/`([\s\S]*?)`/);
      // if (!htmlMatch) {
      //   throw new Error('No HTML content found in backticks');
      // }
      const htmlCode = code
      console.log('Extracted HTML:', htmlCode);

      // 提取 body 标签和其内容
      const bodyMatch = htmlCode.match(/<body([^>]*)>([\s\S]*)<\/body>/i);
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
      const styleMatch = htmlCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
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