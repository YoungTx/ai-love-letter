"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface ApiConfig {
  provider: "openai" | "anthropic";
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

const defaultConfig: ApiConfig = {
  provider: "openai",
  apiKey: "",
  baseUrl: "https://api.openai.com/v1",
  model: "gpt-3.5-turbo"
};

export function ApiConfigDialog() {
  const t = useTranslations("apiConfig");
  const [isOpen, setIsOpen] = React.useState(false);
  const [config, setConfig] = useLocalStorage<ApiConfig>("api-config", defaultConfig);
  const [tempConfig, setTempConfig] = React.useState<ApiConfig>(config);

  const handleSave = () => {
    setConfig(tempConfig);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-secondary/70 transition-colors">
          <Settings className="w-4 h-4" />
          {t("configure")}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background rounded-lg shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {t("title")}
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-muted">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("provider")}
              </label>
              <select
                value={tempConfig.provider}
                onChange={(e) => setTempConfig(prev => ({
                  ...prev,
                  provider: e.target.value as "openai" | "anthropic",
                  baseUrl: e.target.value === "openai" ? "https://api.openai.com/v1" : "https://api.anthropic.com",
                  model: e.target.value === "openai" ? "gpt-3.5-turbo" : "claude-3-sonnet-20240229"
                }))}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("apiKey")}
              </label>
              <input
                type="password"
                value={tempConfig.apiKey}
                onChange={(e) => setTempConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border bg-background"
                placeholder={t("apiKeyPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("baseUrl")}
              </label>
              <input
                type="text"
                value={tempConfig.baseUrl}
                onChange={(e) => setTempConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border bg-background"
                placeholder={tempConfig.provider === "openai" ? "https://api.openai.com/v1" : "https://api.anthropic.com"}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("model")}
              </label>
              <select
                value={tempConfig.model}
                onChange={(e) => setTempConfig(prev => ({ ...prev, model: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                {tempConfig.provider === "openai" ? (
                  <>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                  </>
                ) : (
                  <>
                    <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                    <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
                    <option value="claude-3-haiku-20240307">Claude 3 Haiku</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Dialog.Close className="px-4 py-2 rounded-md hover:bg-muted">
              {t("cancel")}
            </Dialog.Close>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("save")}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 