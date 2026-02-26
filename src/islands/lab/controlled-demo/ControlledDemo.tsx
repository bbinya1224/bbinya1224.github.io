
import { useMemo, useRef, useState, useTransition } from "react";

type DemoMode = "controlled" | "uncontrolled" | "optimized";

const HeavyComponent = ({ value }: { value: string }) => {
  const items = useMemo(() => {
    const result = [];
    // 성능 저하를 유발하기 위해 반복 횟수 증가 (예: 5000번)
    const startTime = performance.now();
    while (performance.now() - startTime < 50) {
      // 50ms 동안 메인 스레드 차단 (Blocking)
    }

    for (let i = 0; i < 50; i++) {
      result.push(
        <div key={i} className="text-xs text-slate-400 dark:text-slate-600">
          Heavy Item #{i + 1} : {value}
        </div>,
      );
    }
    return result;
  }, [value]);

  return (
    <div className="mt-4 rounded bg-slate-100 p-2 dark:bg-slate-800">
      <p className="mb-2 text-xs font-bold text-slate-500">
        무거운 컴포넌트 (50ms 지연 시뮬레이션)
      </p>
      <div className="flex flex-wrap gap-1 opacity-50">{items}</div>
    </div>
  );
};

const ControlledDemo = () => {
  const [activeMode, setActiveMode] = useState<DemoMode>("controlled");

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          제어 vs 비제어 컴포넌트 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>Heavy Component</strong>를 추가하여 성능 차이를 체감할 수
          있습니다. 입력 필드에 빠르게 타이핑해보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveMode("controlled")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "controlled"
              ? "bg-blue-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          제어 컴포넌트 (버벅임)
        </button>
        <button
          onClick={() => setActiveMode("uncontrolled")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "uncontrolled"
              ? "bg-purple-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          비제어 컴포넌트 (빠름)
        </button>
        <button
          onClick={() => setActiveMode("optimized")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "optimized"
              ? "bg-green-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          useTransition (부드러움)
        </button>
      </div>

      <div className="min-h-[280px]">
        {activeMode === "controlled" && <ControlledVersion />}
        {activeMode === "uncontrolled" && <UncontrolledVersion />}
        {activeMode === "optimized" && <OptimizedVersion />}
      </div>
    </div>
  );
};

/**
 * 제어 컴포넌트 버전
 * - React State가 데이터의 Single Source of Truth
 * - 입력할 때마다 리렌더링 발생
 */
const ControlledVersion = () => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [lastValidValue, setLastValidValue] = useState<string>("");
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  };

  const handleBlur = () => {
    const numValue = parseFloat(displayValue);

    if (!isNaN(numValue) && numValue > 0) {
      setLastValidValue(displayValue);
    } else {
      setDisplayValue(lastValidValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
        <div className="mb-3 flex items-center gap-2">
          <div className="size-3 rounded-full bg-blue-500" />
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
            제어 컴포넌트 (Controlled)
          </span>
        </div>

        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="빠르게 타이핑해보세요 (버벅임 발생)"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />

        <div className="mt-3 space-y-1 text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            현재 입력값:{" "}
            <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
              {displayValue || "(빈 값)"}
            </code>
          </p>
          <p className="text-blue-600 dark:text-blue-400">
            리렌더링 횟수:{" "}
            <code
              suppressHydrationWarning
              className="rounded bg-blue-200 px-1 font-bold dark:bg-blue-800"
            >
              {renderCountRef.current}
            </code>
          </p>
        </div>

        <HeavyComponent value={displayValue} />
      </div>

      <div className="rounded bg-blue-100 p-3 text-xs dark:bg-blue-900">
        <p className="font-medium text-blue-800 dark:text-blue-200">문제점:</p>
        <ul className="mt-1 space-y-1 text-blue-700 dark:text-blue-300">
          <li>• 무거운 하위 컴포넌트가 렌더링될 때까지 UI가 멈춤</li>
          <li>• 타이핑 반응 속도가 느려짐</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * 비제어 컴포넌트 버전
 * - DOM이 데이터의 Single Source of Truth
 * - 입력 중에는 리렌더링 발생하지 않음
 */
const UncontrolledVersion = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastValidValue, setLastValidValue] = useState<string>("");
  const renderCountRef = useRef(0);

  // 렌더링 카운트 추적
  renderCountRef.current += 1;

  const handleBlur = () => {
    if (!inputRef.current) return;

    const currentValue = inputRef.current.value;
    const numValue = parseFloat(currentValue);

    if (!isNaN(numValue) && numValue > 0) {
      setLastValidValue(currentValue);
    } else {
      // DOM 직접 수정 - onChange 트리거 필요 없음
      inputRef.current.value = lastValidValue;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950">
        <div className="mb-3 flex items-center gap-2">
          <div className="size-3 rounded-full bg-purple-500" />
          <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
            비제어 컴포넌트 (Uncontrolled)
          </span>
        </div>

        <input
          ref={inputRef}
          type="text"
          onBlur={handleBlur}
          defaultValue=""
          placeholder="빠르게 타이핑해보세요 (매우 빠름)"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />

        <div className="mt-3 space-y-1 text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            현재 입력값:{" "}
            <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
              (DOM에서 직접 관리)
            </code>
          </p>
          <p className="text-purple-600 dark:text-purple-400">
            리렌더링 횟수:{" "}
            <code
              suppressHydrationWarning
              className="rounded bg-purple-200 px-1 font-bold dark:bg-purple-800"
            >
              {renderCountRef.current}
            </code>
          </p>
        </div>

        <HeavyComponent value={lastValidValue} />
      </div>

      <div className="rounded bg-purple-100 p-3 text-xs dark:bg-purple-900">
        <p className="font-medium text-purple-800 dark:text-purple-200">
          특징:
        </p>
        <ul className="mt-1 space-y-1 text-purple-700 dark:text-purple-300">
          <li>• 입력 중에는 리렌더링이 없어서 매우 빠름</li>
          <li>• 실시간 유효성 검사나 UI 업데이트는 불가능</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * useTransition 최적화 버전
 * - 제어 컴포넌트의 장점 유지
 * - 입력 반응성 개선
 */
const OptimizedVersion = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [deferredValue, setDeferredValue] = useState<string>("");
  const [lastValidValue, setLastValidValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setInputValue(newValue);

    // 2. 전환 업데이트 (무거운 컴포넌트)
    startTransition(() => {
      setDeferredValue(newValue);
    });
  };

  const handleBlur = () => {
    const numValue = parseFloat(inputValue);

    if (!isNaN(numValue) && numValue > 0) {
      setLastValidValue(inputValue);
    } else {
      setInputValue(lastValidValue);
      startTransition(() => {
        setDeferredValue(lastValidValue);
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
        <div className="mb-3 flex items-center gap-2">
          <div className="size-3 rounded-full bg-green-500" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">
            useTransition 최적화
          </span>
          {isPending && (
            <span className="rounded bg-yellow-200 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
              업데이트 중...
            </span>
          )}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="빠르게 타이핑해보세요 (부드러움)"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 transition-opacity focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />

        <div className="mt-3 space-y-1 text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            현재 입력값:{" "}
            <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
              {inputValue || "(빈 값)"}
            </code>
          </p>
          <p className="text-green-600 dark:text-green-400">
            리렌더링 횟수:{" "}
            <code
              suppressHydrationWarning
              className="rounded bg-green-200 px-1 font-bold dark:bg-green-800"
            >
              {renderCountRef.current}
            </code>
          </p>
        </div>

        {/* 무거운 컴포넌트는 지연된 값(deferredValue)을 사용 */}
        <div
          style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}
        >
          <HeavyComponent value={deferredValue} />
        </div>
      </div>

      <div className="rounded bg-green-100 p-3 text-xs dark:bg-green-900">
        <p className="font-medium text-green-800 dark:text-green-200">
          최적화 효과:
        </p>
        <ul className="mt-1 space-y-1 text-green-700 dark:text-green-300">
          <li>• 입력(Input)은 즉시 업데이트되어 버벅임 없음</li>
          <li>• 무거운 컴포넌트는 백그라운드에서 렌더링 후 반영</li>
          <li>• 렌더링 횟수는 많지만 사용자 경험(UX)은 훨씬 좋음</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlledDemo;
