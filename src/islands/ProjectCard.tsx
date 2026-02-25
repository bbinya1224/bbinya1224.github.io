import { createPortal } from 'react-dom';
import { useState, useEffect, useCallback, type ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  period?: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  children?: ReactNode;
}

export function ProjectCard({ title, description, period, techStack, repoUrl, demoUrl, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.defaultPrevented) {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, close]);

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm ${isOpen ? 'flex' : 'hidden'}`}
      onClick={close}
    >
      <div
        className="relative m-4 w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#1a1a1a]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <button
            className="shrink-0 cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            onClick={close}
            aria-label="닫기"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {(repoUrl || demoUrl) && (
            <div className="mb-4 flex flex-wrap gap-3">
              {repoUrl && (
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  GitHub 저장소
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700">
                  라이브 데모
                </a>
              )}
            </div>
          )}
          <div className="prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#1a1a1a]"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-amber-500 dark:text-gray-100 dark:group-hover:text-amber-400">
              {title}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            {period && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">기간: {period}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {portalTarget ? createPortal(modalContent, portalTarget) : modalContent}
    </>
  );
}
