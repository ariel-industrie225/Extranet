import { cn } from "@/lib/utils"

type VarianteBadge = "default" | "secondary" | "outline" | "success" | "warning" | "error"

type PropsBadge = React.HTMLAttributes<HTMLDivElement> & {
  variante?: VarianteBadge
  children: React.ReactNode
}

export function Badge({ 
  variante = "default", 
  className, 
  children, 
  ...props 
}: PropsBadge) {
  const varianteClasses = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-background",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/30 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-400",
    error: "bg-destructive/10 text-destructive dark:bg-destructive/30"
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        varianteClasses[variante],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}