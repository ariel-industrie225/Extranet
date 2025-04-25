import { InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export type PropsChampSaisie = Omit<InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, 'type'> & {
  erreur?: string
  label?: string
  iconeGauche?: React.ReactNode
  iconeDroite?: React.ReactNode
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea'
}

const ChampSaisie = forwardRef<HTMLInputElement, PropsChampSaisie>(
  ({ className, erreur, label, iconeGauche, iconeDroite, type = 'text', children, ...props }, ref) => {
    const inputClasses = cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
      iconeGauche && "pl-9",
      iconeDroite && "pr-9",
      erreur && "border-destructive focus-visible:ring-destructive",
      className
    )

    return (
      <div className="w-full">
        {label && (
          <label
            className="mb-2 block text-sm font-medium text-foreground"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {iconeGauche && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              {iconeGauche}
            </div>
          )}
          
          {type === 'select' ? (
            <select
              className={inputClasses}
              {...props}
            >
              {children}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              className={cn(inputClasses, "h-24 py-2")}
              {...props}
            />
          ) : (
            <input
              type={type}
              className={inputClasses}
              ref={ref}
              {...props}
            />
          )}
          
          {iconeDroite && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              {iconeDroite}
            </div>
          )}
        </div>
        
        {erreur && <p className="mt-1 text-xs text-destructive">{erreur}</p>}
      </div>
    )
  }
)

ChampSaisie.displayName = "ChampSaisie"

export { ChampSaisie }