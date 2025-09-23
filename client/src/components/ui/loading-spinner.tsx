import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div 
      className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", className)}
      data-testid="loading-spinner"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
