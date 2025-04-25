"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Carte } from "@/components/ui-custom/carte"
import { Bouton } from "@/components/ui-custom/bouton"
import { ChampSaisie } from "@/components/ui-custom/champ-saisie"
import { Badge } from "@/components/ui-custom/badge"
import { User, Mail, Phone, Building, Shield, Key, LogOut, Upload, Camera } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

type Utilisateur = {
  nom: string
  email: string
  telephone: string
  entreprise: string
  poste: string
  dateInscription: Date
  photo?: string
}

const utilisateur: Utilisateur = {
  nom: "Jean Dupont",
  email: "jean.dupont@entreprise.com",
  telephone: "+225 01 23 45 67 89",
  entreprise: "Entreprise SARL",
  poste: "Directeur Administratif",
  dateInscription: new Date(2024, 0, 15)
}

export default function Profil() {
  const router = useRouter()
  const [modeEdition, setModeEdition] = useState(false)
  const [donnees, setDonnees] = useState(utilisateur)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDeconnexion = () => {
    router.push('/connexion')
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setModeEdition(false)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et paramètres
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <Carte>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="relative group cursor-pointer"
                    onClick={handlePhotoClick}
                  >
                    {mounted && photoPreview ? (
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                        <img
                          src={photoPreview}
                          alt="Photo de profil"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    {modeEdition && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                      disabled={!modeEdition}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{donnees.nom}</h2>
                    <p className="text-muted-foreground">{donnees.poste}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {modeEdition ? (
                    <>
                      <Bouton
                        variante="outline"
                        onClick={() => {
                          setModeEdition(false)
                          setDonnees(utilisateur)
                          setPhotoPreview(null)
                        }}
                      >
                        Annuler
                      </Bouton>
                      <Bouton
                        variante="primaire"
                        onClick={handleSave}
                        isLoading={loading}
                      >
                        Enregistrer
                      </Bouton>
                    </>
                  ) : (
                    <>
                      <Bouton
                        variante="outline"
                        onClick={() => setModeEdition(true)}
                      >
                        Modifier
                      </Bouton>
                      <Bouton
                        variante="destructeur"
                        onClick={handleDeconnexion}
                        icone={<LogOut className="h-4 w-4" />}
                      >
                        Déconnexion
                      </Bouton>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <ChampSaisie
                  label="Nom complet"
                  value={donnees.nom}
                  onChange={(e) => setDonnees({ ...donnees, nom: e.target.value })}
                  disabled={!modeEdition}
                  iconeGauche={<User className="h-4 w-4" />}
                />
                
                <ChampSaisie
                  label="Email"
                  type="email"
                  value={donnees.email}
                  onChange={(e) => setDonnees({ ...donnees, email: e.target.value })}
                  disabled={!modeEdition}
                  iconeGauche={<Mail className="h-4 w-4" />}
                />
                
                <ChampSaisie
                  label="Téléphone"
                  value={donnees.telephone}
                  onChange={(e) => setDonnees({ ...donnees, telephone: e.target.value })}
                  disabled={!modeEdition}
                  iconeGauche={<Phone className="h-4 w-4" />}
                />
                
                <ChampSaisie
                  label="Entreprise"
                  value={donnees.entreprise}
                  onChange={(e) => setDonnees({ ...donnees, entreprise: e.target.value })}
                  disabled={!modeEdition}
                  iconeGauche={<Building className="h-4 w-4" />}
                />
                
                <ChampSaisie
                  label="Poste"
                  value={donnees.poste}
                  onChange={(e) => setDonnees({ ...donnees, poste: e.target.value })}
                  disabled={!modeEdition}
                  iconeGauche={<Building className="h-4 w-4" />}
                />
              </div>
            </Carte>

            <Carte titre="Sécurité">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Authentification à deux facteurs</h3>
                      <p className="text-sm text-muted-foreground">
                        Renforcez la sécurité de votre compte
                      </p>
                    </div>
                  </div>
                  <Badge variante="warning">Non activé</Badge>
                </div>

                <Bouton
                  variante="outline"
                  pleineLargeur
                  icone={<Key className="h-4 w-4" />}
                >
                  Changer le mot de passe
                </Bouton>
              </div>
            </Carte>
          </div>

          <div className="space-y-4">
            <Carte titre="Informations du compte">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Membre depuis</span>
                  <span className="font-medium">
                    {donnees.dateInscription.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground">Dernière connexion</span>
                  <span className="font-medium">Aujourd'hui, 10:30</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Statut du compte</span>
                  <Badge variante="success">Actif</Badge>
                </div>
              </div>
            </Carte>

            <Carte titre="Préférences">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications par email</span>
                  <Badge variante="outline">Activé</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications SMS</span>
                  <Badge variante="outline">Désactivé</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Newsletter mensuelle</span>
                  <Badge variante="outline">Activé</Badge>
                </div>
              </div>
            </Carte>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}