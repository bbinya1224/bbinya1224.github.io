"use client";

import { useState } from "react";
import GithubIcon from "@/shared/icons/ic_github.svg";
import MailIcon from "@/shared/icons/ic_mail.svg";
import * as Tooltip from "@radix-ui/react-tooltip";

const MailTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row gap-4">
      <a
        href="https://github.com/bbinya1224"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon className="size-7 hover:opacity-50" />
      </a>
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root open={open} onOpenChange={setOpen}>
          <Tooltip.Trigger asChild>
            <a
              href="mailto:bbinya1224@gmail.com"
              className="group relative"
              aria-label="Send email to bbinya1224@gmail.com"
            >
              <MailIcon className="size-7 transition-opacity hover:opacity-50" />
            </a>
          </Tooltip.Trigger>

          <Tooltip.Portal>
            <Tooltip.Content
              className="animate-in fade-in-0 zoom-in-95 z-50 rounded-md bg-black px-3 py-2 text-sm text-white shadow-lg duration-200 dark:bg-white dark:text-black"
              sideOffset={6}
              side="top"
            >
              bbinya1224@gmail.com
              <Tooltip.Arrow
                className="fill-black dark:fill-white"
                width={11}
                height={5}
              />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default MailTooltip;
