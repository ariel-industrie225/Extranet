"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { Upload, Users, UserPlus, UserMinus, FileSpreadsheet, AlertCircle } from "lucide-react"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type TypeMouvement = "incorporation" | "retrait"
type StatutMouvement = "en_attente" | "valide" | "rejete"
type TypeBeneficiaire = "adherent" | "conjoint" | "enfant"
type MotifRetrait = "deces" | "fin_contrat" | "autre"

type Mouvement = {
  id: string
  type: TypeMouvement
  date: Date
  nombrePersonnes: number
  statut: StatutMouvement
  fichier?: string
}

type FormIncorporation = {
  college: string
  typeBeneficiaire: TypeBeneficiaire
  nom: string
  prenom: string
  dateNaissance: string
  email: string
  telephone: string
}

type FormRetrait = {
  nom: string
  prenom: string
  motif: MotifRetrait
  dateEffet: string
  commentaire: string
}

const mouvements: Mouvement[] = [
  {
    id: "1",
    type: "incorporation",
    date: new Date(2025, 3, 15),
    nombrePersonnes: 12,
    statut: "valide",
    fichier: "incorporation_avril.xlsx"
  },
  {
    id: "2",
    type: "retrait",
    date: new Date(2025, 3, 10),
    nombrePersonnes: 3,
    statut: "en_attente",
    fichier: "retrait_avril.xlsx"
  }
]

const colleges = [
  "Cadres",
  "Employés",
  "Ouvriers",
  "Retraités"
]

// Données pour le graphique d'évolution des effectifs
const donneesEffectifs = [
  { mois: "Jan", effectif: 250 },
  { mois: "Fév", effectif: 265 },
  { mois: "Mar", effectif: 278 },
  { mois: "Avr", effectif: 285 },
  { mois: "Mai", effectif: 290 },
  { mois: "Juin", effectif: 288 },
  { mois: "Juil", effectif: 292 },
  { mois: "Août", effectif: 295 },
  { mois: "Sep", effectif: 298 },
  { mois: "Oct", effectif: 305 },
  { mois: "Nov", effectif: 310 },
  { mois: "Déc", effectif: 315 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-lg shadow">
        <p className="font-medium">{label}</p>
        <p className="text-sm">
          Effectif: {payload[0].value} personnes
        </p>
      </div>
    )
  }
  return null
}

