import { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type PropsCarte = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  titre?: string
  description?: string
  pied?: ReactNode
  variante?: "default" | "border"
}

export function Carte({
  children,
  titre,
  description,
  pied,
  variante = "default",
  className,
  ...props
}: PropsCarte) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow",
        variante === "border" && "border border-border",
        className
      )}
      {...props}
    >
      {(titre || description) && (
        <div className="border-b border-border p-6">
          {titre && <h3 className="font-semibold leading-none tracking-tight">{titre}</h3>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
      {pied && <div className="border-t border-border p-6">{pied}</div>}
    </div>
  )
}