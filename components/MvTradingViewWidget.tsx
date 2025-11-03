"use client";

import React, { memo } from "react";
import useMvTradingViewWidget from "@/hooks/useMvTradingViewWidget";
import { cn } from "@/lib/utils";

interface MvTradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, any>;
  height?: number;
  className?: string;
}

const MvTradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: MvTradingViewWidgetProps) => {
  const containerRef = useMvTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}
      <div
        className={cn("tradingview-widget-container", className)}
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        />
      </div>
    </div>
  );
};

export default memo(MvTradingViewWidget);
