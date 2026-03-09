import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

function ComponentBox({
  label,
  tag,
  renderCount,
  color,
}: {
  label: string;
  tag?: ReactNode;
  renderCount: number;
  color: "purple" | "cyan" | "green" | "amber";
}) {
  const styles = {
    purple: "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950",
    cyan: "border-cyan-300 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-950",
    green: "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950",
    amber: "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950",
  }[color];

  return (
    <div className={`flex items-center justify-between gap-2 rounded-lg border-2 px-3 py-2 ${styles}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
        {tag}
      </div>
      <RenderBadge count={renderCount} />
    </div>
  );
}

function Arrow({ broken }: { broken?: boolean }) {
  return (
    <div className="flex justify-center py-0.5">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <line
          x1="10" y1="2" x2="10" y2="14"
          stroke={broken ? "#ef4444" : "#22c55e"}
          strokeWidth="2"
          strokeDasharray={broken ? "4 3" : "none"}
        />
        <polygon
          points="6,12 10,18 14,12"
          fill={broken ? "#ef4444" : "#22c55e"}
        />
      </svg>
    </div>
  );
}

function Tag({ children, variant }: { children: ReactNode; variant: "ok" | "warn" | "fail" }) {
  const styles = {
    ok: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    warn: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    fail: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  }[variant];

  return (
    <code className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${styles}`}>
      {children}
    </code>
  );
}

// ===== Scenario 1: useCallback만 =====
function ChildNoMemo({ onClick }: { onClick: () => void }) {
  const renderCount = useRenderCount();
  return (
    <div>
      <ComponentBox label="Child" renderCount={renderCount} color="cyan" />
      <button
        onClick={onClick}
        className="mt-1 w-full rounded bg-slate-200 px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        aria-label="Child click handler"
      >
        onClick
      </button>
    </div>
  );
}

function Scenario1() {
  const [count, setCount] = useState(0);
  const parentRenderCount = useRenderCount();

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="space-y-1">
      <ComponentBox
        label="Parent"
        tag={<Tag variant="ok">useCallback</Tag>}
        renderCount={parentRenderCount}
        color="purple"
      />
      <Arrow broken />
      <ChildNoMemo onClick={handleClick} />
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        count: {count}
      </p>
    </div>
  );
}

// ===== Scenario 2: React.memo만 =====
const MemoChildNewRef = memo(function MemoChildNewRef({
  onClick,
}: {
  onClick: () => void;
}) {
  const renderCount = useRenderCount();
  return (
    <div>
      <ComponentBox
        label="Child"
        tag={<Tag variant="warn">memo</Tag>}
        renderCount={renderCount}
        color="green"
      />
      <button
        onClick={onClick}
        className="mt-1 w-full rounded bg-slate-200 px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        aria-label="MemoChild click handler"
      >
        onClick
      </button>
    </div>
  );
});

function Scenario2() {
  const [count, setCount] = useState(0);
  const parentRenderCount = useRenderCount();

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return (
    <div className="space-y-1">
      <ComponentBox
        label="Parent"
        renderCount={parentRenderCount}
        color="purple"
      />
      <Arrow broken />
      <MemoChildNewRef onClick={handleClick} />
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        count: {count}
      </p>
    </div>
  );
}

// ===== Scenario 3: 체인 완성 =====
const MemoChildStable = memo(function MemoChildStable({
  onClick,
}: {
  onClick: () => void;
}) {
  const renderCount = useRenderCount();
  return (
    <div>
      <ComponentBox
        label="Child"
        tag={<Tag variant="ok">memo</Tag>}
        renderCount={renderCount}
        color="green"
      />
      <button
        onClick={onClick}
        className="mt-1 w-full rounded bg-slate-200 px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        aria-label="MemoChild click handler"
      >
        onClick
      </button>
    </div>
  );
});

function Scenario3() {
  const [count, setCount] = useState(0);
  const parentRenderCount = useRenderCount();

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="space-y-1">
      <ComponentBox
        label="Parent"
        tag={<Tag variant="ok">useCallback</Tag>}
        renderCount={parentRenderCount}
        color="purple"
      />
      <Arrow />
      <MemoChildStable onClick={handleClick} />
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        count: {count}
      </p>
    </div>
  );
}

// ===== Main =====
export default function MemoizationChainDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          메모이제이션 체인 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          각 시나리오의 <strong>onClick</strong> 버튼을 눌러 렌더 횟수를 비교해보세요.
        </p>
      </div>

      <div key={resetKey} className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              useCallback만
            </span>
          </div>
          <Scenario1 />
          <p className="text-xs text-red-600 dark:text-red-400">
            Child 리렌더링 발생
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-amber-500" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              React.memo만
            </span>
          </div>
          <Scenario2 />
          <p className="text-xs text-amber-600 dark:text-amber-400">
            memo 무력화됨
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              체인 완성
            </span>
          </div>
          <Scenario3 />
          <p className="text-xs text-green-600 dark:text-green-400">
            Child 리렌더링 방지!
          </p>
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
          관찰 포인트
        </p>
        <ul className="mt-1.5 space-y-1 text-amber-700 dark:text-amber-300">
          <li>
            <strong>useCallback만</strong> — 함수 참조는 유지되지만, Child에 memo가 없어서 부모 리렌더링에 무조건 따라감
          </li>
          <li>
            <strong>React.memo만</strong> — memo가 props를 비교하지만, 매번 새 함수가 전달되어 항상 "다르다" 판정
          </li>
          <li>
            <strong>체인 완성</strong> — useCallback이 참조를 유지하고, memo가 비교해서 "같다" → 리렌더링 스킵
          </li>
        </ul>
      </div>
    </div>
  );
}
