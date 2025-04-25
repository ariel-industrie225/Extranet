"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Bouton } from "@/components/ui-custom/bouton"
import { formatMontant } from "@/lib/formatters"

type DonneesTendance = {
  mois: string
  primes: number
  sinistres: number
}

const donnees2025: DonneesTendance[] = [
  { mois: "Jan", primes: 25000000, sinistres: 18000000 },
  { mois: "Fév", primes: 28000000, sinistres: 22000000 },
  { mois: "Mar", primes: 32000000, sinistres: 25500000 },
  { mois: "Avr", primes: 35000000, sinistres: 32000000 },
]

const donnees2024: DonneesTendance[] = [
  { mois: "Jan", primes: 22000000, sinistres: 15000000 },
  { mois: "Fév", primes: 24000000, sinistres: 18000000 },
  { mois: "Mar", primes: 27000000, sinistres: 22000000 },
  { mois: "Avr", primes: 30000000, sinistres: 27000000 },
  { mois: "Mai", primes: 32000000, sinistres: 29000000 },
  { mois: "Juin", primes: 35000000, sinistres: 30000000 },
  { mois: "Juil", primes: 33000000, sinistres: 31000000 },
  { mois: "Août", primes: 28000000, sinistres: 27000000 },
  { mois: "Sep", primes: 30000000, sinistres: 28000000 },
  { mois: "Oct", primes: 34000000, sinistres: 30000000 },
  { mois: "Nov", primes: 38000000, sinistres: 32000000 },
  { mois: "Déc", primes: 42000000, sinistres: 35000000 },
]

type PeriodeType = "2025" | "2024" | "2ans"

export function GraphiqueTendance() {
  const [periode, setPeriode] = useState<PeriodeType>("2025")
  
  const donneesGraphique = 
    periode === "2025" ? donnees2025 : 
    periode === "2024" ? donnees2024 : 
    [...donnees2024, ...donnees2025.map(d => ({ ...d, mois: `${d.mois} 25` }))]
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Bouton 
          variante={periode === "2025" ? "primaire" : "outline"}
          taille="petit"
          onClick={() => setPeriode("2025")}
        >
          2025
        </Bouton>
        <Bouton 
          variante={periode === "2024" ? "primaire" : "outline"}
          taille="petit"
          onClick={() => setPeriode("2024")}
        >
          2024
        </Bouton>
        <Bouton 
          variante={periode === "2ans" ? "primaire" : "outline"}
          taille="petit"
          onClick={() => setPeriode("2ans")}
        >
          Les deux années
        </Bouton>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={donneesGraphique}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="mois" 
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000000)}M`}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <Tooltip 
              formatter={(value) => [formatMontant(Number(value)), ""]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{ 
                borderRadius: "0.5rem",
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              itemStyle={{ color: "var(--foreground)" }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="primes" 
              name="Primes" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="sinistres" 
              name="Sinistres" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}