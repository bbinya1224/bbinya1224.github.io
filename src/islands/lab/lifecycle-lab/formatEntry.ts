export const formatEntry = (phase: string, detail: string): string => {
  const timestamp = performance.now().toFixed(1);
  return `[${timestamp}ms] ${phase} → ${detail}`;
};
