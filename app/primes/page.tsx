"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { formatMontant, formatDate } from "@/lib/formatters"
import { Search, Calendar, Filter, Download, ArrowUpDown, Check, X } from "lucide-react"
import { exportToExcel, exportToPDF } from "@/lib/export-utils"

type PrimeType = {
  id: string
  reference: string
  montant: number
  dateEmission: Date
  dateEcheance: Date
  statut: "payée" | "impayée" | "partielle"
  contrat: string
}

const primes: PrimeType[] = [
  {
    id: "1",
    reference: "PR-2025-0001",
    montant: 25000,
    dateEmission: new Date(2025, 0, 15),
    dateEcheance: new Date(2025, 1, 15),
    statut: "payée",
    contrat: "Santé Entreprise Plus"
  },
  {
    id: "2",
    reference: "PR-2025-0002",
    montant: 28000,
    dateEmission: new Date(2025, 1, 15),
    dateEcheance: new Date(2025, 2, 15),
    statut: "payée",
    contrat: "Santé Entreprise Plus"
  },
  {
    id: "3",
    reference: "PR-2025-0003",
    montant: 32000,
    dateEmission: new Date(2025, 2, 15),
    dateEcheance: new Date(2025, 3, 15),
    statut: "partielle",
    contrat: "Santé Entreprise Plus"
  },
  {
    id: "4",
    reference: "PR-2025-0004",
    montant: 35000,
    dateEmission: new Date(2025, 3, 15),
    dateEcheance: new Date(2025, 4, 15),
    statut: "impayée",
    contrat: "Santé Entreprise Plus"
  }
]

export default function Primes() {
  const [recherche, setRecherche] = useState("")
  const [filtreStatut, setFiltreStatut] = useState<string | null>(null)

  const primesFiltrees = primes.filter(prime => {
    const matchRecherche = prime.reference.toLowerCase().includes(recherche.toLowerCase()) ||
                        prime.contrat.toLowerCase().includes(recherche.toLowerCase())
    
    const matchStatut = filtreStatut === null || prime.statut === filtreStatut
    
    return matchRecherche && matchStatut
  })

  const getStatutBadge = (statut: PrimeType["statut"]) => {
    switch (statut) {
      case "payée":
        return <Badge variante="success" className="flex items-center gap-1"><Check className="h-3 w-3" /> Payée</Badge>
      case "impayée":
        return <Badge variante="error" className="flex items-center gap-1"><X className="h-3 w-3" /> Impayée</Badge>
      case "partielle":
        return <Badge variante="warning" className="flex items-center gap-1">Paiement partiel</Badge>
    }
  }

  const handleExport = (format: "excel" | "pdf") => {
    const dataToExport = primes.map(prime => ({
      Référence: prime.reference,
      Contrat: prime.contrat,
      "Date d'émission": formatDate(prime.dateEmission),
      Échéance: formatDate(prime.dateEcheance),
      Montant: formatMontant(prime.montant),
      Statut: prime.statut
    }));

    const filename = `primes_${formatDate(new Date()).replace(/\//g, '-')}`;

    if (format === "excel") {
      exportToExcel(dataToExport, filename);
    } else {
      const columns = ["Référence", "Contrat", "Date d'émission", "Échéance", "Montant", "Statut"];
      exportToPDF(
        dataToExport,
        columns,
        "Rapport des Primes",
        filename
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Gestion des Primes</h1>
          <p className="text-muted-foreground">
            Consultez et gérez vos primes d'assurance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Carte className="lg:col-span-2">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ChampSaisie
                placeholder="Rechercher par référence ou contrat..."
                iconeGauche={<Search className="h-4 w-4" />}
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="sm:max-w-sm"
              />
              
              <div className="flex gap-2">
                <Bouton
                  variante="outline"
                  taille="petit"
                  icone={<Filter className="h-4 w-4" />}
                >
                  Plus de filtres
                </Bouton>
                <Bouton
                  variante="outline"
                  taille="petit"
                  icone={<Download className="h-4 w-4" />}
                >
                  Exporter
                </Bouton>
              </div>
            </div>
            
            <div className="mb-4 flex flex-wrap gap-2">
              <Bouton
                variante={filtreStatut === null ? "primaire" : "outline"}
                taille="petit"
                onClick={() => setFiltreStatut(null)}
              >
                Tous
              </Bouton>
              <Bouton
                variante={filtreStatut === "payée" ? "primaire" : "outline"}
                taille="petit"
                onClick={() => setFiltreStatut("payée")}
                icone={<Check className="h-3 w-3" />}
              >
                Payées
              </Bouton>
              <Bouton
                variante={filtreStatut === "impayée" ? "primaire" : "outline"}
                taille="petit"
                onClick={() => setFiltreStatut("impayée")}
                icone={<X className="h-3 w-3" />}
              >
                Impayées
              </Bouton>
              <Bouton
                variante={filtreStatut === "partielle" ? "primaire" : "outline"}
                taille="petit"
                onClick={() => setFiltreStatut("partielle")}
              >
                Partielles
              </Bouton>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Référence
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contrat</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        Émission
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Échéance</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      <div className="flex items-center justify-end gap-1">
                        Montant
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-muted-foreground">Statut</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {primesFiltrees.map((prime) => (
                    <tr 
                      key={prime.id} 
                      className="border-b border-border transition-colors hover:bg-muted/50"
                    >
                      <td className="px-4 py-3 font-medium">{prime.reference}</td>
                      <td className="px-4 py-3 text-muted-foreground">{prime.contrat}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(prime.dateEmission)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(prime.dateEcheance)}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatMontant(prime.montant)}</td>
                      <td className="px-4 py-3 text-center">{getStatutBadge(prime.statut)}</td>
                      <td className="px-4 py-3 text-right">
                        <Bouton 
                          variante={prime.statut === "impayée" || prime.statut === "partielle" ? "primaire" : "outline"}
                          taille="petit"
                          disabled={prime.statut === "payée"}
                        >
                          {prime.statut === "payée" ? "Détails" : "Payer"}
                        </Bouton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Carte>

          <Carte titre="Récapitulatif" className="h-min">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Primes émises</span>
                <span className="font-medium">{formatMontant(120000)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Primes payées</span>
                <span className="font-medium text-emerald-500">{formatMontant(53000)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Primes en attente</span>
                <span className="font-medium text-amber-500">{formatMontant(32000)}</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm text-muted-foreground">Primes impayées</span>
                <span className="font-medium text-destructive">{formatMontant(35000)}</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted p-3">
                <span className="font-medium">Taux de recouvrement</span>
                <span className="text-lg font-bold">44,17%</span>
              </div>
            </div>
          </Carte>
        </div>
      </div>
    </DashboardLayout>
  )
}