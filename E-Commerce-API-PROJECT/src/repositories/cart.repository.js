const { prisma } = require("../configs/db")
const { verifyKey } = require("../utils/jwt")

exports.CartRepository = class {
    static async getUserCart(token) {
        const jwt = verifyKey(token)
        if(!jwt) return 403;
        const found_user = await prisma.user.findUnique({
            where: {
                email: jwt.email
            },
            include : {
                cart : true
            }
        })
        if (!found_user) return 404;
        if (!found_user.cart) {
            const result = await prisma.cart.create({
                data: {
                    userId: found_user.id
                },
                include: {
                    items: true
                }
            })
            return result
        }
        return found_user.cart
    }

    static async addProductToCart(rawData, token) {
        const decoded = verifyKey(token);
        if (!decoded) return 40400;

        const product = await prisma.product.findUnique({
            where: { id: +rawData.productId }
        });
        if (!product) return 40402;

        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
            include: {
                cart: true
            }
        })
        if (!user) return 40401;
        if(!user.cart) {
            await prisma.cart.create({
                data : {
                    userId: user.id
                }
            })
        }
        const quantity = rawData.quantity || 1;

        if (quantity > product.stock) return 400;

        const existingItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId: product.id }
        });

        if (existingItem) {
            return await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            });
        }

        return await prisma.cartItem.create({
            data: {
                productId: product.id,
                cartId: cart.id,
                quantity: quantity
            }
        });
    }

    static async changeQuantityOfProduct(quantity, id) {
        const ifExists = await prisma.cartItem.findUnique({
            where: { id }
        })
        if (!ifExists) return 404;
        const product = await prisma.product.findUnique({ where: { id: ifExists.productId } })
        if ((product.stock + ifExists.quantity) - quantity < 0) return 400;
        return await prisma.cartItem.update({
            where: { id },
            data: {
                quantity
            }
        })
    }

    static async removeCartItem(id) {
        const ifExists = await prisma.cartItem.findUnique({
            where: { id }
        })
        if (!ifExists) return null;
        const product = await prisma.product.findUnique({ where: { id: ifExists.productId } })
        return await prisma.cartItem.delete({
            where: { id }
        })
    }
}