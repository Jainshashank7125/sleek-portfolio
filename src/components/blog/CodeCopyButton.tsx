'use client';

import { Check, Copy } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code', error);
    }
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      aria-label={isCopied ? 'Code copied' : 'Copy code'}
      className="absolute top-3 right-3 inline-flex min-h-11 items-center gap-2 border border-white/25 bg-[#15191f] px-3 font-mono text-[0.65rem] tracking-[0.08em] text-white uppercase opacity-100 transition-colors hover:border-white focus-visible:opacity-100 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
    >
      {isCopied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {isCopied ? 'Copied' : 'Copy'}
    </button>
  );
}
