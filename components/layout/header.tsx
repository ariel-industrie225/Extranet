"use client"

import { useState } from "react"
import { UserCircle, Menu, X, Bell, Search } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDate } from "@/lib/formatters"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui-custom/badge"

type Notification = {
  id: string
  titre: string
  message: string
  date: Date
  lue: boolean
  type: "info" | "success" | "warning" | "error"
}

type SearchResult = {
  id: string
  titre: string
  type: "consommation" | "prime" | "rapport" | "paiement" | "messagerie" | "assistant" | "historique" | "vue_generale"
  url: string
  description: string
}

const notifications: Notification[] = [
  {
    id: "1",
    titre: "Paiement reçu",
    message: "Votre paiement de prime a été validé",
    date: new Date(2025, 3, 15),
    lue: false,
    type: "success"
  },
  {
    id: "2",
    titre: "Rappel échéance",
    message: "Une échéance de paiement approche",
    date: new Date(2025, 3, 14),
    lue: false,
    type: "warning"
  },
  {
    id: "3",
    titre: "Nouveau document",
    message: "Un nouveau document est disponible",
    date: new Date(2025, 3, 13),
    lue: false,
    type: "info"
  }
]

const donnéesRecherche: SearchResult[] = [
  {
    id: "1",
    titre: "Consommations Mars 2025",
    type: "consommation",
    url: "/consommations",
    description: "Détails des consommations médicales pour Mars 2025"
  },
  {
    id: "2",
    titre: "Prime T1 2025",
    type: "prime",
    url: "/primes",
    description: "Gestion des primes du premier trimestre 2025"
  },
  {
    id: "3",
    titre: "Rapport S/P 2025",
    type: "rapport",
    url: "/rapports",
    description: "Rapport Sinistres/Primes détaillé"
  },
  {
    id: "4",
    titre: "Paiement en attente",
    type: "paiement",
    url: "/paiement",
    description: "Effectuer un nouveau paiement"
  },
  {
    id: "5",
    titre: "Messages non lus",
    type: "messagerie",
    url: "/messagerie",
    description: "Accéder à votre messagerie sécurisée"
  },
  {
    id: "6",
    titre: "Assistant IA",
    type: "assistant",
    url: "/assistant",
    description: "Poser une question à l'assistant virtuel"
  },
  {
    id: "7",
    titre: "Historique des opérations",
    type: "historique",
    url: "/primes/historique",
    description: "Consulter l'historique complet des opérations"
  },
  {
    id: "8",
    titre: "Vue générale",
    type: "vue_generale",
    url: "/dashboard",
    description: "Tableau de bord et vue d'ensemble"
  }
]

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationsListe, setNotificationsListe] = useState(notifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const notificationsNonLues = notificationsListe.filter(n => !n.lue).length

  const marquerCommeLue = (id: string) => {
    setNotificationsListe(prev =>
      prev.map(n => n.id === id ? { ...n, lue: true } : n)
    )
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Recherche améliorée avec correspondance sur titre, type et description
    const results = donnéesRecherche.filter(item =>
      item.titre.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
    setShowSearchResults(true)
  }

  const handleSearchResultClick = (url: string) => {
    setShowSearchResults(false)
    setSearchQuery("")
    router.push(url)
  }

  const getTypeLabel = (type: SearchResult["type"]) => {
    const labels = {
      consommation: "Consommations",
      prime: "Primes",
      rapport: "Rapports",
      paiement: "Paiements",
      messagerie: "Messagerie",
      assistant: "Assistant IA",
      historique: "Historique",
      vue_generale: "Vue générale"
    }
    return labels[type] || type
  }

  const getNotificationStyle = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
      case "warning":
        return "border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20"
      case "error":
        return "border-l-4 border-destructive bg-destructive/10"
      default:
        return "border-l-4 border-primary bg-primary/5"
    }
  }

  return (
    <header className="fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4 md:pl-[250px]">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="search" 
            placeholder="Rechercher" 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
            className="h-9 w-[300px] rounded-md border border-input bg-background pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary lg:w-[400px]"
          />
          
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full bg-background border border-border rounded-md shadow-lg">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleSearchResultClick(result.url)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{result.titre}</span>
                    <Badge className="ml-2" variant="secondary">
                      {getTypeLabel(result.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="relative rounded-full p-2 text-muted-foreground hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notificationsNonLues > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  {notificationsNonLues}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Vous avez {notificationsNonLues} notification{notificationsNonLues > 1 ? 's' : ''} non lue{notificationsNonLues > 1 ? 's' : ''}
              </p>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notificationsListe.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notif.lue ? 'bg-muted/20' : ''
                  } ${getNotificationStyle(notif.type)}`}
                  onClick={() => marquerCommeLue(notif.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{notif.titre}</h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(notif.date)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <ThemeSwitcher />
        
        <Link 
          href="/profil" 
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-muted-foreground hover:bg-muted md:pr-3"
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted">
            <UserCircle className="h-7 w-7" />
          </div>
          <span className="hidden text-sm font-medium md:inline-block">Mon Profil</span>
        </Link>
      </div>
    </header>
  )
}