import { useCallback, useRef, useState } from "react";

type LogEntry = {
  time: number;
  page: string;
  action: "send" | "response" | "cancel" | "apply" | "stale";
  detail?: string;
};

type Mode = "without" | "with";

const PAGES = ["A", "B", "C"];
const REQUEST_DELAYS = [800, 500, 300];
const SWITCH_INTERVAL_MS = 200;

const actionLabels: Record<LogEntry["action"], string> = {
  send: "요청 전송",
  response: "응답 수신",
  cancel: "이전 요청 취소",
  apply: "UI 반영",
  stale: "stale 응답 반영",
};

const actionColors: Record<LogEntry["action"], string> = {
  send: "text-blue-600 dark:text-blue-400",
  response: "text-slate-600 dark:text-slate-400",
  cancel: "text-amber-600 dark:text-amber-400",
  apply: "text-green-600 dark:text-green-400",
  stale: "text-red-600 dark:text-red-400",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function createAbortError() {
  return new DOMException("The operation was aborted.", "AbortError");
}

function fakePageLoad(page: string, delay: number, signal?: AbortSignal) {
  return new Promise<string>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? createAbortError());
      return;
    }

    const timerId = setTimeout(() => resolve(page), delay);

    if (!signal) return;

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timerId);
        reject(signal.reason ?? createAbortError());
      },
      { once: true },
    );
  });
}

export default function RaceConditionAbortDemo() {
  const [mode, setMode] = useState<Mode>("without");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(0);

  const addLog = useCallback(
    (page: string, action: LogEntry["action"], detail?: string) => {
      const time = Date.now() - startTimeRef.current;
      setLogs((prev) => [...prev, { time, page, action, detail }]);
    },
    [],
  );

  const reset = useCallback(() => {
    setLogs([]);
    setResult(null);
  }, []);

  const runWithout = useCallback(async () => {
    reset();
    setIsRunning(true);
    startTimeRef.current = Date.now();

    const expectedResult = PAGES[PAGES.length - 1];

    const tasks = PAGES.map((page, index) =>
      (async () => {
        await sleep(index * SWITCH_INTERVAL_MS);
        addLog(page, "send", `응답 ${REQUEST_DELAYS[index]}ms`);

        const resolved = await fakePageLoad(page, REQUEST_DELAYS[index]);
        addLog(resolved, "response");

        setResult(resolved);
        addLog(
          resolved,
          resolved === expectedResult ? "apply" : "stale",
          resolved === expectedResult
            ? "현재 탭 기준 UI 반영"
            : "이전 탭의 응답이 최신 UI를 덮어씀",
        );
      })(),
    );

    await Promise.all(tasks);
    setIsRunning(false);
  }, [addLog, reset]);

  const runWith = useCallback(async () => {
    reset();
    setIsRunning(true);
    startTimeRef.current = Date.now();

    const tasks: Promise<void>[] = [];
    let controller: AbortController | null = null;

    for (let index = 0; index < PAGES.length; index += 1) {
      const page = PAGES[index];

      tasks.push(
        (async () => {
          await sleep(index * SWITCH_INTERVAL_MS);

          const previousPage = index > 0 ? PAGES[index - 1] : null;
          if (controller && previousPage) {
            controller.abort();
            addLog(previousPage, "cancel", "새 탭으로 전환되어 이전 요청 취소");
          }

          const nextController = new AbortController();
          controller = nextController;

          addLog(page, "send", `응답 ${REQUEST_DELAYS[index]}ms`);

          try {
            const resolved = await fakePageLoad(
              page,
              REQUEST_DELAYS[index],
              nextController.signal,
            );

            addLog(resolved, "response");
            setResult(resolved);
            addLog(resolved, "apply", "취소되지 않은 최신 요청만 반영");
          } catch (error) {
            if (
              !(error instanceof DOMException && error.name === "AbortError")
            ) {
              throw error;
            }
          }
        })(),
      );
    }

    await Promise.all(tasks);
    setIsRunning(false);
  }, [addLog, reset]);

  const run = mode === "without" ? runWithout : runWith;
  const expectedResult = PAGES[PAGES.length - 1];
  const isCorrect = result === expectedResult;

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Latest-Wins 요청 제어
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          탭을 빠르게 전환할 때, 느린 응답이 최신 UI를 덮어쓰는지 비교합니다.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setMode("without");
              reset();
            }}
            disabled={isRunning}
            className={`rounded px-4 py-2 text-sm font-medium transition ${
              mode === "without"
                ? "bg-red-600 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
          >
            취소 없음
          </button>
          <button
            onClick={() => {
              setMode("with");
              reset();
            }}
            disabled={isRunning}
            className={`rounded px-4 py-2 text-sm font-medium transition ${
              mode === "with"
                ? "bg-green-600 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
          >
            AbortController 적용
          </button>
        </div>
        <button
          onClick={run}
          disabled={isRunning}
          className={`rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 ${
            isRunning ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isRunning ? "실행 중..." : "시뮬레이션 시작"}
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-950">
        <p className="font-medium text-slate-800 dark:text-slate-200">
          탭 전환 시퀀스
        </p>
        <p className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          {PAGES.map((page, index) => (
            <span key={page}>
              {index > 0 && <span className="text-slate-400"> → </span>}
              <span className="rounded bg-white px-1.5 py-0.5 dark:bg-slate-900">
                탭 {page}
              </span>
            </span>
          ))}
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          각 전환은 {SWITCH_INTERVAL_MS}ms 간격으로 발생하고, 응답 시간은 순서대로{" "}
          {REQUEST_DELAYS.join(" / ")}ms 입니다.
        </p>
      </div>

      {logs.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
            요청 타임라인
          </h4>
          <div className="max-h-72 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-950">
            {logs.map((entry, index) => (
              <div
                key={`${entry.page}-${entry.action}-${index}`}
                className={`mb-1 ${actionColors[entry.action]}`}
              >
                <span className="text-slate-500">[{entry.time}ms]</span>{" "}
                <span className="font-semibold">탭 {entry.page}</span>{" "}
                {actionLabels[entry.action]}
                {entry.detail && (
                  <span className="ml-1 text-slate-500">({entry.detail})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {result !== null && (
        <div
          className={`rounded-lg border-2 p-3 ${
            isCorrect
              ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950"
              : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              화면에 표시된 탭:{" "}
              <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
                탭 {result}
              </code>
            </span>
            <span
              className={`text-sm ${
                isCorrect
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {isCorrect ? "latest wins 유지" : "stale overwrite 발생"}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            기대값:{" "}
            <code className="rounded bg-slate-200 px-1 dark:bg-slate-700">
              탭 {expectedResult}
            </code>
          </p>
        </div>
      )}

      <div className="rounded-lg bg-amber-50 p-3 text-xs dark:bg-amber-900/30">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          관찰 포인트
        </p>
        <ul className="mt-1.5 space-y-1 text-amber-700 dark:text-amber-300">
          {mode === "without" ? (
            <>
              <li>요청은 모두 살아 있으므로 응답 순서가 뒤바뀌면 stale 데이터가 화면을 덮어쓸 수 있습니다.</li>
              <li>탭 A의 응답이 가장 느려서, 탭 C를 보고 있는데 A의 데이터가 마지막에 표시됩니다.</li>
            </>
          ) : (
            <>
              <li>AbortController는 이전 요청의 응답 처리를 중단해 latest-wins 정책을 명시적으로 구현합니다.</li>
              <li>다만 이는 UI 일관성 문제를 해결하는 것이지, 서버에서 이미 시작된 작업을 롤백하는 것은 아닙니다.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
