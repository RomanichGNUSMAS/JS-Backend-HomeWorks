//8.1
db.todos.aggregate([{ $group: {_id:'$priority',count : { $sum: 1}}}])

//8.2
db.todos.aggregate([{ $group: {_id:'$done',count : { $sum: 1}}}])

//8.3
db.todos.aggregate([{
    $unwind : "$tags",

}, {
    $group : {
        _id : "$tags",
        total : { $sum : 1}
    }
}])

//8.4
db.todos.aggregate([
    {
        $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            count: { $sum: 1 }
        }
    },
    
    {
        $sort: { _id: 1 }
    }
])

//8.5

db.todos.aggregate([{
    $match: { done:false,tags:"urgent" }
},
{
    $project : {
        _id:0,
        title:1
    }
},
{
    $sort : {
        title:1
    }
}])