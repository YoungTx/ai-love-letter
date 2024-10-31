"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: Locale) => {
    console.log('currentLocale', currentLocale);
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Select.Root value={currentLocale} onValueChange={handleLocaleChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm bg-background border border-input hover:bg-accent hover:text-accent-foreground w-[120px]"
        aria-label="Language"
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-popover rounded-md border shadow-md w-[120px] animate-in fade-in-80"
          position="popper"
          sideOffset={5}
          align="end"
        >
          <Select.Viewport>
            {locales.map((locale) => (
              <Select.Item
                key={locale}
                value={locale}
                className={cn(
                  "relative flex items-center justify-between",
                  "px-3 py-2 text-sm data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-none select-none",
                  "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                  "data-[state=checked]:bg-primary/10"
                )}
              >
                <Select.ItemText>{localeNames[locale]}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
} 