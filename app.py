from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

# db = [
#     {
#         "id": 1,
#         "task_name": "Приготовить еду",
#         "task_description": "Надо на ужин приготовить еды, иначе будет грустно :(",
#         "is_completed": False
#     }
# ]

class Increment:
    value = 1
    
    def get_next(self):
        self.value += 1
        return self.value
    
    
inc = Increment()


class TodoTask(BaseModel):
    id: int
    task_name: str
    task_description: str
    is_completed: bool
    
    
class TodoCreate(BaseModel):
    task_name: str
    task_description: str


db = [
    TodoTask(
        id=1,
        task_name="Приготовить еду",
        task_description="Надо на ужин приготовить еды, иначе будет грустно :(",
        is_completed=False
    )
]


@app.get("/hello")
def hello_world():
    return {"message": "Hello World!"}


@app.get("/todos", response_model=list[TodoTask])
def get_all_todos():
    return db


@app.get("/todos/{id}", response_model=TodoTask)
def get_todo_by_id(id: int):
    return [todo for todo in db if todo.id == id][0]


@app.post("/todos", response_model=list[TodoTask])
def create_todo(todo: TodoCreate):
    todo_obj = TodoTask(
        id=inc.get_next(),
        task_name=todo.task_name,
        task_description=todo.task_description,
        is_completed=False
    )
    db.append(todo_obj)
    return db


@app.post("/todos/{id}/complete", response_model=list[TodoTask])
def complete_task(id: int):
    for todo in db:
        if todo.id == id and not todo.is_completed:
            todo.is_completed = True
    return db


@app.delete("/todos/{id}", response_model=TodoTask)
def delete_task(id: int):
    for todo in db:
        if todo.id == id:
            db.remove(todo)
            return todo
