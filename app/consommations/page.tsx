"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subDays } from "date-fns"
import {fr }from "date-fns/locale/fr"
import { AlertCircle, ArrowUpDown, CalendarIcon, Download, FileSpreadsheet, FileText } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { formatMontant, formatDate } from "@/lib/formatters"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { exportToExcel, exportToPDF } from "@/lib/export-utils"

type Consommation = {
  id: string
  beneficiaire: string
  acte: string
  montant: number
  date: Date
  anomalie?: {
    type: "surconsommation" | "frequence" | "montant"
    message: string
    severite: "warning" | "error"
  }
}

// Données hebdomadaires simulées
const donneesHebdo = eachDayOfInterval({
  start: subDays(new Date(), 6),
  end: new Date()
}).map(date => ({
  date: format(date, "EEE", { locale: fr }),
  consultations: Math.floor(Math.random() * 500000) + 100000,
  medicaments: Math.floor(Math.random() * 300000) + 50000,
  hospitalisations: Math.floor(Math.random() * 1000000) + 200000
}))

// Données mensuelles simulées
const donneesMensuelles = [
  { mois: "Jan", montant: 15000000 },
  { mois: "Fév", montant: 18000000 },
  { mois: "Mar", montant: 22000000 },
  { mois: "Avr", montant: 20000000 },
  { mois: "Mai", montant: 25000000 },
  { mois: "Juin", montant: 23000000 },
  { mois: "Juil", montant: 28000000 },
  { mois: "Août", montant: 26000000 },
  { mois: "Sep", montant: 30000000 },
  { mois: "Oct", montant: 32000000 },
  { mois: "Nov", montant: 35000000 },
  { mois: "Déc", montant: 38000000 }
]

const consommations: Consommation[] = [
  {
    id: "1",
    beneficiaire: "Martin Sophie",
    acte: "Consultation spécialiste",
    montant: 50000,
    date: new Date(2025, 3, 15),
    anomalie: {
      type: "frequence",
      message: "Fréquence inhabituelle de consultations",
      severite: "warning"
    }
  },
  {
    id: "2",
    beneficiaire: "Dubois Thomas",
    acte: "Médicaments",
    montant: 150000,
    date: new Date(2025, 3, 14),
    anomalie: {
      type: "montant",
      message: "Montant anormalement élevé",
      severite: "error"
    }
  }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-lg shadow">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm">
            {entry.name}: {formatMontant(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ConsommationsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [periodeActive, setPeriodeActive] = useState<"journalier" | "hebdomadaire" | "mensuel">("journalier")

  const handleDownload = (format: "excel" | "pdf") => {
    // Préparer les données pour l'export
    const dataToExport = consommations.map(c => ({
      Bénéficiaire: c.beneficiaire,
      Acte: c.acte,
      "Montant": formatMontant(c.montant),
      "Date": formatDate(c.date),
      "Statut": c.anomalie ? "Anomalie" : "Normal"
    }));

    const filename = `consommations_${formatDate(new Date()).replace(/\//g, '-')}`;

    if (format === "excel") {
      exportToExcel(dataToExport, filename);
    } else {
      const columns = ["Bénéficiaire", "Acte", "Montant", "Date", "Statut"];
      exportToPDF(
        dataToExport,
        columns,
        "Rapport des Consommations Médicales",
        filename
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Suivi des Consommations</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownload("excel")}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Format Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                <FileText className="h-4 w-4 mr-2" />
                Format PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-4 mb-6">
          {consommations.filter(c => c.anomalie).map((consommation) => (
            <Alert
              key={consommation.id}
              variant={consommation.anomalie?.severite === "error" ? "destructive" : "default"}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Anomalie détectée - {consommation.beneficiaire}</AlertTitle>
              <AlertDescription className="mt-2">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-medium">Acte :</span> {consommation.acte}
                  </div>
                  <div>
                    <span className="font-medium">Montant :</span> {formatMontant(consommation.montant)}
                  </div>
                  <div>
                    <span className="font-medium">Problème :</span> {consommation.anomalie?.message}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
        
        <Tabs 
          defaultValue="journalier" 
          className="w-full"
          onValueChange={(value) => setPeriodeActive(value as "journalier" | "hebdomadaire" | "mensuel")}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="journalier">Journalier</TabsTrigger>
            <TabsTrigger value="hebdomadaire">Hebdomadaire</TabsTrigger>
            <TabsTrigger value="mensuel">Mensuel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journalier">
            <div className="grid gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consommations du jour</CardTitle>
                  <CardDescription>
                    {format(date, "d MMMM yyyy", { locale: fr })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Bénéficiaire</th>
                          <th className="text-left p-3">Acte</th>
                          <th className="text-right p-3">
                            <div className="flex items-center justify-end gap-1">
                              Montant
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </th>
                          <th className="text-center p-3">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consommations.map((conso) => (
                          <tr key={conso.id} className="border-b">
                            <td className="p-3">{conso.beneficiaire}</td>
                            <td className="p-3">{conso.acte}</td>
                            <td className="p-3 text-right">{formatMontant(conso.montant)}</td>
                            <td className="p-3 text-center">
                              {conso.anomalie && (
                                <Badge
                                  variant={conso.anomalie.severite === "error" ? "destructive" : "default"}
                                >
                                  Anomalie
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="hebdomadaire">
            <Card>
              <CardHeader>
                <CardTitle>Consommations Hebdomadaires</CardTitle>
                <CardDescription>
                  Vue d'ensemble de la semaine du {format(startOfWeek(date, { locale: fr }), "d MMMM", { locale: fr })} au {format(endOfWeek(date, { locale: fr }), "d MMMM yyyy", { locale: fr })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donneesHebdo}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        name="Consultations" 
                        dataKey="consultations" 
                        fill="hsl(var(--chart-1))" 
                      />
                      <Bar 
                        name="Médicaments" 
                        dataKey="medicaments" 
                        fill="hsl(var(--chart-2))" 
                      />
                      <Bar 
                        name="Hospitalisations" 
                        dataKey="hospitalisations" 
                        fill="hsl(var(--chart-3))" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatMontant(3500000)}</p>
                      <p className="text-sm text-muted-foreground">+12% vs semaine précédente</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Médicaments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatMontant(2100000)}</p>
                      <p className="text-sm text-muted-foreground">-5% vs semaine précédente</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Hospitalisations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatMontant(7000000)}</p>
                      <p className="text-sm text-muted-foreground">+8% vs semaine précédente</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mensuel">
            <Card>
              <CardHeader>
                <CardTitle>Consommations Mensuelles</CardTitle>
                <CardDescription>
                  Évolution des consommations sur l'année 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={donneesMensuelles}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mois" />
                      <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="montant" 
                        name="Montant total"
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Année</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatMontant(312000000)}</p>
                      <p className="text-sm text-muted-foreground">+15% vs année précédente</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Moyenne Mensuelle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatMontant(26000000)}</p>
                      <p className="text-sm text-muted-foreground">Basé sur 12 mois</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pic Mensuel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatMontant(38000000)}</p>
                      <p className="text-sm text-muted-foreground">Décembre 2025</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}