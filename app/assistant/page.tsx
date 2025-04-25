"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { Send, Bot, Sparkles, HelpCircle, FileText, BarChart2 } from "lucide-react"
import { useState } from "react"

type Message = {
  id: string
  contenu: string
  type: "utilisateur" | "assistant"
  date: Date
}

const suggestions = [
  {
    titre: "Analyser mes consommations",
    description: "Obtenez une analyse détaillée de vos consommations",
    icone: <BarChart2 className="h-5 w-5" />
  },
  {
    titre: "Comprendre mon contrat",
    description: "Explications sur les garanties et conditions",
    icone: <FileText className="h-5 w-5" />
  },
  {
    titre: "Aide générale",
    description: "Questions fréquentes et assistance",
    icone: <HelpCircle className="h-5 w-5" />
  }
]

const messages: Message[] = [
  {
    id: "1",
    contenu: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
    type: "assistant",
    date: new Date()
  }
]

export default function Assistant() {
  const [message, setMessage] = useState("")
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Assistant IA</h1>
          <p className="text-muted-foreground">
            Votre assistant personnel pour toutes vos questions
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[300px,1fr]">
          <div className="space-y-4">
            <Carte>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-medium">Assistant IA</h2>
                    <p className="text-sm text-muted-foreground">Toujours là pour vous aider</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {suggestion.icone}
                      </div>
                      <div>
                        <h3 className="font-medium">{suggestion.titre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Carte>
            
            <Carte>
              <div className="space-y-3">
                <h3 className="font-medium">Fonctionnalités</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm">Analyse intelligente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">Génération de rapports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Assistance 24/7</span>
                  </div>
                </div>
              </div>
            </Carte>
          </div>

          <Carte>
            <div className="flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.type === "assistant"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p>{msg.contenu}</p>
                      <span
                        className={`text-xs ${
                          msg.type === "assistant"
                            ? "text-muted-foreground"
                            : "opacity-70"
                        }`}
                      >
                        {msg.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <ChampSaisie
                    placeholder="Posez votre question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Bouton
                    variante="primaire"
                    icone={<Send className="h-4 w-4" />}
                  />
                </div>
              </div>
            </div>
          </Carte>
        </div>
      </div>
    </DashboardLayout>
  )
}