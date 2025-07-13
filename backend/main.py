from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import uvicorn
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Charger les variables d'environnement
load_dotenv()

# Configuration Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Les variables SUPABASE_URL et SUPABASE_ANON_KEY doivent être définies")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(
    title="Portfolio API - Fidel Moussahaziri",
    description="API pour le portfolio de Fidel Moussahaziri, développeur en IA",
    version="1.0.1"
)

# Configuration CORS - Permissive pour le développement
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autoriser toutes les origines en développement
    allow_credentials=False,  # Désactivé car allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles Pydantic
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class Technology(BaseModel):
    id: int
    name: str
    color: Optional[str] = None
    category: Optional[str] = None

class ProjectBase(BaseModel):
    title: str
    description: str
    long_description: Optional[str] = None
    status: str = "completed"
    featured: bool = False
    category: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    image_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    technology_ids: List[int] = []

class Project(ProjectBase):
    id: int
    technologies: List[Technology] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Routes API
@app.get("/")
async def root():
    return {"message": "Portfolio API - Fidel Moussahaziri", "version": "2.0.0"}

# Routes pour les projets
@app.get("/api/projects", response_model=List[Project])
async def get_projects(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    status: Optional[str] = None
):
    """Récupère les projets avec leurs technologies"""
    try:
        # Construction de la requête
        query = supabase.table("projects").select("""
            *,
            project_technologies(
                technologies(*)
            )
        """)
        
        # Filtres optionnels
        if category:
            query = query.eq("category", category)
        if featured is not None:
            query = query.eq("featured", featured)
        if status:
            query = query.eq("status", status)
        
        # Ordre par featured puis par date de création
        query = query.order("featured", desc=True).order("created_at", desc=True)
        
        result = query.execute()
        
        # Transformation des données pour correspondre au modèle Pydantic
        projects = []
        for project_data in result.data:
            # Extraction des technologies
            technologies = []
            if project_data.get("project_technologies"):
                for pt in project_data["project_technologies"]:
                    if pt.get("technologies"):
                        tech = pt["technologies"]
                        technologies.append(Technology(**tech))
            
            # Suppression des données de liaison pour éviter les conflits
            project_clean = {k: v for k, v in project_data.items() if k != "project_technologies"}
            project_clean["technologies"] = technologies
            
            projects.append(Project(**project_clean))
        
        return projects
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des projets: {str(e)}")

@app.get("/api/projects/featured", response_model=List[Project])
async def get_featured_projects():
    """Récupère uniquement les projets mis en avant"""
    return await get_projects(featured=True)

@app.get("/api/projects/categories")
async def get_project_categories():
    """Récupère les catégories de projets disponibles"""
    try:
        result = supabase.table("projects").select("category").execute()
        categories = list(set([p["category"] for p in result.data if p["category"]]))
        categories.sort()
        
        return {"categories": categories}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des catégories: {str(e)}")

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """Récupère un projet spécifique"""
    try:
        result = supabase.table("projects").select("""
            *,
            project_technologies(
                technologies(*)
            )
        """).eq("id", project_id).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Projet non trouvé")
        
        project_data = result.data[0]
        
        # Extraction des technologies
        technologies = []
        if project_data.get("project_technologies"):
            for pt in project_data["project_technologies"]:
                if pt.get("technologies"):
                    tech = pt["technologies"]
                    technologies.append(Technology(**tech))
        
        project_clean = {k: v for k, v in project_data.items() if k != "project_technologies"}
        project_clean["technologies"] = technologies
        
        return Project(**project_clean)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération du projet: {str(e)}")

@app.get("/api/technologies", response_model=List[Technology])
async def get_technologies(category: Optional[str] = None):
    """Récupère toutes les technologies"""
    try:
        query = supabase.table("technologies").select("*")
        
        if category:
            query = query.eq("category", category)
        
        query = query.order("name")
        result = query.execute()
        
        return [Technology(**tech) for tech in result.data]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des technologies: {str(e)}")

@app.post("/api/contact")
async def send_contact_message(message: ContactMessage):
    """Traite les messages de contact"""
    try:
        # Stocker le message dans Supabase
        result = supabase.table("contact_messages").insert({
            "name": message.name,
            "email": message.email,
            "subject": message.subject,
            "message": message.message,
            "created_at": datetime.now().isoformat()
        }).execute()
        
        return {
            "message": "Message reçu avec succès",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        # Fallback: log en console si base indisponible
        print(f"Nouveau message de contact de {message.name} ({message.email})")
        print(f"Sujet: {message.subject}")
        print(f"Message: {message.message}")
        
        return {
            "message": "Message reçu avec succès",
            "timestamp": datetime.now().isoformat()
        }

@app.get("/api/stats")
async def get_stats():
    """Récupère des statistiques sur le portfolio"""
    try:
        # Statistiques depuis la base de données
        projects_count = supabase.table("projects").select("id", count="exact").execute()
        technologies_count = supabase.table("technologies").select("id", count="exact").execute()
        
        return {
            "total_projects": projects_count.count,
            "total_technologies": technologies_count.count,
            "api_version": "2.0.0"
        }
    except Exception as e:
        return {
            "total_projects": 0,
            "total_technologies": 0,
            "api_version": "2.0.0",
            "error": "Impossible de récupérer les statistiques"
        }

# Gestion des erreurs
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {"error": "Ressource non trouvée"}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {"error": "Erreur interne du serveur"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))