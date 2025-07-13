-- Ajout de la table pour les messages de contact
-- À exécuter dans Supabase SQL Editor

CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS pour la table contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (formulaire de contact)
CREATE POLICY "Allow public insert" ON contact_messages
FOR INSERT WITH CHECK (true);

-- Politique pour lecture admin seulement (pour plus tard)
-- CREATE POLICY "Allow admin read" ON contact_messages
-- FOR SELECT USING (auth.role() = 'authenticated');