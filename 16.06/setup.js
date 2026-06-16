db = db.getSiblingDB('todoapp')

db.createUser({
    user:"todo_app",
    pwd:"roman123",
    roles : [{ role : "readWrite", db : "todoapp" }]
})

db.createUser({
    user:"viewer",
    pwd:"viewer123",
    roles : [{ role : "read", db : "todoapp" }]
})

print(db.getUsers())