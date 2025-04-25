"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { CreditCard, Smartphone, QrCode, Receipt, Clock, Check, X, Download, Building, Calendar } from "lucide-react"
import { useState } from "react"
import { formatMontant } from "@/lib/formatters"

type ModePaiement = "carte" | "mobile_money"
type StatutPaiement = "payé" | "impayé" | "partiel"

type Paiement = {
  id: string
  date: Date
  montant: number
  montantTotal: number
  reference: string
  mode: ModePaiement
  statut: StatutPaiement
  details?: {
    nomEntreprise: string
    adresse: string
    email: string
    telephone: string
    numeroContrat: string
  }
}

const paiements: Paiement[] = [
  {
    id: "1",
    date: new Date(2025, 3, 15),
    montant: 25000000,
    montantTotal: 25000000,
    reference: "PAY-2025-001",
    mode: "carte",
    statut: "payé",
    details: {
      nomEntreprise: "Entreprise SARL",
      adresse: "01 BP 1234 Abidjan 01",
      email: "contact@entreprise.com",
      telephone: "+225 27 20 30 40 50",
      numeroContrat: "CTR-2025-123"
    }
  },
  {
    id: "2",
    date: new Date(2025, 3, 10),
    montant: 18500000,
    montantTotal: 35000000,
    reference: "PAY-2025-002",
    mode: "mobile_money",
    statut: "partiel",
    details: {
      nomEntreprise: "Entreprise SARL",
      adresse: "01 BP 1234 Abidjan 01",
      email: "contact@entreprise.com",
      telephone: "+225 27 20 30 40 50",
      numeroContrat: "CTR-2025-123"
    }
  },
  {
    id: "3",
    date: new Date(2025, 3, 5),
    montant: 0,
    montantTotal: 15000000,
    reference: "PAY-2025-003",
    mode: "carte",
    statut: "impayé",
    details: {
      nomEntreprise: "Entreprise SARL",
      adresse: "01 BP 1234 Abidjan 01",
      email: "contact@entreprise.com",
      telephone: "+225 27 20 30 40 50",
      numeroContrat: "CTR-2025-123"
    }
  }
]

