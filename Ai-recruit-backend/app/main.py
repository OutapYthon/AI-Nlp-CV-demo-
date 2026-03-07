from fastapi import FastAPI
from app.routes import cv_routes

# Initialize the FastAPI app FIRST
app = FastAPI(
    title="AI Recruitment Agentic System",
    description="Backend for CV parsing and Skill extraction using spaCy and SkillNER",
    version="1.0.0"
)

# THEN include routers
app.include_router(cv_routes.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the AI Recruitment API",
        "docs": "/docs",
        "status": "Online"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)