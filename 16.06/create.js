// mongosh --username todo_app --password roman123 todoapp

db = db.getSiblingDB('todoapp');

// 2.1
db.createCollection('todos');


//2.2
db.todos.createIndex({ title: 1 }, { unique: true })

//2.3
db.todos.createIndex({ done: 1, priority: -1 }, { name: "done_priority" })

//2.4
print(db.todos.getIndexes())

//3.1
db.todos.insertOne({
    done: false,
    priority: 'medium',
    title: 'Buy Ram',
    created_at: new Date()
})

//3.2
db.todos.insertMany([
    {
        title: "Buy groceries",
        priority: "medium",
        done: false,
        due_date: new Date("2026-06-18")
    },
    {
        title: "Submit quarterly financial report",
        priority: "high",
        done: false,
        due_date: new Date("2026-06-20")
    },
    {
        title: "Water the office plants",
        priority: "low",
        done: true,
        due_date: new Date("2026-06-21")

    },
    {
        title: "Pay internet bill",
        priority: "medium",
        done: true,
    },
    {
        title: "Book car maintenance service",
        priority: "high",
        done: false,
        due_date: new Date("2026-06-17")
    },
    {
        title: "Read technical documentation",
        priority: "low",
        done: false,

    }
]);


//3.3
db.todos.insertOne({
    title: 'i don\'t know',
    priority: 'urgent',
    done: false,
    tags: ['work', 'urgent', 'fast'],
    due_date: new Date('2026-06-12')
})

//3.4
db.todos.insertOne({
    title: "do something",
    priority: "urgent",
    done: false,
    subtasks: [
        { title: 'Open laptop', done: true },
        { title: 'Write code', done: false }
    ],
    due_date: new Date('2026-06-16')
})

//3.5
db.todos.insertOne({ title:"i don't know "})
// /*
//  E11000 duplicate key error collection: todoapp.todos index: title_1 dup key: { title: "Buy groceries" }
// */

//3.6
//db.todos.countDocuments() => 9