import { memo, useCallback, useEffect, useRef, useState } from "react";

function useRenderCount() {
  const count = useRef(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated) {
    count.current++;
  }

  return hydrated ? count.current : 1;
}

function RenderBadge({ count }: { count: number }) {
  const highlighted = count > 1;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
        highlighted
          ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
      }`}
    >
      렌더 {count}회
    </span>
  );
}

function Child({ onClick }: { onClick: () => void }) {
  const renderCount = useRenderCount();
  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-cyan-300 bg-cyan-50 px-3 py-2 dark:border-cyan-700 dark:bg-cyan-950">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Child</span>
        <span className="rounded bg-slate-200 px-1 py-0.5 text-[10px] text-slate-500 dark:bg-slate-700 dark:text-slate-400">memo 없음</span>
      </div>
      <RenderBadge count={renderCount} />
    </div>
  );
}

export default function UseCallbackOnlyDemo() {
  const [count, setCount] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const parentRenderCount = useRenderCount();

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold text-red-700 dark:text-red-300">
        직접 눌러보세요 — Child도 매번 리렌더링됩니다.
      </p>

      <div key={resetKey} className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border-2 border-purple-300 bg-purple-50 px-3 py-2 dark:border-purple-700 dark:bg-purple-950">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Parent</span>
            <code className="rounded bg-amber-100 px-1 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">useCallback</code>
          </div>
          <RenderBadge count={parentRenderCount} />
        </div>

        <Child onClick={handleClick} />

        <button
          onClick={handleClick}
          className="w-full rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
        >
          count: {count} (클릭하세요)
        </button>
      </div>

      <button
        onClick={() => { setResetKey((k) => k + 1); setCount(0); }}
        className="rounded bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      >
        초기화
      </button>
    </div>
  );
}
