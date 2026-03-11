import { useCallback, useState } from "react";

type ListenerLog = {
  page: number;
  action: "add" | "remove";
  type: string;
};

function Panel({
  title,
  color,
  activeCount,
  logs,
  pages,
  isCleanup,
  onNavigate,
  onReset,
}: {
  title: string;
  color: "red" | "green";
  activeCount: number;
  logs: ListenerLog[];
  pages: number;
  isCleanup: boolean;
  onNavigate: () => void;
  onReset: () => void;
}) {
  const borderColor =
    color === "red"
      ? "border-red-300 dark:border-red-700"
      : "border-green-300 dark:border-green-700";
  const countBg =
    color === "red"
      ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
      : "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300";
  const dotColor = color === "red" ? "bg-red-500" : "bg-green-500";

  return (
    <div className={`space-y-3 rounded-lg border-2 p-4 ${borderColor}`}>
      <div className="flex items-center gap-2">
        <div className={`size-3 rounded-full ${dotColor}`} />
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-600 dark:text-slate-400">
          현재 페이지 컨텍스트: P{pages}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${countBg}`}>
          활성 핸들러: {activeCount}개
        </span>
      </div>

      <div className="flex h-16 items-end gap-1">
        {Array.from({ length: Math.max(pages, 1) }, (_, i) => {
          const count = isCleanup
            ? i === pages - 1
              ? 3
              : 0
            : (i + 1) * 3;
          const height = Math.min((count / 15) * 100, 100);
          const barColor =
            color === "red"
              ? "bg-red-400 dark:bg-red-600"
              : "bg-green-400 dark:bg-green-600";

          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
              <span className="text-[9px] text-slate-500">{count}</span>
              <div className="relative w-full rounded-t bg-slate-100 dark:bg-slate-800" style={{ height: "48px" }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t transition-all duration-300 ${barColor}`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-400">P{i + 1}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNavigate}
        className="w-full rounded bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      >
        다음 페이지로 이동
      </button>

      {logs.length > 0 && (
        <div className="max-h-28 overflow-y-auto rounded border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-950">
          {logs.map((log, i) => (
            <div
              key={i}
              className={
                log.action === "add"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-amber-600 dark:text-amber-400"
              }
            >
              [P{log.page}] {log.action === "add" ? "+" : "-"} {log.type}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full rounded border border-slate-300 px-3 py-1 text-[10px] text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        초기화
      </button>
    </div>
  );
}

const LISTENER_TYPES = ["scroll", "resize", "mousemove"];

export default function EventListenerCleanupDemo() {
  const [noCleanupPages, setNoCleanupPages] = useState(1);
  const [noCleanupCount, setNoCleanupCount] = useState(3);
  const [noCleanupLogs, setNoCleanupLogs] = useState<ListenerLog[]>([
    { page: 1, action: "add", type: "scroll" },
    { page: 1, action: "add", type: "resize" },
    { page: 1, action: "add", type: "mousemove" },
  ]);

  const [cleanupPages, setCleanupPages] = useState(1);
  const [cleanupCount, setCleanupCount] = useState(3);
  const [cleanupLogs, setCleanupLogs] = useState<ListenerLog[]>([
    { page: 1, action: "add", type: "scroll" },
    { page: 1, action: "add", type: "resize" },
    { page: 1, action: "add", type: "mousemove" },
  ]);

  const navigateNoCleanup = useCallback(() => {
    setNoCleanupPages((p) => {
      const next = p + 1;
      const newLogs: ListenerLog[] = LISTENER_TYPES.map((type) => ({
        page: next,
        action: "add" as const,
        type,
      }));
      setNoCleanupLogs((prev) => [...prev, ...newLogs]);
      setNoCleanupCount((c) => c + 3);
      return next;
    });
  }, []);

  const navigateCleanup = useCallback(() => {
    setCleanupPages((p) => {
      const next = p + 1;
      const removeLogs: ListenerLog[] = LISTENER_TYPES.map((type) => ({
        page: p,
        action: "remove" as const,
        type,
      }));
      const addLogs: ListenerLog[] = LISTENER_TYPES.map((type) => ({
        page: next,
        action: "add" as const,
        type,
      }));
      setCleanupLogs((prev) => [...prev, ...removeLogs, ...addLogs]);
      return next;
    });
  }, []);

  const resetNoCleanup = useCallback(() => {
    setNoCleanupPages(1);
    setNoCleanupCount(3);
    setNoCleanupLogs([
      { page: 1, action: "add", type: "scroll" },
      { page: 1, action: "add", type: "resize" },
      { page: 1, action: "add", type: "mousemove" },
    ]);
  }, []);

  const resetCleanup = useCallback(() => {
    setCleanupPages(1);
    setCleanupCount(3);
    setCleanupLogs([
      { page: 1, action: "add", type: "scroll" },
      { page: 1, action: "add", type: "resize" },
      { page: 1, action: "add", type: "mousemove" },
    ]);
  }, []);

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Listener Lifecycle 관리
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          페이지 전환이 반복될 때 리스너가 누적되는지, 혹은 생명주기 단위로 정리되는지 비교합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel
          title="정리 없음"
          color="red"
          activeCount={noCleanupCount}
          logs={noCleanupLogs}
          pages={noCleanupPages}
          isCleanup={false}
          onNavigate={navigateNoCleanup}
          onReset={resetNoCleanup}
        />
        <Panel
          title="AbortController 단위 정리"
          color="green"
          activeCount={cleanupCount}
          logs={cleanupLogs}
          pages={cleanupPages}
          isCleanup={true}
          onNavigate={navigateCleanup}
          onReset={resetCleanup}
        />
      </div>

      <div className="rounded-lg bg-amber-50 p-3 text-xs dark:bg-amber-900/30">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          관찰 포인트
        </p>
        <ul className="mt-1.5 space-y-1 text-amber-700 dark:text-amber-300">
          <li>
            <strong>정리 없음</strong> — 페이지 전환마다 핸들러가 3개씩 누적됩니다.
            메모리 증가뿐 아니라 동일 이벤트에 대한 중복 실행 비용도 함께 커집니다.
          </li>
          <li>
            <strong>AbortController 단위 정리</strong> — <code>controller.abort()</code>{" "}
            한 번으로 해당 페이지 컨텍스트에 속한 리스너를 일괄 제거해 활성 핸들러 수를 일정하게 유지합니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
