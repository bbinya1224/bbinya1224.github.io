
import { useEffect, useLayoutEffect } from "react";
import type { Logger } from "./type";

type ChildLifecycleProbeProps = {
  count: number;
  log: Logger;
};

const ChildLifecycleProbe = ({ count, log }: ChildLifecycleProbeProps) => {
  useLayoutEffect(() => {
    log("Child useLayoutEffect", `count=${count}`);
    return () => log("Child useLayoutEffect cleanup", `count=${count}`);
  }, [count, log]);

  useEffect(() => {
    log("Child useEffect", `count=${count}`);
    return () => log("Child useEffect cleanup", `count=${count}`);
  }, [count, log]);

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-3 text-sm">
      Child count: {count}
    </div>
  );
};

export default ChildLifecycleProbe;
