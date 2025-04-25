"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Receipt, 
  Users, 
  FileText, 
  CreditCard, 
  BarChart2, 
  MessageSquare, 
  Bot,
  ChevronDown,
  X
} from "lucide-react"

type MenuItem = {
  icon: React.ReactNode
  label: string
  href: string
  submenu?: { label: string; href: string }[]
}

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const menuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Tableau de bord",
      href: "/dashboard"
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      label: "Primes",
      href: "/primes",
      submenu: [
        { label: "Vue générale", href: "/primes" },
        { label: "Paiements", href: "/primes/paiements" },
        { label: "Historique", href: "/primes/historique" }
      ]
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Consommations",
      href: "/consommations"
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Mouvements",
      href: "/mouvements"
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Paiement",
      href: "/paiement"
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Rapports",
      href: "/rapports"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messagerie",
      href: "/messagerie"
    },
    {
      icon: <Bot className="h-5 w-5" />,
      label: "Assistant IA",
      href: "/assistant"
    }
  ]

  const toggleSubmenu = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    )
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[250px] flex-col border-r border-border bg-card pt-4 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pb-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-lg font-bold">AS</span>
            </div>
            <span className="text-xl font-bold">Extranet</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)} 
            className="rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.submenu ? (
                  <div className="mb-1">
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        expandedItems.includes(item.label)
                          ? "bg-muted text-primary"
                          : "text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedItems.includes(item.label) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    {expandedItems.includes(item.label) && (
                      <ul className="mt-1 space-y-1 pl-10">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.label}>
                            <Link
                              href={subitem.href}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                isActive(subitem.href)
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-muted-foreground hover:bg-muted/50"
                              }`}
                            >
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t border-border p-4">
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              Besoin d'aide? Contactez notre support au 0123456789 ou par email à support@extranet.fr
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}