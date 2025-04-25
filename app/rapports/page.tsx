"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { FileText, Download, Filter, Calendar, BarChart2, X } from "lucide-react"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatMontant } from "@/lib/formatters"

type TypeRapport = "sp" | "consommation" | "demographie" | "financier"

type Rapport = {
  id: string
  titre: string
  type: TypeRapport
  dateGeneration: Date
  taille: string
  contenu: string
  resume: string
  indicateurs: {
    label: string
    valeur: string
  }[]
}

const rapports: Rapport[] = [
  {
    id: "1",
    titre: "Rapport S/P T1 2025",
    type: "sp",
    dateGeneration: new Date(2025, 3, 15),
    taille: "2.4 MB",
    contenu: "Rapport S/P du premier trimestre 2025\n\nRatio S/P: 81.25%\nPrimes: 78 650 000 FCFA\nSinistres: 63 875 000 FCFA",
    resume: "Analyse détaillée du ratio Sinistres/Primes pour le premier trimestre 2025, montrant une légère augmentation par rapport au trimestre précédent.",
    indicateurs: [
      { label: "Ratio S/P", valeur: "81.25%" },
      { label: "Primes", valeur: "78 650 000 FCFA" },
      { label: "Sinistres", valeur: "63 875 000 FCFA" },
      { label: "Évolution", valeur: "+2.5%" }
    ]
  },
  {
    id: "2",
    titre: "Analyse Consommation Mars",
    type: "consommation",
    dateGeneration: new Date(2025, 3, 10),
    taille: "1.8 MB",
    contenu: "Analyse des consommations - Mars 2025\n\nConsommation totale: 32 450 000 FCFA\nNombre d'actes: 450\nCoût moyen par acte: 72 111 FCFA",
    resume: "Vue d'ensemble des consommations médicales pour le mois de mars 2025, avec une analyse des tendances et des postes de dépenses majeurs.",
    indicateurs: [
      { label: "Total consommations", valeur: "32 450 000 FCFA" },
      { label: "Nombre d'actes", valeur: "450" },
      { label: "Coût moyen/acte", valeur: "72 111 FCFA" },
      { label: "Top dépense", valeur: "Hospitalisation" }
    ]
  },
  {
    id: "3",
    titre: "Démographie Q1 2025",
    type: "demographie",
    dateGeneration: new Date(2025, 3, 5),
    taille: "3.1 MB",
    contenu: "Rapport démographique Q1 2025\n\nEffectif total: 285\nÂge moyen: 42 ans\nRépartition H/F: 55%/45%",
    resume: "Analyse démographique complète de la population assurée pour le premier trimestre 2025, incluant la pyramide des âges et la répartition par catégorie.",
    indicateurs: [
      { label: "Effectif total", valeur: "285" },
      { label: "Âge moyen", valeur: "42 ans" },
      { label: "Ratio H/F", valeur: "55%/45%" },
      { label: "Adhérents", valeur: "180" }
    ]
  }
]

