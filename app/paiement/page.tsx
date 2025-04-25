"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { CreditCard, Smartphone, QrCode, Receipt, Clock, Check, X } from "lucide-react"
import { useState } from "react"
import { formatMontant } from "@/lib/formatters"

type ModePaiement = "carte" | "mobile_money"
type StatutPaiement = "en_cours" | "succes" | "echec"

type Paiement = {
  id: string
  date: Date
  montant: number
  reference: string
  mode: ModePaiement
  statut: StatutPaiement
}

type FormulaireCarte = {
  numero: string
  dateExpiration: string
  cvc: string
  nomTitulaire: string
}

const paiements: Paiement[] = [
  {
    id: "1",
    date: new Date(2025, 3, 15),
    montant: 25000,
    reference: "PAY-2025-001",
    mode: "carte",
    statut: "succes"
  },
  {
    id: "2",
    date: new Date(2025, 3, 10),
    montant: 18500,
    reference: "PAY-2025-002",
    mode: "mobile_money",
    statut: "en_cours"
  }
]

export default function Paiement() {
  const [modePaiement, setModePaiement] = useState<ModePaiement>("carte")
  const [montant, setMontant] = useState("")
  const [formulaireCarte, setFormulaireCarte] = useState<FormulaireCarte>({
    numero: "",
    dateExpiration: "",
    cvc: "",
    nomTitulaire: ""
  })
  
  const formaterNumeroCarte = (value: string) => {
    const numero = value.replace(/\D/g, "")
    const groupes = numero.match(/.{1,4}/g) || []
    return groupes.join(" ").substr(0, 19)
  }

  const formaterDateExpiration = (value: string) => {
    const date = value.replace(/\D/g, "")
    if (date.length >= 2) {
      return `${date.slice(0, 2)}/${date.slice(2, 4)}`
    }
    return date
  }

  const handleNumeroCarteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeurFormatee = formaterNumeroCarte(e.target.value)
    setFormulaireCarte(prev => ({ ...prev, numero: valeurFormatee }))
  }

  const handleDateExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valeurFormatee = formaterDateExpiration(e.target.value)
    setFormulaireCarte(prev => ({ ...prev, dateExpiration: valeurFormatee }))
  }

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cvc = e.target.value.replace(/\D/g, "").substr(0, 3)
    setFormulaireCarte(prev => ({ ...prev, cvc }))
  }

  const getStatutBadge = (statut: StatutPaiement) => {
    switch (statut) {
      case "succes":
        return <Badge variante="success" className="flex items-center gap-1">
          <Check className="h-3 w-3" /> Succès
        </Badge>
      case "en_cours":
        return <Badge variante="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> En cours
        </Badge>
      case "echec":
        return <Badge variante="error" className="flex items-center gap-1">
          <X className="h-3 w-3" /> Échec
        </Badge>
    }
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Paiement</h1>
          <p className="text-muted-foreground">
            Effectuez vos paiements en toute sécurité
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

              {modePaiement === "carte" ? (
                <div className="space-y-4">
                  <ChampSaisie
                    label="Numéro de carte"
                    value={formulaireCarte.numero}
                    onChange={handleNumeroCarteChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    iconeGauche={<CreditCard className="h-4 w-4" />}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <ChampSaisie
                      label="Date d'expiration"
                      value={formulaireCarte.dateExpiration}
                      onChange={handleDateExpirationChange}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                    />
                    
                    <ChampSaisie
                      label="Code de sécurité (CVC)"
                      value={formulaireCarte.cvc}
                      onChange={handleCVCChange}
                      placeholder="123"
                      maxLength={3}
                      type="password"
                      required
                    />
                  </div>
                  
                  <ChampSaisie
                    label="Nom du titulaire (optionnel)"
                    value={formulaireCarte.nomTitulaire}
                    onChange={(e) => setFormulaireCarte(prev => ({ ...prev, nomTitulaire: e.target.value }))}
                    placeholder="JEAN DUPONT"
                  />
                </div>
              ) : (
                <div className="flex justify-center p-4">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <Bouton 
                pleineLargeur
                isLoading={false}
                variante="primaire"
              >
                {modePaiement === "carte" ? "Valider le paiement" : "Scanner pour payer"}
              </Bouton>
            </div>
          </Carte>

          <Carte titre="Récapitulatif">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Total à payer</span>
                <span className="text-2xl font-bold">{formatMontant(120000)}</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Déjà payé</span>
                <span className="font-medium text-emerald-500">{formatMontant(43500)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reste à payer</span>
                <span className="font-medium text-destructive">{formatMontant(76500)}</span>
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
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Montant</th>
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
                    <td className="px-4 py-3 text-center">
                      {getStatutBadge(paiement.statut)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Bouton 
                        variante="outline"
                        taille="petit"
                        icone={<Receipt className="h-4 w-4" />}
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
      </div>
    </DashboardLayout>
  )
}