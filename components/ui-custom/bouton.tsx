import { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type VarianteBouton = "primaire" | "secondaire" | "outline" | "texte" | "destructeur"
type TailleBouton = "petit" | "moyen" | "large"

type PropsBouton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variante?: VarianteBouton
  taille?: TailleBouton
  icone?: ReactNode
  iconePosition?: "gauche" | "droite"
  pleineLargeur?: boolean
  isLoading?: boolean
}

export function Bouton({
  children,
  variante = "primaire",
  taille = "moyen",
  icone,
  iconePosition = "gauche",
  pleineLargeur = false,
  isLoading = false,
  className,
  disabled,
  ...props
}: PropsBouton) {
  const varianteClasses = {
    primaire: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondaire: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-input bg-background hover:bg-muted hover:text-accent-foreground",
    texte: "text-primary underline-offset-4 hover:underline",
    destructeur: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
  }
  
  const tailleClasses = {
    petit: "h-8 rounded-md px-3 text-xs",
    moyen: "h-10 rounded-md px-4 py-2 text-sm",
    large: "h-12 rounded-md px-6 py-3 text-base"
  }
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        varianteClasses[variante],
        tailleClasses[taille],
        pleineLargeur ? "w-full" : "",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
      ) : icone && iconePosition === "gauche" ? (
        <span className="mr-2">{icone}</span>
      ) : null}
      
      {children}
      
      {!isLoading && icone && iconePosition === "droite" ? (
        <span className="ml-2">{icone}</span>
      ) : null}
    </button>
  )
}