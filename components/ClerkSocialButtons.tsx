"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";

type ProviderItem = {
  name: string;
  strategy: "oauth_google" | "oauth_github" | "oauth_linkedin";
};

const providerOptions: ProviderItem[] = [
  { name: "Google", strategy: "oauth_google" },
  { name: "GitHub", strategy: "oauth_github" },
  { name: "LinkedIn", strategy: "oauth_linkedin" },
];

const buttonClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400";

interface SocialButtonsProps {
  mode: "sign-in" | "sign-up";
}

function getRedirectUrl() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.href;
}

function getCompleteRedirectUrl() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return `${window.location.origin}/dashboard`;
}

export function ClerkSocialButtons({ mode }: SocialButtonsProps) {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const signInState = useSignIn();
  const signUpState = useSignUp();

  const isLoaded = mode === "sign-in" ? !!signInState.signIn : !!signUpState.signUp;
  const isDisabled = !isLoaded || loadingStrategy !== null;

  const handleClick = async (strategy: ProviderItem["strategy"]) => {
    setLoadingStrategy(strategy);

    const redirectUrl = getRedirectUrl();
    const actionCompleteRedirectUrl = getCompleteRedirectUrl();

    try {
      if (mode === "sign-in") {
        if (!signInState.signIn) {
          return;
        }

        await signInState.signIn.create({
          strategy,
          redirectUrl: redirectUrl ?? "",
          actionCompleteRedirectUrl: actionCompleteRedirectUrl ?? "",
          signUpIfMissing: true,
        });
      } else {
        if (!signUpState.signUp) {
          return;
        }

        await signUpState.signUp.create({
          strategy,
          redirectUrl: redirectUrl ?? "",
          actionCompleteRedirectUrl: actionCompleteRedirectUrl ?? "",
        });
      }
    } catch (error) {
      console.error("Social auth error", error);
      setLoadingStrategy(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-500">
          Use one of the social providers below to {mode === "sign-in" ? "sign in" : "sign up"}.
        </p>
      </div>

      <div className="grid gap-3">
        {providerOptions.map((provider) => (
          <button
            key={provider.strategy}
            type="button"
            className={buttonClassName}
            disabled={isDisabled}
            onClick={() => handleClick(provider.strategy)}
          >
            {loadingStrategy === provider.strategy
              ? `Opening ${provider.name}…`
              : `Continue with ${provider.name}`}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase tracking-[0.25em] text-slate-400">or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
}
