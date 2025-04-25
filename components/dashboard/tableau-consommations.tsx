import { Badge } from "@/components/ui-custom/badge"
import { formatDate, formatMontant } from "@/lib/formatters"

type ConsommationType = {
  id: string
  beneficiaire: string
  date: Date
  acte: string
  montant: number
  remboursement: number
  statut: "remboursé" | "en cours" | "refusé"
}

const consommations: ConsommationType[] = [
  {
    id: "1",
    beneficiaire: "Durand Jean",
    date: new Date(2025, 3, 15),
    acte: "Consultation spécialiste",
    montant: 50,
    remboursement: 35,
    statut: "remboursé"
  },
  {
    id: "2",
    beneficiaire: "Martin Sophie",
    date: new Date(2025, 3, 14),
    acte: "Analyse biologique",
    montant: 75.50,
    remboursement: 75.50,
    statut: "remboursé"
  },
  {
    id: "3",
    beneficiaire: "Dubois Thomas",
    date: new Date(2025, 3, 12),
    acte: "Imagerie médicale",
    montant: 120,
    remboursement: 84,
    statut: "remboursé"
  },
  {
    id: "4",
    beneficiaire: "Petit Émilie",
    date: new Date(2025, 3, 10),
    acte: "Hospitalisation",
    montant: 850,
    remboursement: 0,
    statut: "en cours"
  },
  {
    id: "5",
    beneficiaire: "Leroy Lucas",
    date: new Date(2025, 3, 5),
    acte: "Médicaments",
    montant: 32.40,
    remboursement: 0,
    statut: "refusé"
  }
]

export function TableauConsommations() {
  const renderStatut = (statut: ConsommationType["statut"]) => {
    const variants = {
      remboursé: "success",
      "en cours": "warning",
      refusé: "error"
    }
    
    const variant = variants[statut]
    
    return <Badge variante={variant}>{statut}</Badge>
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Bénéficiaire</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Acte</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Montant</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Remboursement</th>
            <th className="px-4 py-3 text-center font-medium text-muted-foreground">Statut</th>
          </tr>
        </thead>
        <tbody>
          {consommations.map((item) => (
            <tr 
              key={item.id} 
              className="border-b border-border transition-colors hover:bg-muted/50"
            >
              <td className="px-4 py-3 font-medium">{item.beneficiaire}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(item.date)}</td>
              <td className="px-4 py-3">{item.acte}</td>
              <td className="px-4 py-3 text-right">{formatMontant(item.montant)}</td>
              <td className="px-4 py-3 text-right">{formatMontant(item.remboursement)}</td>
              <td className="px-4 py-3 text-center">{renderStatut(item.statut)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}