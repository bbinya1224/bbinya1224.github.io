"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { formatEntry } from "@/widgets/lab/lib/formatEntry";
import type { Logger } from "@/widgets/lab/model/type";
import ChildLifecycleProbe from "./ChildLifecycleProbe";

const LifecycleLab = () => {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const bufferRef = useRef<string[]>([]);

  const log: Logger = useCallback((phase, detail) => {
    bufferRef.current = [...bufferRef.current, formatEntry(phase, detail)];
    setLogs(bufferRef.current);
  }, []);

  useLayoutEffect(() => {
    log("Parent useLayoutEffect", `count=${count}, showChild=${showChild}`);
  }, [count, showChild, log]);

  useEffect(() => {
    log("Parent useEffect", `count=${count}, showChild=${showChild}`);
  }, [count, showChild, log]);

  const handleSyncUpdate = () => {
    setCount((prev) => prev + 1);
    log("Render intent", "동기 업데이트 요청");
  };

  const handleTransitionUpdate = () => {
    startTransition(() => {
      setCount((prev) => prev + 1);
    });
    log("Render intent", "전환 기반 업데이트 요청");
  };

  const toggleChild = () => {
    setShowChild((prev) => !prev);
    log("Render intent", `자식 ${showChild ? "숨기기" : "보이기"} 요청`);
  };

  const resetLogs = () => {
    bufferRef.current = [];
    setLogs([]);
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSyncUpdate}
            className="rounded bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            동기 업데이트
          </button>
          <button
            onClick={handleTransitionUpdate}
            className="rounded bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
          >
            startTransition
          </button>
          <button
            onClick={toggleChild}
            className="rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"
          >
            자식 토글
          </button>
          <button
            onClick={resetLogs}
            className="rounded border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50"
          >
            로그 초기화
          </button>
        </div>
        <p className="text-sm text-slate-500">
          count: <span className="font-semibold">{count}</span>{" "}
          {isPending && <span className="text-emerald-600">(전환 중)</span>}
        </p>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-600">
          커밋 이후 훅 동작
        </h3>
        {showChild ? (
          <ChildLifecycleProbe count={count} log={log} />
        ) : (
          <div className="text-sm text-slate-500">
            자식 컴포넌트가 언마운트됨
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-600">로그</h3>
        <div className="max-h-72 overflow-y-auto rounded border border-slate-200 bg-slate-950 p-3 font-mono text-xs text-emerald-200">
          {logs.length === 0 ? (
            <span className="text-slate-400">
              버튼을 눌러 commit/cleanup 타이밍을 관찰하세요.
            </span>
          ) : (
            logs.map((entry, idx) => <div key={idx}>{entry}</div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default LifecycleLab;
