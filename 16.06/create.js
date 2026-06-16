// mongosh --username todo_app --password roman123 todoapp

db = db.getSiblingDB('todoapp');

// 2.1
db.createCollection('todos');


//2.2
db.todos.createIndex({ title : 1} , { unique: true })

//2.3
db.todos.createIndex({ done: 1, priority: -1}, { name:"done_priority"})

//2.4
print(db.getIndexes())

//3.1
db.todos.insertOne({
    done : false,
    priority : 'medium',
    title : 'Buy groceries',
    created_at: new Date()
})

//3.2