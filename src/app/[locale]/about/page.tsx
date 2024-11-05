import { useTranslations } from 'next-intl';
import { Github, Heart, Star, Coffee } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      {/* 标题部分 */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-transparent bg-clip-text">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('description')}
        </p>
      </div>

      {/* 主要内容 */}
      <div className="space-y-12">
        {/* 项目介绍 */}
        <section className="space-y-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {t('project.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('project.description')}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <a
              href="https://github.com/yourusername/ai-love-letter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-secondary/70 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://github.com/yourusername/ai-love-letter/stargazers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-secondary/70 transition-colors"
            >
              <Star className="w-4 h-4" />
              {t('project.star')}
            </a>
          </div>
        </section>

        {/* 技术栈 */}
        <section className="space-y-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {t('tech.title')}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Next.js 14', description: t('tech.nextjs') },
              { name: 'React Server Components', description: t('tech.rsc') },
              { name: 'Tailwind CSS', description: t('tech.tailwind') },
              { name: 'TypeScript', description: t('tech.typescript') },
              { name: 'next-intl', description: t('tech.nextIntl') },
              { name: 'Lucide Icons', description: t('tech.lucide') },
            ].map((tech, index) => (
              <li key={index} className="p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 支持项目 */}
        <section className="space-y-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border shadow-sm text-center">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {t('support.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('support.description')}
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <a
              href="https://github.com/yourusername/ai-love-letter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Heart className="w-4 h-4" />
              {t('support.star')}
            </a>
            <a
              href="https://www.buymeacoffee.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-secondary/70 transition-colors"
            >
              <Coffee className="w-4 h-4" />
              {t('support.coffee')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 