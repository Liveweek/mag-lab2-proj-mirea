from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

db = [
    {
        "id": 1,
        "task_name": "Приготовить еду",
        "task_description": "Надо на ужин приготовить еды, иначе будет грустно :(",
        "is_completed": False
    }
]


class TodoTask(BaseModel):
    id: int
    task_name: str
    task_description: str
    is_completed: bool


@app.get("/hello")
def hello_world():
    return {"message": "Hello World!"}


@app.get("/todos", response_model=list[TodoTask])
def get_all_todos():
    return db


@app.get("/todos/{id}", response_model=TodoTask)
def get_todo_by_id(id: int):
    todo_task = [todo for todo in db if todo["id"] == id][0]
    return todo_task


@app.post("/todos", response_model=list[TodoTask])
def create_todo(todo: TodoTask):
    db.append(todo.model_dump())
    return db


@app.post("/todos/{id}/complete", response_model=list[TodoTask])
def complete_task(id: int):
    for todo in db:
        if todo["id"] == id and not todo["is_completed"]:
            todo["is_completed"] = True
    return db


@app.delete("/todos/{id}", response_model=TodoTask)
def delete_task(id: int):
    for todo in db:
        if todo["id"] == id:
            db.remove(todo)
            return todo
