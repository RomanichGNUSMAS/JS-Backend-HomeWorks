db = db.getSiblingDB('todoapp')

//4.1
db.todos.find();

//4.2
db.todos.find({ done: false })
db.todos.find({ priority: "high" })

//4.3
db.todos.find({ done: false, priority: 'high' })

//4.4
db.todos.find({
    due_date: { $lt: new Date() },
    priority : { $in : ['high','medium'] }
})

//4.5
db.todos.find({
    title : { $regex : "buy",$options:'i' }
})

//4.6
db.todos.find({
   tags:'work' 
})
db.todos.find({
    tags : { $all : ['work','urgent'] }
})

//4.7
db.todos.find({
    due_date : { $exists : true }
})
db.todos.find({
    subtasks: { $exists : false}
})
//4.8
db.todos.find().sort({ created_at : - 1}).limit(3)

//4.9
db.todos.find({}, { title: 1,priority : 1,_id: 0})

//4.10
db.todos.find().skip(3).limit(3)