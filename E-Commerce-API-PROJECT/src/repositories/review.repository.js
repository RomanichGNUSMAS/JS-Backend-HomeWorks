const { prisma } = require("../configs/db");
const { cleanReview } = require("../utils/clearObject");
const { verifyKey } = require("../utils/jwt")

exports.ReviewRepository = class {
    static async allProductReviews (id) {
        return (await prisma.product.findUnique({
            where : { id:+id },
            include : {
                reviews : {
                    include : {
                        user : {
                            select : {
                                name: true,
                                id: true,
                                email : true
                            }
                        }
                    }
                }
            }
        })).reviews
    }

    static async addReview (token,productId,rawData) {
        const jwt = verifyKey(token);
        if(!jwt) return 403;
        const user = await prisma.user.findUnique({
            where : { email:jwt.email }
        }) 

        if(!user) return 40400;
        const paid_order = await prisma.order.findFirst({
            where : {
                userId:user.id,
                status: "paid",
                orderItems : {
                    some : {
                        productId:+productId
                    }
                }
            }
        })
        if(!paid_order) return 40401;
        const cleanObj = cleanReview(rawData)
        return await prisma.review.create({
            data : {
                ...cleanObj,
                userId:user.id,
                productId:+productId
            }
        })
    }

    static async deleteReview(token,id) {
        const jwt = verifyKey(token);
        if(!jwt) return 403;
        const user = await prisma.user.findUnique({
            where : { email:jwt.email }
        })
        if(!user) return 40401;
        const review = await prisma.review.findFirst({
            where : { id:+id }
        })
        if(!review) return 40400;
        if(user.role != 'admin' && user.id != review.userId) return 403;
        return await prisma.review.delete({
            where : { id:+id }
        })
    }
}