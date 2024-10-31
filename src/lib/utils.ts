import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import html2canvas from "html2canvas";

export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}

export async function captureElement(elementId: string): Promise<string | null> {
  try {
    const element = document.getElementById(elementId);
    if (!element) return null;

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // 提高截图质量
    });
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('截图失败:', error);
    return null;
  }
} 