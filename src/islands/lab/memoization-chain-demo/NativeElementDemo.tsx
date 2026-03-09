import { useCallback, useEffect, useRef, useState } from "react";

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

function ScenarioWithCallback() {
  const [count, setCount] = useState(0);
  const parentRenderCount = useRenderCount();

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border-2 border-purple-300 bg-purple-50 px-3 py-2 dark:border-purple-700 dark:bg-purple-950">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Parent
        </span>
        <RenderBadge count={parentRenderCount} />
      </div>
      <div className="flex items-center justify-between rounded-lg border-2 border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-600 dark:bg-slate-800">
        <code className="text-xs text-slate-600 dark:text-slate-400">
          &lt;button&gt;
        </code>
        <span className="text-[10px] text-slate-500">memo 없음</span>
      </div>
      <button
        onClick={handleClick}
        className="w-full rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
      >
        count: {count} (클릭하세요)
      </button>
    </div>
  );
}

function ScenarioWithout() {
  const [count, setCount] = useState(0);
  const parentRenderCount = useRenderCount();

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border-2 border-purple-300 bg-purple-50 px-3 py-2 dark:border-purple-700 dark:bg-purple-950">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Parent
        </span>
        <RenderBadge count={parentRenderCount} />
      </div>
      <div className="flex items-center justify-between rounded-lg border-2 border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-600 dark:bg-slate-800">
        <code className="text-xs text-slate-600 dark:text-slate-400">
          &lt;button&gt;
        </code>
        <span className="text-[10px] text-slate-500">memo 없음</span>
      </div>
      <button
        onClick={handleClick}
        className="w-full rounded bg-slate-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
      >
        count: {count} (클릭하세요)
      </button>
    </div>
  );
}

export default function NativeElementDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          네이티브 요소에 useCallback 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          두 시나리오의 Parent 렌더 횟수를 비교해보세요. <strong>차이가 없습니다.</strong>
        </p>
      </div>

      <div key={resetKey} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-purple-500" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              useCallback 사용
            </span>
          </div>
          <ScenarioWithCallback />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-slate-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              useCallback 없음
            </span>
          </div>
          <ScenarioWithout />
        </div>
      </div>

      <button
        onClick={() => setResetKey((k) => k + 1)}
        className="rounded bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      >
        초기화
      </button>

      <div className="rounded-lg bg-amber-50 p-3 text-xs dark:bg-amber-900/30">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          결론
        </p>
        <p className="mt-1 text-amber-700 dark:text-amber-300">
          네이티브 HTML 요소는 props 비교를 하지 않습니다. useCallback을 써도 렌더 횟수가 동일합니다.
          함수를 메모리에 저장하는 비용만 추가됩니다.
        </p>
      </div>
    </div>
  );
}
