import { LoveLetterGenerator } from "@/components/love-letter-generator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <LoveLetterGenerator />
      </main>
      <SiteFooter />
    </div>
  );
}
