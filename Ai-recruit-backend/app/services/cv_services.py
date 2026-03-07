import os
import shutil
import uuid
# Ensure this matches your parser filename exactly too!
from app.services.parser_services import extract_text, extract_skills

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def upload_cv_logic(file):
    try:
        # 1. Save File
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 2. Extract Text and Skills
        text = extract_text(file_path)
        skills = extract_skills(text)

        return {
            "status": "success",
            "filename": file.filename,
            "internal_id": unique_filename,
            "skills": skills
        }, 201
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

def get_cv_logic():
    files = os.listdir(UPLOAD_DIR)
    return {"status": "success", "total": len(files), "files": files}, 200

def delete_cv_logic(filename):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"status": "success", "message": f"Deleted {filename}"}, 200
    return {"status": "error", "message": "File not found"}, 404