"use client";
import { useEffect, useRef } from "react";

const useMvTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, any>,
  height = 600,
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<any>(null); // TradingView widget 实例

  useEffect(() => {
    if (!containerRef.current) return;

    // 清理旧 widget
    if (widgetRef.current) {
      widgetRef.current.remove?.();
      containerRef.current.innerHTML = "";
      widgetRef.current = null;
    }

    // 创建 widget 容器
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.width = "100%";
    widgetContainer.style.height = `${height}px`;
    containerRef.current.appendChild(widgetContainer);

    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) return;

    const initWidget = () => {
      widgetRef.current = new (window as any).TradingView.widget({
        ...config,
        container_id: widgetContainer,
      });
    };

    // 动态加载 TradingView 脚本
    if (!(window as any).TradingView) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = initWidget;
      containerRef.current.appendChild(script);
    } else {
      initWidget();
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove?.();
        widgetRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useMvTradingViewWidget;
