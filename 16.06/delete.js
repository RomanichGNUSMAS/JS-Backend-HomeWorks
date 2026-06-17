db = db.getSiblingDB('todoapp')

//7.1
db.todos.deleteOne({ title:"Weekly review"});

//7.2
db.todos.deleteMany({ done: true});
//{ acknowledged: true, deletedCount: 5 }


//7.3
db.todos.deleteMany({ created_at: { $lt : new Date() }})

//7.4
//db.todos.deleteMany()
// vorovhetev ayn karoxe jnjel natev anhrajesht tvyalner

//9.1
//MongoServerError[Unauthorized]: not authorized on todoapp to execute command { insert: "todos", documents: [ { _id: ObjectId('6a32cc5b3fb86f82a4abc114') } ], ordered: true, lsid: { id: UUID("cb4d992c-60f3-4e22-b798-2a37a1a3a7df") }, $db: "todoapp" }

// 9.2
db.updateUser("viewer", {
    pwd:"pass123"
})

//9.3
db.grantRolesToUser("viewer", [ { role: "readWrite", db: "todoapp" } ])

//9.4
db.dropUser("viewer")

//10.1
db.todos.drop()

//10.2
db.dropDatabase()