import { createPortal } from 'react-dom';
import { useState, useEffect, useRef, type ReactNode } from 'react';

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
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.defaultPrevented) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm ${isOpen ? 'flex' : 'hidden'}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="relative m-4 w-full max-w-4xl rounded-2xl border border-line bg-surface shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line p-6">
          <div>
            <h2 className="text-2xl font-bold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-subtle">{description}</p>
          </div>
          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-full p-2 text-subtle transition-colors hover:bg-canvas hover:text-ink"
            onClick={() => setIsOpen(false)}
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
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-3 py-1 text-sm text-ink transition hover:bg-canvas">
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
      <button
        type="button"
        className="group cursor-pointer rounded-2xl border border-line bg-surface p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink group-hover:text-amber-500 dark:group-hover:text-amber-400">
              {title}
            </h2>
            <p className="mt-1 text-sm text-subtle">{description}</p>
            {period && <p className="mt-1 text-xs text-subtle">기간: {period}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full bg-canvas px-2 py-0.5 text-xs text-ink">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </button>

      {portalTarget ? createPortal(modalContent, portalTarget) : modalContent}
    </>
  );
}
