const { handler } = require('./template-handler')

const obj = {
    name:"Roman",
    authorName:"Valod",
    mode: "deeply"
}

handler(obj)