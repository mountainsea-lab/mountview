"use client";

import { useState } from "react";
import MvTradingViewWidget from "@/components/MvTradingViewWidget";
import { MV_MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function StrategyPage() {
  const [isTopPanelCollapsed, setIsTopPanelCollapsed] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");

  const scriptUrl = `/charting_library/`;

  // 币种列表
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部面板 - 可向上收缩 */}
      <div
        className={`
          transition-all duration-300 overflow-hidden
          ${isTopPanelCollapsed ? "h-12" : "h-auto"}
        `}
      >
        {/* 收缩/展开按钮 */}
        <div className="flex justify-between items-center bg-gray-800 border-b border-gray-700 px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-100">策略控制面板</h2>
          <button
            onClick={() => setIsTopPanelCollapsed(!isTopPanelCollapsed)}
            className="bg-gray-700 hover:bg-gray-600 rounded-lg p-2 transition-colors"
            aria-label={isTopPanelCollapsed ? "展开面板" : "收缩面板"}
          >
            {isTopPanelCollapsed ? (
              <ChevronDown className="w-5 h-5 text-gray-200" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-200" />
            )}
          </button>
        </div>

        {/* 面板内容 - 只在展开时显示 */}
        {!isTopPanelCollapsed && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800">
            {/* 资产统计 */}
            <section className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-md font-semibold text-gray-100 mb-3">
                资产统计
              </h3>
              <div className="space-y-2 text-sm text-gray-200">
                <div className="flex justify-between">
                  <span>总资产:</span>
                  <span className="font-semibold">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>可用余额:</span>
                  <span>$5,000</span>
                </div>
              </div>
            </section>

            {/* 收益统计 */}
            <section className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-md font-semibold text-gray-100 mb-3">
                收益统计
              </h3>
              <div className="space-y-2 text-sm text-gray-200">
                <div className="flex justify-between">
                  <span>今日收益:</span>
                  <span className="text-green-500">+2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>总收益:</span>
                  <span className="text-green-500">+15.8%</span>
                </div>
              </div>
            </section>

            {/* 订阅币种列表 */}
            <section className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-md font-semibold text-gray-100 mb-3">
                订阅币种
              </h3>
              <div className="space-y-2">
                {symbols.map((symbol) => (
                  <div
                    key={symbol}
                    onClick={() => setSelectedSymbol(symbol)}
                    className={`
                      text-sm p-2 rounded cursor-pointer transition-colors
                      ${
                        selectedSymbol === symbol
                          ? "bg-blue-600 text-white"
                          : "text-gray-200 hover:bg-gray-700"
                      }
                    `}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* 主内容区 - K线图表占据全屏 */}
      {/*<div className="flex-1 p-4">
        <MvTradingViewWidget
          title={`${selectedSymbol} K线图表`}
          scriptUrl={`${scriptUrl}charting_library.standalone.js`}
          config={MV_MARKET_OVERVIEW_WIDGET_CONFIG(selectedSymbol)}
          height={700}
        />
      </div>*/}
      <MvTradingViewWidget
        key={`${selectedSymbol} K线图表`} // 每次 symbol 切换重新挂载组件
        title={`${selectedSymbol} K线图表`}
        scriptUrl={`${scriptUrl}charting_library.standalone.js`}
        config={MV_MARKET_OVERVIEW_WIDGET_CONFIG(selectedSymbol)}
        height={700}
      />

      {/* 底部区域 - 当前持仓和历史交易 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* 当前持仓 */}
        <section className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">当前持仓</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-200">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left p-2">交易对</th>
                  <th className="text-right p-2">开仓价</th>
                  <th className="text-right p-2">当前价</th>
                  <th className="text-right p-2">收益率</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-2">BTC/USDT</td>
                  <td className="text-right p-2">$45,000</td>
                  <td className="text-right p-2">$46,500</td>
                  <td className="text-right p-2 text-green-500">+3.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 历史交易记录 */}
        <section className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">历史交易</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-200">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left p-2">交易对</th>
                  <th className="text-right p-2">开仓价</th>
                  <th className="text-right p-2">平仓价</th>
                  <th className="text-right p-2">收益率</th>
                  <th className="text-right p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-2">ETH/USDT</td>
                  <td className="text-right p-2">$2,500</td>
                  <td className="text-right p-2">$2,650</td>
                  <td className="text-right p-2 text-green-500">+6.0%</td>
                  <td className="text-right p-2">2025-10-29</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2">BNB/USDT</td>
                  <td className="text-right p-2">$300</td>
                  <td className="text-right p-2">$315</td>
                  <td className="text-right p-2 text-green-500">+5.0%</td>
                  <td className="text-right p-2">2025-10-28</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
