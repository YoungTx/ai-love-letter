import { cn } from "@/lib/utils";

interface LoveLetterDisplayProps {
  lines?: string[];
  className?: string;
  waitingText: string;
}

export function LoveLetterDisplay({ lines = [], className, waitingText }: LoveLetterDisplayProps) {
  return (
    <div 
      id="love-letter-content"
      className={cn(
        "relative p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg",
        "min-h-[240px] flex flex-col justify-center",
        "border border-pink-100 dark:border-pink-900",
        className || ""
      )}
    >
      <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-800 opacity-50" />
      <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-800 opacity-50" />
      <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-800 opacity-50" />
      <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-pink-100 dark:bg-pink-800 opacity-50" />
      
      <div className="space-y-6 text-center">
        {lines.length > 0 ? (
          lines.map((line, index) => (
            <p 
              key={index}
              className="text-lg font-serif italic text-gray-800 dark:text-gray-200"
            >
              「{line}」
            </p>
          ))
        ) : (
          <div className="text-muted-foreground italic">
            {waitingText}
          </div>
        )}
      </div>
    </div>
  );
} 