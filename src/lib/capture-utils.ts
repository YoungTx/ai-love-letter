import html2canvas from 'html2canvas';

export async function captureElement(elementId: string): Promise<string | null> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return null;
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // 提高导出图片质量
      logging: false,
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing element:', error);
    return null;
  }
} 