import Link from 'next/link';
import { Bouton } from '@/components/ui-custom/bouton';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4 text-center">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-4xl font-bold text-primary-foreground">
            AS
          </div>
        </div>
        
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Extranet Assurance Santé
        </h1>
        
        <p className="mb-8 max-w-lg text-muted-foreground">
          Bienvenue sur la plateforme dédiée aux grands souscripteurs d'assurance santé. 
          Accédez à vos informations, suivez vos consommations et gérez vos contrats.
        </p>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/connexion">
            <Bouton 
              variante="primaire" 
              taille="large" 
              icone={<ArrowRight size={16} />} 
              iconePosition="droite"
            >
              Connexion
            </Bouton>
          </Link>
          
          <Link href="/contact">
            <Bouton variante="outline" taille="large">
              Nous contacter
            </Bouton>
          </Link>
        </div>
      </div>
      
      <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out">
        <p className="text-sm text-muted-foreground">
          © 2025 Assurance Santé. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}