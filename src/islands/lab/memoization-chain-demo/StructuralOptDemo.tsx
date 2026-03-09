import { useEffect, useRef, useState, type ReactNode } from "react";

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

function FakeChart() {
  const renderCount = useRenderCount();
  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-orange-300 bg-orange-50 px-3 py-2 dark:border-orange-700 dark:bg-orange-950">
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
        ExpensiveChart
      </span>
      <RenderBadge count={renderCount} />
    </div>
  );
}

// ===== Before: 상태가 위에 있음 =====
function BeforeStateDown() {
  const [search, setSearch] = useState("");
  const parentRenderCount = useRenderCount();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border-2 border-purple-300 bg-purple-50 px-3 py-2 dark:border-purple-700 dark:bg-purple-950">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Dashboard
        </span>
        <RenderBadge count={parentRenderCount} />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="입력하면 전체 리렌더링"
        className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      />
      <FakeChart />
    </div>
  );
}

// ===== After: 상태를 아래로 내림 =====
function SearchBarIsolated() {
  const [search, setSearch] = useState("");
  const renderCount = useRenderCount();

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between rounded-lg border-2 border-cyan-300 bg-cyan-50 px-3 py-2 dark:border-cyan-700 dark:bg-cyan-950">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          SearchBar
        </span>
        <RenderBadge count={renderCount} />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="입력해도 Chart 안 바뀜"
        className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}

function AfterStateDown() {
  const parentRenderCount = useRenderCount();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border-2 border-purple-300 bg-purple-50 px-3 py-2 dark:border-purple-700 dark:bg-purple-950">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Dashboard
        </span>
        <RenderBadge count={parentRenderCount} />
      </div>
      <SearchBarIsolated />
      <FakeChart />
    </div>
  );
}

// ===== children 패턴 =====
function AnimatedBox({
  children,
}: {
  children: ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRenderCount = useRenderCount();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border-2 border-green-300 bg-green-50 px-3 py-2 dark:border-green-700 dark:bg-green-950">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          AnimatedContainer
        </span>
        <RenderBadge count={containerRenderCount} />
      </div>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="relative h-24 cursor-crosshair overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
      >
        <div
          className="pointer-events-none absolute size-3 rounded-full bg-green-500 opacity-70"
          style={{
            transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`,
          }}
        />
        <p className="absolute bottom-1 left-2 text-[10px] text-slate-400">
          마우스를 움직여보세요
        </p>
      </div>
      {children}
    </div>
  );
}

function HeavyContent() {
  const renderCount = useRenderCount();
  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-orange-300 bg-orange-50 px-3 py-2 dark:border-orange-700 dark:bg-orange-950">
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
        ExpensiveContent
      </span>
      <RenderBadge count={renderCount} />
    </div>
  );
}

function ChildrenPatternDemo() {
  return (
    <AnimatedBox>
      <HeavyContent />
    </AnimatedBox>
  );
}

export default function StructuralOptDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          구조적 최적화 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          memo 없이 구조만 바꿔서 불필요한 리렌더링을 제거합니다.
        </p>
      </div>

      <div key={resetKey}>
        <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          1. 상태를 아래로 내리기
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                Before
              </span>
            </div>
            <BeforeStateDown />
            <p className="text-xs text-red-600 dark:text-red-400">
              입력할 때마다 Chart까지 리렌더링
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                After
              </span>
            </div>
            <AfterStateDown />
            <p className="text-xs text-green-600 dark:text-green-400">
              SearchBar만 리렌더링, Chart는 유지
            </p>
          </div>
        </div>

        <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

        <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          2. children 패턴
        </p>
        <div className="max-w-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                children으로 전달
              </span>
            </div>
            <ChildrenPatternDemo />
            <p className="text-xs text-green-600 dark:text-green-400">
              마우스를 움직여도 ExpensiveContent는 리렌더링 안 됨
            </p>
          </div>
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
          핵심
        </p>
        <p className="mt-1 text-amber-700 dark:text-amber-300">
          구조를 바꾸는 것만으로 해결된다면, 메모이제이션은 필요 없습니다.
        </p>
      </div>
    </div>
  );
}
