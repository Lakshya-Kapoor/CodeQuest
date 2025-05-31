from .auth import router as auth_router
from .problem import router as problem_router
from .submission import router as submission_router

__all__ = ["auth_router", "problem_router", "submission_router"]