// Données simulées pour l'aperçu
const donneesApercu = [
  { categorie: "Hospitalisation", montant: 35000000 },
  { categorie: "Consultation", montant: 18000000 },
  { categorie: "Pharmacie", montant: 15000000 },
  { categorie: "Dentaire", montant: 12000000 },
  { categorie: "Optique", montant: 9000000 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-lg shadow">
        <p className="font-medium">{label}</p>
        <p className="text-sm">
          Montant: {formatMontant(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export default function Rapports() {
  const [typeRapport, setTypeRapport] = useState<TypeRapport>("sp")
  const [periode, setPeriode] = useState("")
  const [filtres, setFiltres] = useState({
    beneficiaire: "",
    acte: "",
    montantMin: "",
    montantMax: ""
  })
  const [rapportSelectionne, setRapportSelectionne] = useState<Rapport | null>(null)

  const handleDownload = (rapport: Rapport) => {
    const blob = new Blob([rapport.contenu], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const extension = rapport.type === "sp" ? "txt" : 
                     rapport.type === "consommation" ? "csv" : 
                     rapport.type === "demographie" ? "txt" : "txt"
    link.download = `${rapport.titre.toLowerCase().replace(/ /g, '_')}.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Rapports & États Techniques</h1>
          <p className="text-muted-foreground">
            Générez et consultez vos rapports d'analyse
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Carte titre="Générer un rapport">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Bouton 
                  variante={typeRapport === "sp" ? "primaire" : "outline"}
                  onClick={() => setTypeRapport("sp")}
                >
                  Ratio S/P
                </Bouton>
                <Bouton 
                  variante={typeRapport === "consommation" ? "primaire" : "outline"}
                  onClick={() => setTypeRapport("consommation")}
                >
                  Consommation
                </Bouton>
                <Bouton 
                  variante={typeRapport === "demographie" ? "primaire" : "outline"}
                  onClick={() => setTypeRapport("demographie")}
                >
                  Démographie
                </Bouton>
                <Bouton 
                  variante={typeRapport === "financier" ? "primaire" : "outline"}
                  onClick={() => setTypeRapport("financier")}
                >
                  Financier
                </Bouton>
              </div>
              
              <div className="flex gap-2">
                <ChampSaisie
                  type="date"
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  className="flex-1"
                />
                <Bouton
                  variante="outline"
                  icone={<Filter className="h-4 w-4" />}
                  onClick={() => document.getElementById('filtres')?.classList.toggle('hidden')}
                >
                  Filtres
                </Bouton>
              </div>

              <div id="filtres" className="hidden space-y-4 p-4 bg-muted rounded-lg">
                <ChampSaisie
                  label="Bénéficiaire"
                  value={filtres.beneficiaire}
                  onChange={(e) => setFiltres({...filtres, beneficiaire: e.target.value})}
                />
                <ChampSaisie
                  label="Type d'acte"
                  type="select"
                  value={filtres.acte}
                  onChange={(e) => setFiltres({...filtres, acte: e.target.value})}
                >
                  <option value="">Tous les actes</option>
                  <option value="consultation">Consultation</option>
                  <option value="hospitalisation">Hospitalisation</option>
                  <option value="pharmacie">Pharmacie</option>
                </ChampSaisie>
                <div className="grid grid-cols-2 gap-4">
                  <ChampSaisie
                    label="Montant minimum"
                    type="number"
                    value={filtres.montantMin}
                    onChange={(e) => setFiltres({...filtres, montantMin: e.target.value})}
                  />
                  <ChampSaisie
                    label="Montant maximum"
                    type="number"
                    value={filtres.montantMax}
                    onChange={(e) => setFiltres({...filtres, montantMax: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-4">Aperçu du rapport</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donneesApercu}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="categorie" />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="montant" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <Bouton pleineLargeur>
                Générer le rapport
              </Bouton>
            </div>
          </Carte>

          <Carte titre="Rapports récents">
            <div className="space-y-4">
              {rapports.slice(0, 3).map((rapport) => (
                <div 
                  key={rapport.id} 
                  className="rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => setRapportSelectionne(rapport)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">{rapport.titre}</h3>
                    </div>
                    <Badge variante="secondary">
                      {rapport.type === "sp" ? "Ratio S/P" :
                       rapport.type === "consommation" ? "Consommation" :
                       rapport.type === "demographie" ? "Démographie" : "Financier"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{rapport.dateGeneration.toLocaleDateString()}</span>
                    <span>{rapport.taille}</span>
                  </div>
                </div>
              ))}
            </div>
          </Carte>
        </div>

        <Carte titre="Historique des rapports">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Titre</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Taille</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rapports.map((rapport) => (
                  <tr 
                    key={rapport.id}
                    className="border-b border-border transition-colors hover:bg-muted/50 cursor-pointer"
                    onClick={() => setRapportSelectionne(rapport)}
                  >
                    <td className="px-4 py-3 font-medium">{rapport.titre}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {rapport.type === "sp" ? "Ratio S/P" : 
                       rapport.type === "consommation" ? "Consommation" :
                       rapport.type === "demographie" ? "Démographie" : "Financier"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {rapport.dateGeneration.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {rapport.taille}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Bouton 
                        variante="outline"
                        taille="petit"
                        icone={<Download className="h-4 w-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(rapport)
                        }}
                      >
                        Télécharger
                      </Bouton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Carte>

        {rapportSelectionne && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{rapportSelectionne.titre}</h2>
                </div>
                <Bouton
                  variante="outline"
                  taille="petit"
                  icone={<X className="h-4 w-4" />}
                  onClick={() => setRapportSelectionne(null)}
                >
                  Fermer
                </Bouton>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Résumé</h3>
                  <p className="text-muted-foreground">{rapportSelectionne.resume}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Indicateurs clés</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {rapportSelectionne.indicateurs.map((indicateur, index) => (
                      <div key={index} className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">{indicateur.label}</p>
                        <p className="text-lg font-semibold">{indicateur.valeur}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Bouton
                    variante="outline"
                    onClick={() => setRapportSelectionne(null)}
                  >
                    Fermer
                  </Bouton>
                  <Bouton
                    variante="primaire"
                    icone={<Download className="h-4 w-4" />}
                    onClick={() => handleDownload(rapportSelectionne)}
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