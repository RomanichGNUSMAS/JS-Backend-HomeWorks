const { z, email } = require('zod');

exports.registerValidator = {
    shape: z.object({
        name:z.string(),
        password:z.string().min(8),
        email:z.string().email(),
        age:z.number().min(1).max(100).optional()
    })
}

exports.loginValidator = {
    shape: z.object({
        email:z.string().email(),
        password:z.string().min(8)
    })
}