import { cn } from "@/lib/utils";

export enum SkeletonVariant {
  DEFAULT = "default",
  CARD = "card",
}

type Props = {
  className?: string;
  variant?: SkeletonVariant;
} & React.HTMLAttributes<HTMLDivElement>;

function Skeleton({
  className,
  variant = SkeletonVariant.DEFAULT,
  ...props
}: Props) {
  if (variant === SkeletonVariant.CARD)
    return (
      <div
        data-slot="skeleton"
        className={cn(
          "flex flex-col gap-3 flex-grow basis-[280px] max-w-sm mx-auto mt-3",
          className
        )}
        {...props}
      >
        <div className="bg-muted animate-pulse rounded-md aspect-square" />
        <div className="flex w-full justify-between">
          <div className="w-[75%] rounded-md h-4 bg-muted animate-pulse" />
          <div className="w-[15%] rounded-md h-4 bg-muted animate-pulse" />
        </div>
        <div className="w-[55%] rounded-md h-4 bg-muted animate-pulse mt-2" />
      </div>
    );

  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-lg animate-pulse", className)}
      {...props}
    />
  );
}

export { Skeleton };
