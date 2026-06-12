const { raw } = require("express");
const { prisma } = require("../configs/db")
const { verifyKey } = require("../utils/jwt")

exports.CartRepository = class {
    static async getUserCart(token) {
        const users = await prisma.user.findMany({
            where: { role: "customer" },
            include: {
                cart: {
                    include: {
                        items: true
                    }
                }
            }
        })
        let found_user = null;
        for (const user of users) {
            if (verifyKey(user.email, token)) {
                found_user = user;
                break;
            }
        }
        if (!found_user) return null;
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
        const product = await prisma.product.findUnique({
            where: { id: +rawData.productId }
        })
        if (!product) return 40400;
        let found_User = null;
        const users = await prisma.user.findMany({
            where: { role: "customer" },
            include: {
                cart: true
            }
        })
        for (const user of users) {
            if (verifyKey(user.email, token)) {
                found_User = user;
                break;
            }
        }
        if (!found_User) return 40401;
        const quantity = rawData.quantity || 1;
        if (quantity > product.quantity) return 400;
        await prisma.product.update({
            where: { id: +rawData.productId },
            data: {
                stock: product.stock - quantity
            }
        })
        const result = await prisma.cartItem.create({
            data: {
                productId: product.id,
                cartId: found_User.cart.id,
                quantity: quantity
            }
        })
        return result;
    }

    static async changeQuantityOfProduct(quantity, id) {
        const ifExists = await prisma.cartItem.findUnique({
            where: { id }
        })
        if (!ifExists) return 404;
        const product = await prisma.product.findUnique({ where: { id: ifExists.productId } })
        if((product.stock + ifExists.quantity) - quantity < 0) return 400;
        await prisma.product.update({
            where : { id:ifExists.productId },
            data : {
                stock : (product.stock + ifExists.quantity) - quantity
            }
        })
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
        await prisma.product.update({
            where: { id: ifExists.productId },
            data: {
                stock: product.stock + ifExists.quantity
            }
        })
        return await prisma.cartItem.delete({
            where: { id }
        })
    }
}