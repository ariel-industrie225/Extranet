"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Bouton } from "@/components/ui-custom/bouton"
import { Carte } from "@/components/ui-custom/carte"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"

type FormulaireConnexion = {
  email: string
  motDePasse: string
}

export default function Connexion() {
  const router = useRouter()
  const [formulaire, setFormulaire] = useState<FormulaireConnexion>({ 
    email: "", 
    motDePasse: "" 
  })
  const [erreurs, setErreurs] = useState<Partial<FormulaireConnexion>>({})
  const [voirMotDePasse, setVoirMotDePasse] = useState(false)
  const [chargement, setChargement] = useState(false)

  const gererChangement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormulaire(prev => ({ ...prev, [name]: value }))
    
    // Réinitialiser les erreurs lors de la saisie
    if (erreurs[name as keyof FormulaireConnexion]) {
      setErreurs(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const valider = (): boolean => {
    const nouvellesErreurs: Partial<FormulaireConnexion> = {}
    
    if (!formulaire.email) {
      nouvellesErreurs.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formulaire.email)) {
      nouvellesErreurs.email = "Format d'email invalide"
    }
    
    if (!formulaire.motDePasse) {
      nouvellesErreurs.motDePasse = "Le mot de passe est requis"
    }
    
    setErreurs(nouvellesErreurs)
    return Object.keys(nouvellesErreurs).length === 0
  }

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!valider()) {
      return
    }
    
    setChargement(true)
    
    try {
      // Simulation d'authentification avec délai
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Dans une application réelle, vous enverriez ces informations à une API
      console.log("Tentative de connexion avec:", formulaire)
      
      // Redirection vers le tableau de bord après connexion réussie
      router.push("/dashboard")
    } catch (err) {
      console.error("Erreur de connexion:", err)
      // Gérer les erreurs d'authentification
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="absolute right-4 top-4">
        <ThemeSwitcher />
      </div>
      
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-xl font-bold text-primary-foreground">
          AS
        </div>
        <h1 className="text-2xl font-bold">Extranet</h1>
      </div>
      
      <Carte className="w-full max-w-md animate-in fade-in-50 zoom-in-95 duration-500">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Bienvenue</h2>
            <p className="text-sm text-muted-foreground">
              Connectez-vous pour accéder à votre espace souscripteur
            </p>
          </div>
          
          <form onSubmit={gererSoumission} className="space-y-4">
            <ChampSaisie
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="exemple@entreprise.com"
              iconeGauche={<Mail className="h-4 w-4" />}
              value={formulaire.email}
              onChange={gererChangement}
              erreur={erreurs.email}
              autoComplete="email"
            />
            
            <div className="space-y-1">
              <ChampSaisie
                label="Mot de passe"
                type={voirMotDePasse ? "text" : "password"}
                id="motDePasse"
                name="motDePasse"
                placeholder="••••••••"
                iconeGauche={<Lock className="h-4 w-4" />}
                iconeDroite={
                  <button 
                    type="button" 
                    onClick={() => setVoirMotDePasse(!voirMotDePasse)}
                    className="focus:outline-none"
                    tabIndex={-1}
                  >
                    {voirMotDePasse ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                value={formulaire.motDePasse}
                onChange={gererChangement}
                erreur={erreurs.motDePasse}
                autoComplete="current-password"
              />
              
              <div className="flex justify-end">
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-xs text-primary hover:underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </div>
            
            <Bouton
              type="submit"
              pleineLargeur
              isLoading={chargement}
              className="mt-6"
            >
              Se connecter
            </Bouton>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Besoin d'assistance?{" "}
            </span>
            <Link href="/contact" className="text-primary hover:underline">
              Contactez-nous
            </Link>
          </div>
        </div>
      </Carte>
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Assurance Santé. Tous droits réservés.
      </p>
    </div>
  )
}