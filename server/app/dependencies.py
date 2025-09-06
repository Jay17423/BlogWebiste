from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
import jwt
from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        user_id: str = payload.get("sub")
        username: str = payload.get("username")

        if not user_id or not username:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {"id": int(user_id), "username": username}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
