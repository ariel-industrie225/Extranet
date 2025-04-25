"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { Send, Paperclip, Search, MoreVertical, X } from "lucide-react"
import { useState, useRef } from "react"

type Message = {
  id: string
  expediteur: string
  contenu: string
  date: Date
  lu: boolean
  fichiers?: { nom: string; url: string; type: string }[]
}

const messages: Message[] = [
  {
    id: "1",
    expediteur: "Support Technique",
    contenu: "Bonjour, votre demande a bien été prise en compte...",
    date: new Date(2025, 3, 15, 14, 30),
    lu: true
  },
  {
    id: "2",
    expediteur: "Service Commercial",
    contenu: "Concernant votre demande de devis...",
    date: new Date(2025, 3, 15, 10, 15),
    lu: false
  }
]

export default function Messagerie() {
  const [message, setMessage] = useState("")
  const [recherche, setRecherche] = useState("")
  const [fichiers, setFichiers] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFichiers = Array.from(e.target.files)
      setFichiers(prev => [...prev, ...newFichiers])
    }
  }

  const handleSendMessage = () => {
    // Ici vous ajouteriez la logique pour envoyer le message et les fichiers
    console.log("Message:", message)
    console.log("Fichiers:", fichiers)
    
    // Réinitialiser après envoi
    setMessage("")
    setFichiers([])
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Messagerie Sécurisée</h1>
          <p className="text-muted-foreground">
            Communiquez de manière sécurisée avec nos services
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[300px,1fr]">
          <div className="space-y-4">
            <ChampSaisie
              placeholder="Rechercher..."
              iconeGauche={<Search className="h-4 w-4" />}
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
            
            <Carte>
              <div className="space-y-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      msg.lu ? "hover:bg-muted/50" : "bg-primary/5 hover:bg-primary/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{msg.expediteur}</h3>
                      <span className="text-xs text-muted-foreground">
                        {msg.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {msg.contenu}
                    </p>
                    {!msg.lu && (
                      <Badge variante="default" className="mt-2">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Carte>
          </div>

          <Carte>
            <div className="flex flex-col h-[600px]">
              <div className="flex items-center justify-between border-b border-border p-4">
                <div>
                  <h2 className="font-medium">Support Technique</h2>
                  <p className="text-sm text-muted-foreground">En ligne</p>
                </div>
                <Bouton
                  variante="outline"
                  taille="petit"
                  icone={<MoreVertical className="h-4 w-4" />}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                    <p>Bonjour, j'ai une question concernant ma prime du mois d'avril.</p>
                    <span className="text-xs opacity-70">14:30</span>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <p>Bonjour, je vous écoute. En quoi puis-je vous aider ?</p>
                    <span className="text-xs text-muted-foreground">14:32</span>
                  </div>
                </div>
              </div>
              
              {fichiers.length > 0 && (
                <div className="border-t border-border p-2">
                  <div className="flex flex-wrap gap-2">
                    {fichiers.map((fichier, index) => (
                      <div key={index} className="flex items-center gap-2 bg-muted rounded-md p-2">
                        <span className="text-sm truncate max-w-[200px]">{fichier.name}</span>
                        <button
                          onClick={() => setFichiers(prev => prev.filter((_, i) => i !== index))}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                  />
                  <Bouton
                    variante="outline"
                    icone={<Paperclip className="h-4 w-4" />}
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <ChampSaisie
                    placeholder="Écrivez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Bouton
                    variante="primaire"
                    icone={<Send className="h-4 w-4" />}
                    onClick={handleSendMessage}
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