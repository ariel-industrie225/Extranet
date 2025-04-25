"use client"

import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"
import { formatMontant } from "@/lib/formatters"

type DonneesRepartition = {
  nom: string
  valeur: number
  couleur: string
}

const donnees: DonneesRepartition[] = [
  { nom: "Hospitalisation", valeur: 35000, couleur: "hsl(var(--chart-1))" },
  { nom: "Consultations", valeur: 18000, couleur: "hsl(var(--chart-2))" },
  { nom: "Médicaments", valeur: 15000, couleur: "hsl(var(--chart-3))" },
  { nom: "Dentaire", valeur: 12000, couleur: "hsl(var(--chart-4))" },
  { nom: "Optique", valeur: 9000, couleur: "hsl(var(--chart-5))" },
  { nom: "Autres", valeur: 8500, couleur: "hsl(var(--muted))" }
]

export function GraphiqueRepartition() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={donnees}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={2}
            dataKey="valeur"
            nameKey="nom"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {donnees.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.couleur} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [formatMontant(Number(value)), ""]}
            contentStyle={{ 
              borderRadius: "0.5rem",
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
            itemStyle={{ color: "var(--foreground)" }}
          />
          <Legend 
            verticalAlign="bottom" 
            layout="horizontal"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}