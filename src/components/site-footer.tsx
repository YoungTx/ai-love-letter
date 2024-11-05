import { Heart } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧：版权信息 */}
          <div className="space-y-2">
            <h3 className="font-semibold">Love Letter AI</h3>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* 中间：链接 */}
          <div className="space-y-2">
            <h3 className="font-semibold">Links</h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="https://github.com/yourusername/ai-love-letter"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Developer
                </a>
              </li>
            </ul>
          </div>

          {/* 右侧：制作者信息 */}
          <div className="space-y-2">
            <h3 className="font-semibold">Made with love</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with 
              <Heart className="h-4 w-4 text-red-500 animate-pulse" /> 
              by{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                Your Name
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 