export default function PaiementsPrimes() {
  const [modePaiement, setModePaiement] = useState<ModePaiement>("carte")
  const [montant, setMontant] = useState("")
  const [paiementSelectionne, setPaiementSelectionne] = useState<Paiement | null>(null)
  
  const getStatutBadge = (statut: StatutPaiement) => {
    switch (statut) {
      case "payé":
        return <Badge variante="success" className="flex items-center gap-1">
          <Check className="h-3 w-3" /> Payé
        </Badge>
      case "partiel":
        return <Badge variante="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Paiement partiel
        </Badge>
      case "impayé":
        return <Badge variante="error" className="flex items-center gap-1">
          <X className="h-3 w-3" /> Impayé
        </Badge>
    }
  }

  const handleDownloadRecu = (paiement: Paiement) => {
    // Créer le contenu du reçu
    const contenuRecu = `
REÇU DE PAIEMENT
----------------

Référence: ${paiement.reference}
Date: ${paiement.date.toLocaleDateString()}
Mode de paiement: ${paiement.mode === "carte" ? "Carte bancaire" : "Mobile Money"}

Entreprise: ${paiement.details?.nomEntreprise}
Adresse: ${paiement.details?.adresse}
Email: ${paiement.details?.email}
Téléphone: ${paiement.details?.telephone}
N° Contrat: ${paiement.details?.numeroContrat}

Montant payé: ${formatMontant(paiement.montant)}
Montant total: ${formatMontant(paiement.montantTotal)}
Statut: ${paiement.statut}

Date d'émission: ${new Date().toLocaleDateString()}
    `

    // Créer un blob et le télécharger
    const blob = new Blob([contenuRecu], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `recu_${paiement.reference}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Paiement des Primes</h1>
          <p className="text-muted-foreground">
            Effectuez vos paiements de primes en toute sécurité
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Carte titre="Nouveau Paiement">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Bouton 
                  variante={modePaiement === "carte" ? "primaire" : "outline"}
                  className="flex-1"
                  onClick={() => setModePaiement("carte")}
                  icone={<CreditCard className="h-4 w-4" />}
                >
                  Carte bancaire
                </Bouton>
                <Bouton 
                  variante={modePaiement === "mobile_money" ? "primaire" : "outline"}
                  className="flex-1"
                  onClick={() => setModePaiement("mobile_money")}
                  icone={<Smartphone className="h-4 w-4" />}
                >
                  Mobile Money
                </Bouton>
              </div>
              
              <ChampSaisie
                label="Montant à payer"
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="0"
              />
              
              {modePaiement === "mobile_money" && (
                <div className="flex justify-center p-4">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <Bouton 
                pleineLargeur
                isLoading={false}
              >
                Procéder au paiement
              </Bouton>
            </div>
          </Carte>

          <Carte titre="Récapitulatif">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Total à payer</span>
                <span className="text-2xl font-bold">{formatMontant(120000000)}</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Déjà payé</span>
                <span className="font-medium text-emerald-500">{formatMontant(43500000)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reste à payer</span>
                <span className="font-medium text-destructive">{formatMontant(76500000)}</span>
              </div>
            </div>
          </Carte>
        </div>

        <Carte titre="Historique des paiements">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Référence</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mode</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Montant payé</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Montant total</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Statut</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paiements.map((paiement) => (
                  <tr 
                    key={paiement.id}
                    className="border-b border-border transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 font-medium">{paiement.reference}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {paiement.date.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {paiement.mode === "carte" ? (
                          <CreditCard className="h-4 w-4" />
                        ) : (
                          <Smartphone className="h-4 w-4" />
                        )}
                        {paiement.mode === "carte" ? "Carte" : "Mobile Money"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatMontant(paiement.montant)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatMontant(paiement.montantTotal)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatutBadge(paiement.statut)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Bouton 
                        variante="outline"
                        taille="petit"
                        icone={<Receipt className="h-4 w-4" />}
                        onClick={() => setPaiementSelectionne(paiement)}
                      >
                        Reçu
                      </Bouton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Carte>

        {/* Modal du reçu */}
        {paiementSelectionne && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Reçu de paiement</h2>
                <Bouton
                  variante="outline"
                  taille="petit"
                  icone={<X className="h-4 w-4" />}
                  onClick={() => setPaiementSelectionne(null)}
                >
                  Fermer
                </Bouton>
              </div>

              <div className="space-y-6">
                {/* En-tête du reçu */}
                <div className="flex justify-between items-start border-b border-border pb-4">
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">Assurance Santé</p>
                    <p className="text-sm text-muted-foreground">01 BP 1234 Abidjan 01</p>
                    <p className="text-sm text-muted-foreground">contact@assurance-sante.ci</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Reçu N°: {paiementSelectionne.reference}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {paiementSelectionne.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Informations du client */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Building className="h-4 w-4" />
                    <h3 className="font-medium">Informations du client</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
                    <div>
                      <p className="font-medium">{paiementSelectionne.details?.nomEntreprise}</p>
                      <p className="text-sm text-muted-foreground">{paiementSelectionne.details?.adresse}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{paiementSelectionne.details?.email}</p>
                      <p className="text-sm text-muted-foreground">{paiementSelectionne.details?.telephone}</p>
                    </div>
                  </div>
                </div>

                {/* Détails du paiement */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Receipt className="h-4 w-4" />
                    <h3 className="font-medium">Détails du paiement</h3>
                  </div>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mode de paiement</span>
                      <span className="font-medium">
                        {paiementSelectionne.mode === "carte" ? "Carte bancaire" : "Mobile Money"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">N° Contrat</span>
                      <span className="font-medium">{paiementSelectionne.details?.numeroContrat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montant payé</span>
                      <span className="font-medium">{formatMontant(paiementSelectionne.montant)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montant total</span>
                      <span className="font-medium">{formatMontant(paiementSelectionne.montantTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Statut</span>
                      <span>{getStatutBadge(paiementSelectionne.statut)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-6">
                  <Bouton
                    variante="outline"
                    onClick={() => setPaiementSelectionne(null)}
                  >
                    Fermer
                  </Bouton>
                  <Bouton
                    variante="primaire"
                    icone={<Download className="h-4 w-4" />}
                    onClick={() => handleDownloadRecu(paiementSelectionne)}
                  >
                    Télécharger
                  </Bouton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}