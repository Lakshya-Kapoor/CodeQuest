from typing import Literal

Language = Literal["python", "cpp"]

Difficulty = Literal["easy", "medium", "hard"]

Status = Literal[
    "pending",
    "accepted",
    "wrong answer",
    "time limit exceeded",
    "memory limit exceeded",
    "error"
]