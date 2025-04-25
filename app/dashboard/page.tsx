import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { CarteDonnees } from "@/components/dashboard/carte-donnees"
import { TableauConsommations } from "@/components/dashboard/tableau-consommations"
import { GraphiqueTendance } from "@/components/dashboard/graphique-tendance"
import { GraphiqueRepartition } from "@/components/dashboard/graphique-repartition"
import { Bouton } from "@/components/ui-custom/bouton"
import { BarChart2, Users, FileText, BarChart } from "lucide-react"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre situation d'assurance santé
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CarteDonnees
            titre="Primes payées"
            valeur="78 650 000 FCFA"
            comparaison="+8% vs 2024"
            tendancePositive
            icone="receipt"
          />
          
          <CarteDonnees
            titre="Sinistres"
            valeur="63 875 000 FCFA"
            comparaison="+12% vs 2024"
            tendancePositive={false}
            icone="file-text"
          />
          
          <CarteDonnees
            titre="Nombre d'assurés"
            valeur="285"
            comparaison="+15 personnes"
            tendancePositive
            icone="users"
          />
          
          <CarteDonnees
            titre="Ratio S/P"
            valeur="81,25%"
            comparaison="+4% vs objectif"
            tendancePositive={false}
            icone="bar-chart-2"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Carte>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Demandes émises</h3>
                </div>
                <span className="text-2xl font-bold">2</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">En cours de saisie</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">En cours de traitement</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validées</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rejetées</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </Carte>

          <Carte>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
                    <Users className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Groupes enregistrés</h3>
                </div>
                <span className="text-2xl font-bold">2</span>
              </div>
              <div className="space-y-2">
                <Bouton variante="outline" pleineLargeur>
                  Atlantique Financial Group 100% ME
                </Bouton>
                <Bouton variante="outline" pleineLargeur>
                  Atlantique Financial Group 80% ME
                </Bouton>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre d'adhérents</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre de conjoints</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre d'enfants</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </Carte>

          <Carte>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <BarChart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold">États statistiques</h3>
                </div>
              </div>
              <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Graphique à venir</p>
              </div>
            </div>
          </Carte>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Carte titre="Évolution des primes et sinistres">
            <GraphiqueTendance />
          </Carte>
          
          <Carte titre="Répartition des consommations">
            <GraphiqueRepartition />
          </Carte>
        </div>
        
        <Carte titre="Dernières consommations">
          <TableauConsommations />
        </Carte>
      </div>
    </DashboardLayout>
  )
}