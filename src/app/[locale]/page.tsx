import { LoveLetterGenerator } from "@/components/love-letter-generator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-background to-background" />
      
      <SiteHeader />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <LoveLetterGenerator />
      </main>
      
      <SiteFooter />
    </div>
  );
}
