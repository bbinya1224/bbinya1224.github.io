
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const ThemeCtx = createContext("light");

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

function RenderCount({ count }: { count: number }) {
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

function ProviderBox({
  children,
  renderCount,
  theme,
  onToggle,
  color,
}: {
  children: ReactNode;
  renderCount: number;
  theme: string;
  onToggle: () => void;
  color: "green" | "blue" | "red";
}) {
  const styles = {
    green: {
      border: "border-green-300 dark:border-green-700",
      bg: "bg-green-50 dark:bg-green-950",
      btn: "bg-green-600 hover:bg-green-700",
    },
    blue: {
      border: "border-blue-300 dark:border-blue-700",
      bg: "bg-blue-50 dark:bg-blue-950",
      btn: "bg-blue-600 hover:bg-blue-700",
    },
    red: {
      border: "border-red-300 dark:border-red-700",
      bg: "bg-red-50 dark:bg-red-950",
      btn: "bg-red-600 hover:bg-red-700",
    },
  }[color];

  return (
    <div
      className={`space-y-2 rounded-lg border-2 p-3 ${styles.border} ${styles.bg}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Provider
          </span>
          <RenderCount count={renderCount} />
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 rounded px-2 py-1 text-xs font-medium text-white ${styles.btn}`}
        >
          {theme === "light" ? "dark" : "light"}으로
        </button>
      </div>
      <div className={`border-l-2 pl-3 ${styles.border}`}>{children}</div>
    </div>
  );
}

function ChildBox({
  label,
  renderCount,
  extra,
}: {
  label: ReactNode;
  renderCount: number;
  extra?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
      <div className="min-w-0">
        <div className="truncate text-xs text-slate-700 dark:text-slate-300">
          {label}
        </div>
        {extra && (
          <p className="text-[10px] text-slate-500 dark:text-slate-500">
            {extra}
          </p>
        )}
      </div>
      <RenderCount count={renderCount} />
    </div>
  );
}

// ===== Scenario 1: children pattern =====
function ChildrenProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");
  const renderCount = useRenderCount();

  return (
    <ThemeCtx value={theme}>
      <ProviderBox
        renderCount={renderCount}
        theme={theme}
        onToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        color="green"
      >
        {children}
      </ProviderBox>
    </ThemeCtx>
  );
}

function Page() {
  const renderCount = useRenderCount();
  return <ChildBox label="Page" renderCount={renderCount} />;
}

function Scenario1() {
  return (
    <ChildrenProvider>
      <Page />
    </ChildrenProvider>
  );
}

// ===== Scenario 2: direct rendering + memo =====
const MemoPage = memo(function MemoPage() {
  const renderCount = useRenderCount();
  return (
    <ChildBox
      label={
        <>
          Page{" "}
          <code className="text-[10px] text-blue-600 dark:text-blue-400">
            memo
          </code>
        </>
      }
      renderCount={renderCount}
    />
  );
});

function Scenario2() {
  const [theme, setTheme] = useState("light");
  const renderCount = useRenderCount();

  return (
    <ThemeCtx value={theme}>
      <ProviderBox
        renderCount={renderCount}
        theme={theme}
        onToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        color="blue"
      >
        <MemoPage />
      </ProviderBox>
    </ThemeCtx>
  );
}

// ===== Scenario 3: context subscriber + memo =====
const MemoContextPage = memo(function MemoContextPage() {
  const theme = useContext(ThemeCtx);
  const renderCount = useRenderCount();

  return (
    <ChildBox
      label={
        <>
          Page{" "}
          <code className="text-[10px] text-blue-600 dark:text-blue-400">
            memo
          </code>{" "}
          +{" "}
          <code className="text-[10px] text-purple-600 dark:text-purple-400">
            useContext
          </code>
        </>
      }
      renderCount={renderCount}
      extra={`theme: ${theme}`}
    />
  );
});

function Scenario3() {
  const [theme, setTheme] = useState("light");
  const renderCount = useRenderCount();

  return (
    <ThemeCtx value={theme}>
      <ProviderBox
        renderCount={renderCount}
        theme={theme}
        onToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        color="red"
      >
        <MemoContextPage />
      </ProviderBox>
    </ThemeCtx>
  );
}

// ===== Main Demo =====
const ContextRerenderDemo = () => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Context 리렌더링 인터랙티브 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          각 시나리오의 테마 변경 버튼을 눌러 렌더 횟수를 비교해보세요.
        </p>
      </div>

      <div key={resetKey} className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              children 패턴
            </span>
          </div>
          <Scenario1 />
          <p className="text-xs text-green-600 dark:text-green-400">
            Page 리렌더링 안 됨
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              직접 렌더링 + memo
            </span>
          </div>
          <Scenario2 />
          <p className="text-xs text-blue-600 dark:text-blue-400">
            memo가 리렌더링 방어
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              memo + useContext
            </span>
          </div>
          <Scenario3 />
          <p className="text-xs text-red-600 dark:text-red-400">
            memo로 못 막음
          </p>
        </div>
      </div>

      <button
        onClick={() => setResetKey((k) => k + 1)}
        className="rounded bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-400"
      >
        초기화
      </button>

      <div className="rounded bg-amber-100 p-3 text-xs dark:bg-amber-900/50">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          관찰 포인트
        </p>
        <ul className="mt-1 space-y-1 text-amber-700 dark:text-amber-300">
          <li>
            <strong>children 패턴</strong> <br />
            Provider가 리렌더링돼도 Page의 Element 참조가 유지되어 스킵
          </li>
          <li>
            <strong>직접 렌더링 + memo</strong> <br />새 Element가 생성되지만
            props가 같으므로 memo가 방어
          </li>
          <li>
            <strong>memo + useContext</strong> <br />
            Context value 변경 시 Fiber를 직접 dirty 마킹하므로 memo 우회
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContextRerenderDemo;
