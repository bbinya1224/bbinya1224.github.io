
import { useEffect, useRef, useState } from "react";

type DemoMode = "useEffect" | "serverProps";

const FlickeringDemo = () => {
  const [key, setKey] = useState(0);
  const [activeMode, setActiveMode] = useState<DemoMode | null>(null);

  const resetDemo = () => {
    setKey((prev) => prev + 1);
    setActiveMode(null);
  };

  const runDemo = (mode: DemoMode) => {
    setActiveMode(mode);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          깜빡임 비교 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          useEffect 기반 vs Server Props 기반 언어 감지 방식의 UX 차이를 확인 할
          수 있습니다.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => runDemo("useEffect")}
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
        >
          ❌ useEffect 방식 실행
        </button>
        <button
          onClick={() => runDemo("serverProps")}
          className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-500"
        >
          ✅ Server Props 방식 실행
        </button>
        <button
          onClick={resetDemo}
          className="rounded border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          초기화
        </button>
      </div>

      {/* 데모 영역 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* useEffect 버전 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            ❌ useEffect 방식 (문제)
          </h4>
          <div className="min-h-[200px] rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
            {activeMode === "useEffect" && <UseEffectVersion key={key} />}
          </div>
          <div className="rounded bg-red-100 p-3 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
            <p className="font-medium">❌ 문제점:</p>
            <ul className="mt-1 space-y-1">
              <li>• 처음에 기본 언어로 렌더링</li>
              <li>• 0.1초 후 올바른 언어로 깜빡임</li>
              <li>• Hydration Mismatch 경고 발생</li>
            </ul>
          </div>
        </div>

        {/* Server Props 버전 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            ✅ Server Props 방식 (해결)
          </h4>
          <div className="min-h-[200px] rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
            {activeMode === "serverProps" && <ServerPropsVersion key={key} />}
          </div>
          <div className="rounded bg-green-100 p-3 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
            <p className="font-medium">✅ 장점:</p>
            <ul className="mt-1 space-y-1">
              <li>• 처음부터 올바른 언어로 렌더링</li>
              <li>• 깜빡임 없음</li>
              <li>• 불필요한 리렌더링 없음</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// useEffect 방식 컴포넌트
const UseEffectVersion = () => {
  const [locale, setLocale] = useState("en");
  const [phase, setPhase] = useState<"initial" | "effect" | "done">("initial");
  const isInitialized = useRef(false);

  // 깜빡임을 시각화하기 위한 단계별 렌더링
  useEffect(() => {
    // 초기 렌더링 표시
    const timer1 = setTimeout(() => {
      setPhase("effect");
    }, 100);

    // useEffect에서 언어 감지 (브라우저 호스트네임 시뮬레이션)
    const timer2 = setTimeout(() => {
      if (!isInitialized.current) {
        const detectedLocale = "ko"; // 브라우저에서 감지한 언어
        setLocale(detectedLocale);
        isInitialized.current = true;
        setPhase("done");
      }
    }, 200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getMessage = () => {
    if (locale === "en") return "Welcome to our site";
    if (locale === "ko") return "사이트에 오신 것을 환영합니다";
    return "";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {phase === "initial" && "1️⃣ 초기 렌더링 (서버 HTML)"}
          {phase === "effect" && "2️⃣ useEffect 실행 중..."}
          {phase === "done" && "3️⃣ 리렌더링 완료"}
        </span>
      </div>

      <div
        className={`rounded-lg border-2 p-4 transition-all duration-300 ${
          phase === "effect"
            ? "scale-105 border-yellow-400 bg-yellow-100 dark:bg-yellow-900"
            : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
        }`}
      >
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          {getMessage()}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          현재 언어:{" "}
          <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
            {locale}
          </code>
        </p>
      </div>

      {phase === "effect" && (
        <div className="animate-pulse text-center text-xs font-medium text-yellow-700 dark:text-yellow-300">
          ⚠️ 깜빡임 발생!
        </div>
      )}

      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
        <p>✅ 1. 서버 HTML: &quot;Welcome to our site&quot; (en)</p>
        <p className={phase !== "initial" ? "opacity-100" : "opacity-30"}>
          ✅ 2. useEffect 실행: 언어 감지 (ko)
        </p>
        <p className={phase === "done" ? "opacity-100" : "opacity-30"}>
          ✅ 3. setState → 리렌더링 → &quot;사이트에 오신...&quot;
        </p>
      </div>
    </div>
  );
};

// Server Props 방식 컴포넌트
const ServerPropsVersion = () => {
  // 서버에서 이미 언어를 결정하고 Props로 전달받음
  const initialLocale = "ko";
  const isInitialized = useRef(false);
  const [phase, setPhase] = useState<"initial" | "done">("initial");

  // 렌더링 중 초기화 (useEffect 없음!)
  if (!isInitialized.current) {
    isInitialized.current = true;
  }

  useEffect(() => {
    // 시각화를 위한 단계 표시만
    const timer = setTimeout(() => {
      setPhase("done");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    if (initialLocale === "ko") return "사이트에 오신 것을 환영합니다";
    return "Welcome to our site";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-green-500" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {phase === "initial" && "1️⃣ 렌더링 (이미 올바른 언어)"}
          {phase === "done" && "2️⃣ 완료 (추가 렌더링 없음)"}
        </span>
      </div>

      <div className="rounded-lg border-2 border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          {getMessage()}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          현재 언어:{" "}
          <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
            {initialLocale}
          </code>
        </p>
      </div>

      <div className="text-center text-xs font-medium text-green-700 dark:text-green-300">
        ✅ 깜빡임 없음!
      </div>

      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
        <p>✅ 1. 서버: 요청 헤더에서 언어 감지 (ko)</p>
        <p>✅ 2. 서버 HTML: &quot;사이트에 오신...&quot; (ko)</p>
        <p>✅ 3. 클라이언트: 바로 표시 (리렌더링 없음)</p>
      </div>
    </div>
  );
};

export default FlickeringDemo;