export default function Mouvements() {
  const [typeMouvement, setTypeMouvement] = useState<"incorporation" | "retrait" | "import">("incorporation")
  const [fichierSelectionne, setFichierSelectionne] = useState<File | null>(null)
  const [formIncorporation, setFormIncorporation] = useState<FormIncorporation>({
    college: "",
    typeBeneficiaire: "adherent",
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    telephone: ""
  })
  const [formRetrait, setFormRetrait] = useState<FormRetrait>({
    nom: "",
    prenom: "",
    motif: "fin_contrat",
    dateEffet: "",
    commentaire: ""
  })
  
  const getStatutBadge = (statut: StatutMouvement) => {
    switch (statut) {
      case "valide":
        return <Badge variante="success">Validé</Badge>
      case "en_attente":
        return <Badge variante="warning">En attente</Badge>
      case "rejete":
        return <Badge variante="error">Rejeté</Badge>
    }
  }

  const handleIncorporationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Incorporation:", formIncorporation)
  }

  const handleRetraitSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Retrait:", formRetrait)
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Mouvements de Personnel</h1>
          <p className="text-muted-foreground">
            Gérez les incorporations et retraits de votre effectif
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Carte>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Bouton 
                  variante={typeMouvement === "incorporation" ? "primaire" : "outline"} 
                  className="flex-1"
                  onClick={() => setTypeMouvement("incorporation")}
                  icone={<UserPlus className="h-4 w-4" />}
                >
                  Incorporation
                </Bouton>
                <Bouton 
                  variante={typeMouvement === "retrait" ? "primaire" : "outline"}
                  className="flex-1"
                  onClick={() => setTypeMouvement("retrait")}
                  icone={<UserMinus className="h-4 w-4" />}
                >
                  Retrait
                </Bouton>
                <Bouton 
                  variante={typeMouvement === "import" ? "primaire" : "outline"}
                  className="flex-1"
                  onClick={() => setTypeMouvement("import")}
                  icone={<FileSpreadsheet className="h-4 w-4" />}
                >
                  Import
                </Bouton>
              </div>

              {typeMouvement === "incorporation" && (
                <form onSubmit={handleIncorporationSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ChampSaisie
                      label="Collège"
                      type="select"
                      value={formIncorporation.college}
                      onChange={(e) => setFormIncorporation({...formIncorporation, college: e.target.value})}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      {colleges.map(college => (
                        <option key={college} value={college}>{college}</option>
                      ))}
                    </ChampSaisie>

                    <ChampSaisie
                      label="Type de bénéficiaire"
                      type="select"
                      value={formIncorporation.typeBeneficiaire}
                      onChange={(e) => setFormIncorporation({...formIncorporation, typeBeneficiaire: e.target.value as TypeBeneficiaire})}
                      required
                    >
                      <option value="adherent">Adhérent principal</option>
                      <option value="conjoint">Conjoint</option>
                      <option value="enfant">Enfant</option>
                    </ChampSaisie>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ChampSaisie
                      label="Nom"
                      value={formIncorporation.nom}
                      onChange={(e) => setFormIncorporation({...formIncorporation, nom: e.target.value})}
                      required
                    />
                    <ChampSaisie
                      label="Prénom"
                      value={formIncorporation.prenom}
                      onChange={(e) => setFormIncorporation({...formIncorporation, prenom: e.target.value})}
                      required
                    />
                  </div>

                  <ChampSaisie
                    label="Date de naissance"
                    type="date"
                    value={formIncorporation.dateNaissance}
                    onChange={(e) => setFormIncorporation({...formIncorporation, dateNaissance: e.target.value})}
                    required
                  />

                  <ChampSaisie
                    label="Email"
                    type="email"
                    value={formIncorporation.email}
                    onChange={(e) => setFormIncorporation({...formIncorporation, email: e.target.value})}
                    required
                  />

                  <ChampSaisie
                    label="Téléphone"
                    value={formIncorporation.telephone}
                    onChange={(e) => setFormIncorporation({...formIncorporation, telephone: e.target.value})}
                    required
                  />

                  <Bouton type="submit" pleineLargeur>
                    Soumettre l'incorporation
                  </Bouton>
                </form>
              )}

              {typeMouvement === "retrait" && (
                <form onSubmit={handleRetraitSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ChampSaisie
                      label="Nom"
                      value={formRetrait.nom}
                      onChange={(e) => setFormRetrait({...formRetrait, nom: e.target.value})}
                      required
                    />
                    <ChampSaisie
                      label="Prénom"
                      value={formRetrait.prenom}
                      onChange={(e) => setFormRetrait({...formRetrait, prenom: e.target.value})}
                      required
                    />
                  </div>

                  <ChampSaisie
                    label="Motif du retrait"
                    type="select"
                    value={formRetrait.motif}
                    onChange={(e) => setFormRetrait({...formRetrait, motif: e.target.value as MotifRetrait})}
                    required
                  >
                    <option value="fin_contrat">Fin de contrat</option>
                    <option value="deces">Décès</option>
                    <option value="autre">Autre</option>
                  </ChampSaisie>

                  <ChampSaisie
                    label="Date d'effet"
                    type="date"
                    value={formRetrait.dateEffet}
                    onChange={(e) => setFormRetrait({...formRetrait, dateEffet: e.target.value})}
                    required
                  />

                  <ChampSaisie
                    label="Commentaire"
                    type="textarea"
                    value={formRetrait.commentaire}
                    onChange={(e) => setFormRetrait({...formRetrait, commentaire: e.target.value})}
                  />

                  <Bouton type="submit" pleineLargeur variante="destructeur">
                    Soumettre le retrait
                  </Bouton>
                </form>
              )}
              
              {typeMouvement === "import" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Déposez votre fichier Excel ici ou
                    </p>
                    <Bouton 
                      variante="outline"
                      taille="petit"
                      icone={<FileSpreadsheet className="h-4 w-4" />}
                    >
                      Sélectionner un fichier
                    </Bouton>
                  </div>
                  
                  {fichierSelectionne && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-medium">{fichierSelectionne.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(fichierSelectionne.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  )}
                  
                  <Bouton pleineLargeur>
                    Importer le fichier
                  </Bouton>

                  <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900 dark:text-amber-500">Format requis</h4>
                        <p className="text-sm text-amber-800 dark:text-amber-400">
                          Le fichier doit être au format Excel (.xlsx) et contenir les colonnes suivantes : 
                          Type de mouvement, Collège, Type de bénéficiaire, Nom, Prénom, Date de naissance, Email, Téléphone
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Carte>

          <Carte titre="Statistiques">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Effectif total</p>
                  <p className="text-2xl font-bold">315</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Taux de rotation</p>
                  <p className="text-2xl font-bold">4,2%</p>
                </div>
              </div>
              
              <Carte titre="Évolution des effectifs">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={donneesEffectifs}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mois" />
                      <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="effectif" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Carte>
            </div>
          </Carte>
        </div>

        <Carte titre="Historique des mouvements">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Nombre</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Statut</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mouvements.map((mouvement) => (
                  <tr 
                    key={mouvement.id}
                    className="border-b border-border transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-2">
                        {mouvement.type === "incorporation" ? (
                          <UserPlus className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <UserMinus className="h-4 w-4 text-destructive" />
                        )}
                        {mouvement.type === "incorporation" ? "Incorporation" : "Retrait"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {mouvement.date.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {mouvement.nombrePersonnes}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatutBadge(mouvement.statut)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Bouton 
                        variante="outline"
                        taille="petit"
                      >
                        Détails
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