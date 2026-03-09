import { useCallback, useState } from "react";

function ScenarioStale() {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    return query;
  }, []);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      />
      <button
        onClick={() => alert(`검색: "${handleSearch()}"`)}
        className="w-full rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
      >
        검색 실행
      </button>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        현재 query: <code className="text-red-600 dark:text-red-400">"{query}"</code>
      </p>
    </div>
  );
}

function ScenarioCorrect() {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    return query;
  }, [query]);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      />
      <button
        onClick={() => alert(`검색: "${handleSearch()}"`)}
        className="w-full rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
      >
        검색 실행
      </button>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        현재 query: <code className="text-green-600 dark:text-green-400">"{query}"</code>
      </p>
    </div>
  );
}

export default function StaleClosureDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Stale Closure 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          양쪽에 같은 텍스트를 입력한 뒤, <strong>검색 실행</strong>을 눌러보세요.
        </p>
      </div>

      <div key={resetKey} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              deps: [] (빈 배열)
            </span>
          </div>
          <code className="block rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            useCallback(() =&gt; query, [])
          </code>
          <ScenarioStale />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              deps: [query] (올바른 의존성)
            </span>
          </div>
          <code className="block rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            useCallback(() =&gt; query, [query])
          </code>
          <ScenarioCorrect />
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
            <strong>빈 배열</strong> — 항상 초기값(빈 문자열)으로 검색됩니다. 함수가 마운트 시점의 query를 기억하고 있기 때문입니다.
          </li>
          <li>
            <strong>올바른 의존성</strong> — 현재 입력값으로 정상 검색됩니다. query가 바뀔 때마다 새 함수가 생성됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
