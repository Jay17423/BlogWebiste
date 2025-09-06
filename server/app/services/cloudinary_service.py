# app/services/cloudinary_service.py

import cloudinary.uploader
from fastapi import UploadFile, HTTPException, status

def upload_image(file: UploadFile) -> str:
    """
    Uploads an image file to Cloudinary.
    Returns the secure URL of the uploaded image.
    """
    try:
      
        upload_result = cloudinary.uploader.upload(file.file, folder="fastapi_posts")
        

        return upload_result.get("secure_url")
    
    except Exception as e:
    
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Image upload failed: {str(e)}"
        )