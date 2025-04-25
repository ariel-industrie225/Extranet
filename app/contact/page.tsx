"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Contactez-nous</h1>
        </div>
        
        <Card className="p-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nom
              </label>
              <Input
                id="name"
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Sujet
              </label>
              <Input
                id="subject"
                placeholder="Quel est le sujet de votre message ?"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Écrivez votre message ici..."
                className="min-h-[150px]"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Envoyer le message
            </Button>
          </form>
        </Card>

        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Autres moyens de nous contacter</h2>
          </div>
          <div className="text-muted-foreground">
            <p>Notre équipe support est disponible du lundi au vendredi, de 9h à 17h.</p>
            <p className="mt-2">Email : support@exemple.com</p>
            <p>Téléphone : (+225) 01 23 45 67 89</p>
          </div>
        </div>
      </div>
    </div>
  );
}