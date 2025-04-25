"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { formatMontant, formatDate } from "@/lib/formatters"
import { Search, Download, Filter, Calendar } from "lucide-react"
import { useState } from "react"

type HistoriquePrime = {
  id: string
  reference: string
  montant: number
  datePaiement: Date
  modePaiement: string
  statut: "payée" | "annulée" | "remboursée"
}

const historiquePrimes: HistoriquePrime[] = [
  {
    id: "1",
    reference: "PR-2024-001",
    montant: 78650000,
    datePaiement: new Date(2024, 0, 15),
    modePaiement: "Virement bancaire",
    statut: "payée"
  },
  {
    id: "2",
    reference: "PR-2024-002",
    montant: 82450000,
    datePaiement: new Date(2024, 1, 15),
    modePaiement: "Carte bancaire",
    statut: "payée"
  },
  {
    id: "3",
    reference: "PR-2024-003",
    montant: 85750000,
    datePaiement: new Date(2024, 2, 15),
    modePaiement: "Mobile Money",
    statut: "remboursée"
  }
]

export default function HistoriquePrimes() {
  const [recherche, setRecherche] = useState("")
  const [annee, setAnnee] = useState("2024")

  const primesFiltrees = historiquePrimes.filter(prime => 
    prime.reference.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Historique des Primes</h1>
          <p className="text-muted-foreground">
            Consultez l'historique complet de vos primes d'assurance
          </p>
        </div>

        <Carte>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ChampSaisie
                placeholder="Rechercher par référence..."
                iconeGauche={<Search className="h-4 w-4" />}
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="sm:max-w-xs"
              />
              
              <div className="flex gap-2">
                <ChampSaisie
                  type="number"
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                  className="w-24"
                  iconeGauche={<Calendar className="h-4 w-4" />}
                />
                <Bouton
                  variante="outline"
                  icone={<Filter className="h-4 w-4" />}
                >
                  Filtres
                </Bouton>
                <Bouton
                  variante="outline"
                  icone={<Download className="h-4 w-4" />}
                >
                  Exporter
                </Bouton>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Référence</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mode de paiement</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Montant</th>
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
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(prime.datePaiement)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{prime.modePaiement}</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatMontant(prime.montant)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge 
                          variante={
                            prime.statut === "payée" ? "success" :
                            prime.statut === "annulée" ? "error" : "warning"
                          }
                        >
                          {prime.statut}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Bouton
                          variante="outline"
                          taille="petit"
                          icone={<Download className="h-4 w-4" />}
                        >
                          Reçu
                        </Bouton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Carte>

        <div className="grid gap-4 md:grid-cols-3">
          <Carte>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total des primes payées</p>
              <p className="text-2xl font-bold">{formatMontant(246850000)}</p>
            </div>
          </Carte>
          
          <Carte>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Moyenne par prime</p>
              <p className="text-2xl font-bold">{formatMontant(82283333)}</p>
            </div>
          </Carte>
          
          <Carte>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Nombre de primes</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </Carte>
        </div>
      </div>
    </DashboardLayout>
  )
}