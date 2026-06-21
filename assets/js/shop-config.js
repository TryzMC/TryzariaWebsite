/* =========================================================
   TRYZARIA — Configuration boutique (valeurs PUBLIQUES)
   ---------------------------------------------------------
   ⚠️ Ces 3 valeurs sont PUBLIQUES par nature (elles vivent dans le
   navigateur de chaque visiteur). C'est SÛR :
     • SUPABASE_ANON_KEY est conçue pour être publique — protégée par RLS,
       elle ne peut QUE lire le catalogue (produits actifs), rien d'autre.
     • BACKEND_URL est juste l'adresse de l'API.
   Ne JAMAIS mettre ici : service_role, clé plugin, secrets Stripe/PayPal.

   TA PART : remplace les 3 valeurs ci-dessous par les tiennes
   (depuis ton .env : SUPABASE_URL, SUPABASE_ANON_KEY, BACKEND_URL).
   ========================================================= */
window.TRYZARIA_SHOP = {
  SUPABASE_URL: "https://mzhpslvwrqxxriousarl.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_lwX7--Toe6l13tesmdiFuw_MhxmnP6t",
  BACKEND_URL: "https://tryzaria-boutique.vercel.app",
};
