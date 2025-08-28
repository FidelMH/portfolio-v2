# Portfolio - Fidel Moussahaziri

Portfolio moderne d'un développeur en Intelligence Artificielle avec backend API et base de données.

## 🚀 Technologies

### Frontend
- **Next.js 15** - Framework React avec App Router
- **Framer Motion** - Animations fluides
- **Tailwind CSS** - Styling moderne
- **Lucide React** - Icônes

### Backend
- **FastAPI** - API REST moderne
- **Supabase** - Base de données PostgreSQL
- **Python 3.11+** - Langage backend
- **Uvicorn** - Serveur ASGI

## 📁 Structure du projet

```
portfolio/
├── frontend/          # Application Next.js
│   ├── app/
│   │   ├── ui/components/  # Composants React
│   │   └── api/           # Routes API proxy
│   └── public/           # Assets statiques
├── backend/             # API FastAPI
│   ├── main.py          # Point d'entrée
│   └── requirements.txt # Dépendances Python
└── README.md
```

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+
- Python 3.11+
- Compte Supabase

### Configuration

1. **Cloner le projet**
```bash
git clone <repo-url>
cd portfolio
```

2. **Backend Setup**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configurer les variables Supabase dans .env
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
# Configurer l'URL du backend
```

### Développement

1. **Démarrer le backend**
```bash
cd backend
python main.py
# API disponible sur http://localhost:8000
```

2. **Démarrer le frontend**
```bash
cd frontend
npm run dev
# Application disponible sur http://localhost:3000
```

## 🌐 Déploiement

### Backend (Render)
1. Connecter le repo GitHub
2. Utiliser `render.yaml` pour la configuration
3. Ajouter les variables d'environnement Supabase

### Frontend (Vercel)
1. Connecter le repo GitHub
2. Dossier racine : `frontend/`
3. Variable : `NEXT_PUBLIC_API_URL=https://votre-backend.onrender.com`

## 📝 API Endpoints

- `GET /api/projects` - Liste des projets
- `GET /api/projects?featured=true` - Projets mis en avant
- `GET /api/projects?category=web` - Filtrer par catégorie
- `GET /api/technologies` - Liste des technologies

## ✨ Fonctionnalités

- ✅ Portfolio responsive avec animations
- ✅ Gestion dynamique des projets via API
- ✅ Filtres par catégorie et statut
- ✅ Système de fallback avec données mock
- ✅ Optimisations de performance
- ✅ Déploiement sur Vercel/Render

## 👨‍💻 Auteur

**Fidel Moussahaziri**
- Email: moussahaziri.fidel@gmail.com
- Formation: Développeur en Intelligence Artificielle (Simplon)

## 📄 Licence

Ce projet est sous licence MIT.
