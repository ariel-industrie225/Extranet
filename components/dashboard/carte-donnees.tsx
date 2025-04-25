import { ArrowDown, ArrowUp, BarChart2, FileText, Receipt, Users } from "lucide-react"
import { Carte } from "@/components/ui-custom/carte"
import { cn } from "@/lib/utils"

type IconeType = "receipt" | "file-text" | "users" | "bar-chart-2"

type PropsCarteDonnees = {
  titre: string
  valeur: string
  comparaison: string
  tendancePositive: boolean
  icone: IconeType
  className?: string
}

const icones = {
  "receipt": Receipt,
  "file-text": FileText,
  "users": Users,
  "bar-chart-2": BarChart2
}

export function CarteDonnees({
  titre,
  valeur,
  comparaison,
  tendancePositive,
  icone,
  className
}: PropsCarteDonnees) {
  const Icone = icones[icone]
  
  return (
    <Carte className={cn("overflow-hidden", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{titre}</p>
          <h3 className="mt-2 text-2xl font-bold">{valeur}</h3>
          
          <div className="mt-2 flex items-center">
            {tendancePositive ? (
              <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-destructive" />
            )}
            
            <span 
              className={cn(
                "text-xs font-medium",
                tendancePositive ? "text-emerald-500" : "text-destructive"
              )}
            >
              {comparaison}
            </span>
          </div>
        </div>
        
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icone className="h-5 w-5" />
        </div>
      </div>
    </Carte>
  )
}