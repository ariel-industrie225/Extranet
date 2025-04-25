/**
 * Formate une date en format français
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

/**
 * Formate un montant en Francs CFA
 */
export function formatMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(montant);
}

/**
 * Formate un pourcentage
 */
export function formatPourcentage(valeur: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(valeur / 100);
}

/**
 * Formate un nombre entier
 */
export function formatNombre(valeur: number): string {
  return new Intl.NumberFormat('fr-FR').format(valeur);
}