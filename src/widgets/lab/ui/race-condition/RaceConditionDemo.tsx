"use client";

import { useCallback, useRef, useState } from "react";

type Timeline = {
  time: number;
  user: string;
  action: string;
  value?: string;
};

type SimulationResult = {
  user: string;
  expected: string;
  received: string;
  isCorrect: boolean;
};

const RaceConditionDemo = () => {
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"singleton" | "isolated">("singleton");

  // 싱글톤 시뮬레이션용 공유 상태
  const sharedInstanceRef = useRef<string | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const addTimelineEntry = useCallback(
    (time: number, user: string, action: string, value?: string) => {
      setTimeline((prev) => [...prev, { time, user, action, value }]);
    },
    [],
  );

  const simulateSingleton = async () => {
    setTimeline([]);
    setResults([]);
    setIsRunning(true);
    sharedInstanceRef.current = null;

    const startTime = Date.now();
    const getTime = () => Date.now() - startTime;

    // 사용자 A 시작 (t=0ms)
    addTimelineEntry(0, "A", "요청 시작");
    await sleep(50);

    addTimelineEntry(getTime(), "A", "i18n 인스턴스 접근", "shared");
    await sleep(50);

    addTimelineEntry(getTime(), "A", "언어 설정", "en");
    sharedInstanceRef.current = "en";

    // 사용자 B 시작 (t=100ms, A가 끝나기 전)
    await sleep(50);
    addTimelineEntry(getTime(), "B", "요청 시작");
    await sleep(50);

    addTimelineEntry(getTime(), "B", "i18n 인스턴스 접근", "shared");
    await sleep(50);

    addTimelineEntry(getTime(), "B", "언어 설정", "ko");
    sharedInstanceRef.current = "ko"; // 덮어씌움!

    // A가 렌더링 완료 (이미 B가 언어를 변경함)
    await sleep(50);
    const resultA = sharedInstanceRef.current;
    addTimelineEntry(getTime(), "A", "렌더링 완료, 결과 반환", resultA);

    // B가 렌더링 완료
    await sleep(50);
    const resultB = sharedInstanceRef.current;
    addTimelineEntry(getTime(), "B", "렌더링 완료, 결과 반환", resultB);

    setResults([
      {
        user: "미국 유저 (A)",
        expected: "en",
        received: resultA || "",
        isCorrect: resultA === "en",
      },
      {
        user: "한국 유저 (B)",
        expected: "ko",
        received: resultB || "",
        isCorrect: resultB === "ko",
      },
    ]);

    setIsRunning(false);
  };

  const simulateIsolated = async () => {
    setTimeline([]);
    setResults([]);
    setIsRunning(true);

    const startTime = Date.now();
    const getTime = () => Date.now() - startTime;

    // 각 사용자가 독립된 인스턴스를 가짐
    const instances = { A: null as string | null, B: null as string | null };

    // 사용자 A 시작
    addTimelineEntry(0, "A", "요청 시작");
    await sleep(50);

    addTimelineEntry(getTime(), "A", "새 i18n 인스턴스 생성", "i18n_A");
    await sleep(50);

    addTimelineEntry(getTime(), "A", "언어 설정", "en");
    instances.A = "en";

    // 사용자 B 시작
    await sleep(50);
    addTimelineEntry(getTime(), "B", "요청 시작");
    await sleep(50);

    addTimelineEntry(getTime(), "B", "새 i18n 인스턴스 생성", "i18n_B");
    await sleep(50);

    addTimelineEntry(getTime(), "B", "언어 설정", "ko");
    instances.B = "ko";

    // A가 렌더링 완료 (독립된 인스턴스 사용)
    await sleep(50);
    addTimelineEntry(getTime(), "A", "렌더링 완료, 결과 반환", instances.A);

    // B가 렌더링 완료
    await sleep(50);
    addTimelineEntry(getTime(), "B", "렌더링 완료, 결과 반환", instances.B);

    setResults([
      {
        user: "미국 유저 (A)",
        expected: "en",
        received: instances.A || "",
        isCorrect: instances.A === "en",
      },
      {
        user: "한국 유저 (B)",
        expected: "ko",
        received: instances.B || "",
        isCorrect: instances.B === "ko",
      },
    ]);

    setIsRunning(false);
  };

  const runSimulation = () => {
    if (mode === "singleton") {
      simulateSingleton();
    } else {
      simulateIsolated();
    }
  };

  const resetDemo = () => {
    setTimeline([]);
    setResults([]);
    sharedInstanceRef.current = null;
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Race Condition 시뮬레이터
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          두 사용자가 동시에 접속할 때 싱글톤 vs 격리 패턴의 차이를 확인할 수
          있습니다.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setMode("singleton")}
          disabled={isRunning}
          className={`rounded px-4 py-2 font-medium transition ${
            mode === "singleton"
              ? "bg-red-600 text-white hover:bg-red-500"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
        >
          싱글톤 (위험)
        </button>
        <button
          onClick={() => setMode("isolated")}
          disabled={isRunning}
          className={`rounded px-4 py-2 font-medium transition ${
            mode === "isolated"
              ? "bg-green-600 text-white hover:bg-green-500"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
        >
          격리 (안전)
        </button>
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className={`rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500 ${
            isRunning ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isRunning ? "실행 중..." : "시뮬레이션 시작"}
        </button>
        <button
          onClick={resetDemo}
          disabled={isRunning}
          className={`rounded border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 ${
            isRunning ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          초기화
        </button>
      </div>

      <div className="rounded-lg border-2 border-dashed p-4 dark:border-slate-600">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          현재 모드:{" "}
          <span
            className={mode === "singleton" ? "text-red-600" : "text-green-600"}
          >
            {mode === "singleton"
              ? "싱글톤 (모든 요청이 하나의 인스턴스 공유)"
              : "격리 (요청마다 새 인스턴스 생성)"}
          </span>
        </p>
      </div>

      {timeline.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
            타임라인
          </h4>
          <div className="max-h-72 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-950">
            {timeline.map((entry, idx) => (
              <div
                key={idx}
                className={`mb-1 ${
                  entry.user === "A"
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                <span className="text-slate-500 dark:text-slate-500">
                  [{entry.time}ms]
                </span>{" "}
                <span className="font-semibold">{entry.user}:</span>{" "}
                {entry.action}
                {entry.value && (
                  <span className="ml-2 rounded bg-slate-200 px-1 text-slate-900 dark:bg-slate-700 dark:text-slate-100">
                    {entry.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
            결과
          </h4>
          <div className="space-y-2">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`rounded-lg border-2 p-3 ${
                  result.isCorrect
                    ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950"
                    : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {result.user}
                  </span>
                  <span
                    className={`text-sm ${
                      result.isCorrect
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {result.isCorrect ? "✅ 정상" : "❌ 버그 발생!"}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  예상:{" "}
                  <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
                    {result.expected}
                  </code>{" "}
                  → 실제:{" "}
                  <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
                    {result.received}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceConditionDemo;
