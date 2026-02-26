
import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

type DemoMode = "normal" | "virtual";

const VirtualScrollDemo = () => {
  const [activeMode, setActiveMode] = useState<DemoMode>("normal");
  const [itemCount, setItemCount] = useState(100);

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Virtual Windowing 성능 비교
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          항목 수를 늘려가며 일반 렌더링과 Virtual Windowing의 DOM 노드 수를
          비교해보세요.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            항목 수: {itemCount}개
          </label>
        </div>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>10</span>
          <span>500</span>
          <span>1,000</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveMode("normal")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "normal"
              ? "bg-orange-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          일반 무한 스크롤
        </button>
        <button
          onClick={() => setActiveMode("virtual")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "virtual"
              ? "bg-green-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Virtual Windowing
        </button>
      </div>

      <div className="min-h-[500px]">
        {activeMode === "normal" && <NormalScroll itemCount={itemCount} />}
        {activeMode === "virtual" && <VirtualScroll itemCount={itemCount} />}
      </div>
    </div>
  );
};

/**
 * 일반 무한 스크롤 (모든 항목 렌더링)
 */
const NormalScroll = ({ itemCount }: { itemCount: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [domNodeCount, setDomNodeCount] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // 실제 렌더링된 DOM 노드 수 계산
      const count =
        containerRef.current.querySelectorAll(".scroll-item").length;
      setDomNodeCount(count);
    }
  }, [itemCount]);

  const items = Array.from({ length: itemCount }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-orange-500" />
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
              일반 무한 스크롤
            </span>
          </div>
          <div className="text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              DOM 노드:{" "}
            </span>
            <code
              suppressHydrationWarning
              className="rounded bg-orange-200 px-2 py-1 font-bold text-orange-800 dark:bg-orange-800 dark:text-orange-200"
            >
              {domNodeCount}개
            </code>
          </div>
        </div>

        <div
          ref={containerRef}
          className="h-[300px] overflow-y-auto rounded border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
        >
          <div className="p-2">
            {items.map((item) => (
              <div
                key={item}
                className="scroll-item mb-2 rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Item #{item + 1}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  일반 렌더링 (모든 DOM 생성)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded bg-orange-100 p-3 text-xs dark:bg-orange-900">
        <p className="font-medium text-orange-800 dark:text-orange-200">
          문제점:
        </p>
        <ul className="mt-1 space-y-1 text-orange-700 dark:text-orange-300">
          <li>
            • {itemCount}개 항목 → {domNodeCount}개 DOM 노드 생성
          </li>
          <li>• 항목이 늘어날수록 메모리 사용량 증가</li>
          <li>• 스크롤 성능 저하 발생 가능</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * Virtual Windowing (화면에 보이는 항목만 렌더링)
 */
const VirtualScroll = ({ itemCount }: { itemCount: number }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [domNodeCount, setDomNodeCount] = useState(0);

  const items = Array.from({ length: itemCount }, (_, i) => i);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 68, // 아이템 높이 + margin
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    // Virtual 아이템 개수 = 실제 DOM 노드 수
    setDomNodeCount(virtualItems.length);
  }, [virtualItems.length]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              Virtual Windowing
            </span>
          </div>
          <div className="text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              DOM 노드:{" "}
            </span>
            <code
              suppressHydrationWarning
              className="rounded bg-green-200 px-2 py-1 font-bold text-green-800 dark:bg-green-800 dark:text-green-200"
            >
              {domNodeCount}개
            </code>
          </div>
        </div>

        <div
          ref={parentRef}
          className="h-[300px] overflow-y-auto rounded border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualItems.map((virtualItem) => {
              const item = items[virtualItem.index];
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="scroll-item m-2 rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Item #{item + 1}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Virtual 렌더링 (필요한 DOM만)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded bg-green-100 p-3 text-xs dark:bg-green-900">
        <p className="font-medium text-green-800 dark:text-green-200">
          최적화 효과:
        </p>
        <ul className="mt-1 space-y-1 text-green-700 dark:text-green-300">
          <li>
            • {itemCount}개 항목 중 ~{domNodeCount}개만 DOM에 렌더링
          </li>
          <li>
            • 감소율: {((1 - domNodeCount / itemCount) * 100).toFixed(1)}%
          </li>
          <li>• 항목 수와 무관하게 일정한 성능 유지</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualScrollDemo;
