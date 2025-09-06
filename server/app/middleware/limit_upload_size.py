from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from fastapi.responses import JSONResponse


class LimitUploadSizeMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_upload_size: int = 10 * 1024 * 1024):  # 10 MB
        super().__init__(app)
        self.max_upload_size = max_upload_size

    async def dispatch(self, request: Request, call_next):
        body = await request.body()
        if len(body) > self.max_upload_size:
            return JSONResponse(
                status_code=413,
                content={"detail": "File too large"},
            )
        return await call_next(request)
