"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/app/components/common/Button";
import Input from "../Input";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

function usePopover() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}

function usePopoverLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote("");
  };

  return { isOpen, openPopover, closePopover, uniqueId, note, setNote };
}

interface PopoverRootProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverRoot = React.forwardRef<HTMLDivElement, PopoverRootProps>(
  ({ children, className }, ref) => {
    const popoverLogic = usePopoverLogic();

    return (
      <PopoverContext.Provider value={popoverLogic}>
        <MotionConfig transition={TRANSITION}>
          <div
            ref={ref}
            className={cn("relative flex items-center w-full", className)}
          >
            {children}
          </div>
        </MotionConfig>
      </PopoverContext.Provider>
    );
  }
);
PopoverRoot.displayName = "PopoverRoot";

interface PopoverTriggerProps {
  className?: string;
  fromDate?: string;
  toDate?: string;
}

const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ className, fromDate = "", toDate = "" }, ref) => {
    const { openPopover, uniqueId } = usePopover();

    return (
      <motion.div
        ref={ref}
        key="inputs"
        layoutId={`popover-${uniqueId}`}
        className={cn(
          "flex items-center justify-center gap-2 w-full",
          className
        )}
      >
        <Input
          readOnly
          onClick={openPopover}
          onFocus={openPopover}
          value={fromDate}
          placeholder="From"
          className="cursor-pointer w-full"
          aria-label="date"
        />
        <Input
          readOnly
          onClick={openPopover}
          onFocus={openPopover}
          value={toDate}
          placeholder="To"
          className="cursor-pointer w-full"
          aria-label="date"
        />
      </motion.div>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className }, ref) => {
    const { isOpen, closePopover, uniqueId } = usePopover();
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          closePopover();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [closePopover]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") closePopover();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closePopover]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            layoutId={`popover-${uniqueId}`}
            className={cn(
              "absolute z-50 -right-5 max-w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
              className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

interface PopoverFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

const PopoverForm = React.forwardRef<HTMLFormElement, PopoverFormProps>(
  ({ children, onSubmit, className }, ref) => {
    const { note, closePopover } = usePopover();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(note);
      closePopover();
    };

    return (
      <form
        ref={ref}
        className={cn("flex h-full flex-col", className)}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    );
  }
);
PopoverForm.displayName = "PopoverForm";

interface PopoverLabelProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverLabel = React.forwardRef<HTMLSpanElement, PopoverLabelProps>(
  ({ children, className }, ref) => {
    const { uniqueId, note } = usePopover();

    return (
      <motion.span
        ref={ref}
        layoutId={`popover-label-${uniqueId}`}
        aria-hidden="true"
        style={{
          opacity: note ? 0 : 1,
        }}
        className={cn(
          "absolute left-4 top-3 select-none text-sm text-muted-foreground",
          className
        )}
      >
        {children}
      </motion.span>
    );
  }
);
PopoverLabel.displayName = "PopoverLabel";

interface PopoverTextareaProps {
  className?: string;
  id?: string;
}

const PopoverTextarea = React.forwardRef<
  HTMLTextAreaElement,
  PopoverTextareaProps
>(({ className, id }, ref) => {
  const { note, setNote } = usePopover();

  return (
    <textarea
      ref={ref}
      id={id}
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
});
PopoverTextarea.displayName = "PopoverTextarea";

interface PopoverFooterProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        key="close"
        className={cn(
          "flex items-center justify-between border-t bg-muted/50 px-4 py-3",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
PopoverFooter.displayName = "PopoverFooter";

interface PopoverCloseButtonProps {
  className?: string;
  label: string;
}

const PopoverCloseButton = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseButtonProps
>(({ className }, ref) => {
  const { closePopover } = usePopover();

  return (
    <Button
      label="Close"
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={closePopover}
      aria-label="Close popover"
    />
  );
});
PopoverCloseButton.displayName = "PopoverCloseButton";

const PopoverSubmitButton = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseButtonProps
>(({ className, label }, ref) => {
  const { closePopover } = usePopover();
  return (
    <Button
      ref={ref}
      label={label}
      size="sm"
      onClick={closePopover}
      className={className}
      type="button"
      aria-label="Confirm dates"
    >
      {label}
    </Button>
  );
});
PopoverSubmitButton.displayName = "PopoverSubmitButton";

interface PopoverHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-b px-4 py-2.5 font-medium text-foreground/90",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
PopoverHeader.displayName = "PopoverHeader";

interface PopoverBodyProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverBody = React.forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("p-4", className)}>
        {children}
      </div>
    );
  }
);
PopoverBody.displayName = "PopoverBody";

interface PopoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const PopoverButton = React.forwardRef<HTMLButtonElement, PopoverButtonProps>(
  ({ children, onClick, className }, ref) => {
    return (
      <Button
        label="Hello world"
        ref={ref}
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-4 py-2 font-normal",
          className
        )}
        onClick={onClick}
      ></Button>
    );
  }
);
PopoverButton.displayName = "PopoverButton";

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
};
