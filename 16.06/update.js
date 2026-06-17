//5.1
db.todos.updateOne({
    title: 'Buy groceries'
}, {
    $set: { done: true }
})

//5.2
db.todos.updateMany({
    priority: "high"
}, {
    $set: {
        done: true
    }
})
/*
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
*/

//5.3
db.todos.updateMany({}, {
    $set: {
        updated_at: new Date()
    }
})

//5.4
db.todos.updateMany({}, {
    $unset: {
        due_date: true
    }
})

//5.5
db.todos.updateOne({}, {
    $addToSet: {
        tags: 'important'
    }
})

//5.6
db.todos.updateMany({
    tags: 'urgent'
}, {
    $pull: {
        tags: 'urgent'
    }
})

//5.7
db.todos.updateMany({}, {
    $set: {
        number: 0
    }
})

//5.8
db.todos.updateOne({ title: 'Weekly review' }, { $set: { a: true } }, { upsert: true })

//6.1
db.todos.find({
    subtasks: { $exists: true, $not: { $size: 0 } }
})

//6.2
db.todos.find({
    subtasks : { $exists : true},
    'subtasks.done' : { $not : {$eq:false } }
})
//6.3
db.todos.updateOne({},{
    $push : {
        subtasks : {
            title : "new quest",
            priority : "medium",
            done : false
        }
    }
})

//6.4
db.todos.updateOne(
    { 
        title: 'Some Todo', 
        'subtasks.title': 'Open laptop' 
    },
    { 
        $set: { 'subtasks.$.done': true } 
    }
)

db.todos.countDocuments({ 'subtasks.2' : { $exists : true } })