"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogIn, LogOut, User, History, Heart, Github, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function AuthButton() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth");
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/${locale}/auth/callback`,
          queryParams: { locale }
        }
      });

      if (error) {
        console.error('Sign in error:', error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/${locale}/auth/callback`,
          queryParams: { locale }
        }
      });

      if (error) {
        console.error('Google sign in error:', error);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return <Button variant="ghost" disabled>{t("loading")}</Button>;
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {user.user_metadata.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => router.push(`/${locale}/history`)}>
            <History className="h-4 w-4 mr-2" />
            {t("myLetters")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${locale}/favorites`)}>
            <Heart className="h-4 w-4 mr-2" />
            {t("favorites")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            {t("signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          {t("signIn")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleSignIn}>
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGoogleSignIn}>
          <Mail className="h-4 w-4 mr-2" />
          Google
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 