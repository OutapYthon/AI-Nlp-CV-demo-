from fastapi import APIRouter, UploadFile, File, HTTPException
# This line creates the 'router' object that was missing!
router = APIRouter(prefix="/cv", tags=["CV Management"])

from app.services import cv_services

@router.post("/upload")
async def handle_upload_cv(file: UploadFile = File(...)):
    # Call the logic from the service file
    response, status_code = await cv_services.upload_cv_logic(file)
    if response["status"] == "error":
        raise HTTPException(status_code=status_code, detail=response["message"])
    return response

@router.get("/list")
async def handle_get_cvs():
    response, status_code = cv_services.get_cv_logic()
    return response

@router.delete("/delete/{filename}")
async def handle_delete_cv(filename: str):
    response, status_code = cv_services.delete_cv_logic(filename)
    if response["status"] == "error":
        raise HTTPException(status_code=status_code, detail=response["message"])
    return response