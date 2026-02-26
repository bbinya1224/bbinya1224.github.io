
import { useRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

type DemoMode = "comparison" | "props-merge" | "semantic";

const Button = ({
  asChild,
  variant = "primary",
  className,
  children,
  onClick,
  ...props
}: {
  asChild?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const Comp = asChild ? Slot : "button";

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400 dark:bg-slate-700 dark:text-slate-200";

  const combinedClassName = [baseStyles, variantStyles, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Comp className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </Comp>
  );
};

const TraditionalButton = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all bg-purple-600 text-white hover:bg-purple-700";

  if (href) {
    return (
      <div className="traditional-wrapper">
        <a href={href} className={baseStyles} onClick={onClick}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <button className={baseStyles} onClick={onClick}>
      {children}
    </button>
  );
};

const AsChildDemo = () => {
  const [activeMode, setActiveMode] = useState<DemoMode>("comparison");

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          asChild 패턴 인터랙티브 데모
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          asChild 패턴이 어떻게 동작하는지 직접 확인해보세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveMode("comparison")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "comparison"
              ? "bg-blue-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          DOM 구조 비교
        </button>
        <button
          onClick={() => setActiveMode("props-merge")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "props-merge"
              ? "bg-green-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Props 병합
        </button>
        <button
          onClick={() => setActiveMode("semantic")}
          className={`rounded px-4 py-2 font-medium transition ${
            activeMode === "semantic"
              ? "bg-purple-600 text-white"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          시맨틱 차이
        </button>
      </div>

      <div className="min-h-[320px]">
        {activeMode === "comparison" && <ComparisonDemo />}
        {activeMode === "props-merge" && <PropsMergeDemo />}
        {activeMode === "semantic" && <SemanticDemo />}
      </div>
    </div>
  );
};

const ComparisonDemo = () => {
  const traditionalRef = useRef<HTMLDivElement>(null);
  const asChildRef = useRef<HTMLDivElement>(null);
  const [traditionalHTML, setTraditionalHTML] = useState("");
  const [asChildHTML, setAsChildHTML] = useState("");

  const updateHTML = () => {
    if (traditionalRef.current) {
      setTraditionalHTML(formatHTML(traditionalRef.current.innerHTML));
    }
    if (asChildRef.current) {
      setAsChildHTML(formatHTML(asChildRef.current.innerHTML));
    }
  };

  useState(() => {
    setTimeout(updateHTML, 100);
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* 전통적 방식 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-purple-500" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              전통적 방식 (Wrapper)
            </span>
          </div>

          <div
            ref={traditionalRef}
            className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950"
          >
            <TraditionalButton href="https://example.com">
              링크 버튼
            </TraditionalButton>
          </div>

          <div className="rounded bg-slate-100 p-3 dark:bg-slate-800">
            <p className="mb-2 text-xs font-medium text-slate-500">
              렌더링된 HTML:
            </p>
            <pre className="overflow-x-auto text-xs text-purple-600 dark:text-purple-400">
              {traditionalHTML || "로딩 중..."}
            </pre>
          </div>
        </div>

        {/* asChild 방식 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              asChild 방식 (Slot)
            </span>
          </div>

          <div
            ref={asChildRef}
            className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950"
          >
            <Button asChild>
              <a href="https://example.com">링크 버튼</a>
            </Button>
          </div>

          <div className="rounded bg-slate-100 p-3 dark:bg-slate-800">
            <p className="mb-2 text-xs font-medium text-slate-500">
              렌더링된 HTML:
            </p>
            <pre className="overflow-x-auto text-xs text-blue-600 dark:text-blue-400">
              {asChildHTML || "로딩 중..."}
            </pre>
          </div>
        </div>
      </div>

      <button
        onClick={updateHTML}
        className="rounded bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300"
      >
        HTML 새로고침
      </button>

      <div className="rounded bg-amber-100 p-3 text-xs dark:bg-amber-900/50">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          차이점:
        </p>
        <ul className="mt-1 space-y-1 text-amber-700 dark:text-amber-300">
          <li>
            <strong>전통적 방식:</strong> div.traditional-wrapper 가 감싸고 있음
          </li>
          <li>
            <strong>asChild 방식:</strong> &lt;a&gt; 태그만 렌더링됨 (wrapper
            없음)
          </li>
        </ul>
      </div>
    </div>
  );
};

const PropsMergeDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev.slice(-4), message]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
        <div className="mb-4 flex items-center gap-2">
          <div className="size-3 rounded-full bg-green-500" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">
            Props 병합 시각화
          </span>
        </div>

        <div className="space-y-4">
          <div className="rounded bg-white p-3 dark:bg-slate-800">
            <p className="mb-2 text-xs font-medium text-slate-500">
              Button (부모) props:
            </p>
            <code className="text-xs text-green-600 dark:text-green-400">
              {`onClick={() => log("Button clicked")}`}
              <br />
              {`className="bg-blue-600 text-white ..."`}
            </code>
          </div>

          <div className="rounded bg-white p-3 dark:bg-slate-800">
            <p className="mb-2 text-xs font-medium text-slate-500">
              자식 (a 태그) props:
            </p>
            <code className="text-xs text-blue-600 dark:text-blue-400">
              {`onClick={() => log("Link clicked")}`}
              <br />
              {`className="underline font-bold"`}
              <br />
              {`href="https://example.com"`}
            </code>
          </div>

          <div className="flex justify-center py-2">
            <span className="text-2xl">⬇️</span>
          </div>

          <div className="rounded bg-white p-3 dark:bg-slate-800">
            <p className="mb-2 text-xs font-medium text-slate-500">
              병합된 결과:
            </p>
            <code className="text-xs text-purple-600 dark:text-purple-400">
              {`onClick={() => { child(); parent(); }}`}
              <br />
              {`className="bg-blue-600 ... underline font-bold"`}
              <br />
              {`href="https://example.com"`}
            </code>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => addLog("Parent: Button clicked!")}
            asChild
            className="underline"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                addLog("Child: Link clicked!");
              }}
              className="font-bold"
            >
              클릭해서 이벤트 순서 확인
            </a>
          </Button>
        </div>
      </div>

      {/* 이벤트 로그 */}
      <div className="rounded bg-slate-100 p-3 dark:bg-slate-800">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">이벤트 로그:</p>
          <button
            onClick={clearLogs}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            지우기
          </button>
        </div>
        <div className="min-h-[60px] space-y-1">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-400">버튼을 클릭해보세요</p>
          ) : (
            logs.map((log, i) => (
              <p key={i} className="text-xs text-slate-600 dark:text-slate-400">
                {`${i + 1}. ${log}`}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="rounded bg-green-100 p-3 text-xs dark:bg-green-900/50">
        <p className="font-medium text-green-800 dark:text-green-200">
          Props 병합 규칙:
        </p>
        <ul className="mt-1 space-y-1 text-green-700 dark:text-green-300">
          <li>
            <strong>onClick:</strong> 자식 먼저 실행 → 부모 나중 실행
          </li>
          <li>
            <strong>className:</strong> 부모 + 자식 (공백으로 연결)
          </li>
          <li>
            <strong>style:</strong> 부모 + 자식 (자식이 덮어씀)
          </li>
          <li>
            <strong>기타 props:</strong> 자식 값 우선
          </li>
        </ul>
      </div>
    </div>
  );
};

const SemanticDemo = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* 비시맨틱 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              비시맨틱 (button + onClick)
            </span>
          </div>

          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
            <button
              onClick={() => window.open("https://google.com", "_blank")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-all hover:bg-red-700"
            >
              Google로 이동 (button)
            </button>
          </div>

          <div className="rounded bg-slate-100 p-3 text-xs dark:bg-slate-800">
            <p className="mb-1 font-medium text-slate-500">우클릭 해보세요:</p>
            <ul className="space-y-1 text-red-600 dark:text-red-400">
              <li>❌ &quot;새 탭에서 링크 열기&quot; 없음</li>
              <li>❌ &quot;링크 주소 복사&quot; 없음</li>
              <li>❌ 스크린 리더가 &quot;버튼&quot;으로 읽음</li>
            </ul>
          </div>
        </div>

        {/* 시맨틱 (asChild) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              시맨틱 (asChild + a 태그)
            </span>
          </div>

          <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
            <Button asChild>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google로 이동 (a)
              </a>
            </Button>
          </div>

          <div className="rounded bg-slate-100 p-3 text-xs dark:bg-slate-800">
            <p className="mb-1 font-medium text-slate-500">우클릭 해보세요:</p>
            <ul className="space-y-1 text-green-600 dark:text-green-400">
              <li>✅ &quot;새 탭에서 링크 열기&quot; 가능</li>
              <li>✅ &quot;링크 주소 복사&quot; 가능</li>
              <li>✅ 스크린 리더가 &quot;링크&quot;로 읽음</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded bg-purple-100 p-3 text-xs dark:bg-purple-900/50">
        <p className="font-medium text-purple-800 dark:text-purple-200">
          왜 시맨틱이 중요한가?
        </p>
        <ul className="mt-1 space-y-1 text-purple-700 dark:text-purple-300">
          <li>
            <strong>접근성:</strong> 스크린 리더 사용자가 요소의 역할을 정확히
            파악
          </li>
          <li>
            <strong>SEO:</strong> 검색 엔진이 링크 구조를 올바르게 크롤링
          </li>
          <li>
            <strong>UX:</strong> 브라우저 기본 기능 (우클릭 메뉴, 미리보기 등)
            활용 가능
          </li>
          <li>
            <strong>키보드 접근:</strong> 링크는 Tab + Enter, 버튼은 Tab + Space
          </li>
        </ul>
      </div>
    </div>
  );
};

// HTML 포맷팅 헬퍼
const formatHTML = (html: string): string => {
  return html
    .replace(/></g, ">\n<")
    .replace(/class="/g, '\nclass="')
    .replace(/" /g, '"\n')
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8) // 너무 길면 자르기
    .join("\n");
};

export default AsChildDemo;
