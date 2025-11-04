"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

export default function useMvTradingViewWidget(
  scriptUrl: string,
  config: Record<string, any>,
  height: number,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  const loadScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.TradingView) {
        resolve();
        return;
      }
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${scriptUrl}"]`,
      );
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject());
        return;
      }

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }, [scriptUrl]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let isMounted = true;

    const initWidget = async () => {
      await loadScript();
      if (!isMounted || !window.TradingView || !containerRef.current) return;

      // 清理旧实例
      if (widgetRef.current?.remove) widgetRef.current.remove();

      widgetRef.current = new window.TradingView.widget({
        ...config,
        container: containerRef.current, // ✅ 用 DOM 元素，不用 id
        height,
      });
    };

    initWidget();

    return () => {
      isMounted = false;
      if (widgetRef.current?.remove) widgetRef.current.remove();
    };
  }, [loadScript, config, height]);

  useEffect(() => {
    if (!widgetRef.current || !config?.symbol) return;
    try {
      widgetRef.current.setSymbol(config.symbol, config.interval || "1D");
    } catch {}
  }, [config.symbol]);

  return containerRef;
}
