import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "timeout";

function createTimeoutSignal(timeoutMs: number) {
  if (typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(timeoutMs);
  }

  const controller = new AbortController();
  setTimeout(() => {
    controller.abort(new DOMException("Signal timed out.", "TimeoutError"));
  }, timeoutMs);
  return controller.signal;
}

function simulatedFetch(responseTime: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason);
      return;
    }

    const timerId = setTimeout(() => resolve(), responseTime);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timerId);
        reject(
          signal.reason ??
            new DOMException("The operation was aborted.", "AbortError"),
        );
      },
      { once: true },
    );
  });
}

export default function FetchTimeoutDemo() {
  const [responseTime, setResponseTime] = useState(3000);
  const [timeoutMs, setTimeoutMs] = useState(2000);
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [errorType, setErrorType] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const clearProgressTimer = useCallback(() => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => clearProgressTimer, [clearProgressTimer]);

  const startProgressTimer = useCallback(() => {
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 50);
  }, []);

  const run = useCallback(async () => {
    setStatus("loading");
    setElapsed(0);
    setErrorType(null);
    startProgressTimer();

    try {
      await simulatedFetch(responseTime, createTimeoutSignal(timeoutMs));
      clearProgressTimer();
      setElapsed(Date.now() - startRef.current);
      setStatus("success");
    } catch (error) {
      clearProgressTimer();
      setElapsed(Date.now() - startRef.current);

      if (error instanceof DOMException) {
        setStatus("timeout");
        setErrorType(error.name);
        return;
      }

      throw error;
    }
  }, [clearProgressTimer, responseTime, startProgressTimer, timeoutMs]);

  const maxTime = Math.max(responseTime, timeoutMs);
  const progressPercent =
    status === "loading" ? Math.min((elapsed / maxTime) * 100, 100) : 0;
  const responsePercent = (responseTime / maxTime) * 100;
  const timeoutPercent = (timeoutMs / maxTime) * 100;

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Timeout Signal Semantics
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          응답 시간과 SLA 타임아웃을 비교해, 클라이언트가 언제 응답 대기를
          종료하는지 확인합니다.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            응답 시간{" "}
            <span className="font-mono text-blue-600 dark:text-blue-400">
              {responseTime}ms
            </span>
          </label>
          <input
            type="range"
            min={500}
            max={5000}
            step={100}
            value={responseTime}
            onChange={(event) => setResponseTime(Number(event.target.value))}
            disabled={status === "loading"}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            타임아웃{" "}
            <span className="font-mono text-amber-600 dark:text-amber-400">
              {timeoutMs}ms
            </span>
          </label>
          <input
            type="range"
            min={500}
            max={5000}
            step={100}
            value={timeoutMs}
            onChange={(event) => setTimeoutMs(Number(event.target.value))}
            disabled={status === "loading"}
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>0ms</span>
          <span>{maxTime}ms</span>
        </div>
        <div className="relative h-8 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {status === "loading" && (
            <div
              className="absolute inset-y-0 left-0 bg-blue-500/30 transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          )}
          <div
            className="absolute top-0 h-full w-0.5 bg-blue-600"
            style={{ left: `${responsePercent}%` }}
            title={`응답 완료: ${responseTime}ms`}
          />
          <div
            className="absolute top-0 h-full w-0.5 bg-amber-500"
            style={{ left: `${timeoutPercent}%` }}
            title={`타임아웃: ${timeoutMs}ms`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
            {status === "loading" && `${elapsed}ms 경과`}
            {status === "idle" && "대기 중"}
            {status === "success" && `${elapsed}ms - 성공`}
            {status === "timeout" && `${elapsed}ms - 타임아웃`}
          </div>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-blue-600" />
            <span className="text-slate-600 dark:text-slate-400">응답 완료</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">대기 종료</span>
          </span>
        </div>
      </div>

      <button
        onClick={run}
        disabled={status === "loading"}
        className={`w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 ${
          status === "loading" ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {status === "loading" ? "실행 중..." : "시뮬레이션 시작"}
      </button>

      {status === "success" && (
        <div className="rounded-lg border-2 border-green-300 bg-green-50 p-3 dark:border-green-700 dark:bg-green-950">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            응답 수신
          </p>
          <p className="mt-1 text-xs text-green-600 dark:text-green-300">
            {elapsed}ms 만에 응답이 완료됐습니다. 타임아웃({timeoutMs}ms) 전에
            작업이 끝났으므로 클라이언트는 정상적으로 결과를 소비합니다.
          </p>
        </div>
      )}

      {status === "timeout" && (
        <div className="rounded-lg border-2 border-red-300 bg-red-50 p-3 dark:border-red-700 dark:bg-red-950">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            클라이언트 대기 종료
          </p>
          <p className="mt-1 text-xs text-red-600 dark:text-red-300">
            {timeoutMs}ms 시점에 timeout signal이 abort되어 클라이언트는 응답
            대기를 멈췄습니다. 서버 작업이 자동으로 롤백된다는 뜻은 아닙니다.
          </p>
          {errorType && (
            <code className="mt-2 block rounded bg-red-100 px-2 py-1 text-xs text-red-800 dark:bg-red-900/50 dark:text-red-300">
              catch (err) -&gt; err.name === "{errorType}"
            </code>
          )}
        </div>
      )}

      <div className="rounded-lg bg-amber-50 p-3 text-xs dark:bg-amber-900/30">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          관찰 포인트
        </p>
        <ul className="mt-1.5 space-y-1 text-amber-700 dark:text-amber-300">
          <li><code>AbortSignal.timeout(ms)</code>은 대기 종료 시점을 명시하는 API입니다.</li>
          <li>타임아웃으로 중단된 경우에는 수동 취소와 reason을 구분할 수 있어 에러 처리 정책을 분리하기 좋습니다.</li>
          <li>이 데모가 보여주는 것은 클라이언트의 대기 종료이며, 서버 업무 취소는 별도 프로토콜과 API 설계가 필요합니다.</li>
        </ul>
      </div>
    </div>
  );
}
