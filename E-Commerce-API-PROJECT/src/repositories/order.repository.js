const { prisma } = require('../configs/db');
const { verifyKey } = require('../utils/jwt');

exports.OrderRepository = class {
    static async checkoutOrder(token) {
        return await prisma.$transaction(async (tx) => {
            const decoded = verifyKey(token);
            if (!decoded) return 403;

            const user = await tx.user.findUnique({
                where: {
                    email: decoded.email
                },
                include: {
                    cart: {
                        include: {
                            items: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            })

            if (!user) return 40400;
            if (!user.cart || user.cart.items.length === 0) return 40401;
            let total = 0;
            const cartsData = [];
            for (const item of user.cart.items) {
                const quantity = item.quantity;
                if (item.product.stock < quantity) return 400;

                cartsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    priceAtPurchase: item.product.price
                })

                total += item.quantity * item.product.price
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                });
            }

            const result = await tx.order.create({
                data: {
                    userId: user.id,
                    total,
                    orderItems: { create : cartsData }
                }
            })

            await tx.cartItem.deleteMany({
                where: { cartId: user.cart.id }
            });
            return result
        })
    }

    static async getOrdersForSpecificRole(token, role) {
        const jwt = await verifyKey(token)
        if (!jwt) return 403;
        const user = await prisma.user.findUnique({
            where: { email: jwt.email },
            include: {
                orders: true
            }
        })
        if (!user) return 404
        switch (user.role) {
            case "customer": {
                return user.orders;
            }

            case "admin": {
                const orders = await prisma.order.findMany();
                return orders;
            }

            default: { return 403 }
        }
    }

    static async getOrderItems(token) {
        const jwt = await verifyKey(token)
        if (!jwt) return 403;
        const user = await prisma.user.findUnique({
            where: { email: jwt.email },
            include: {
                orders: {
                    include: {
                        orderItems: true
                    }
                }
            }
        })
        if (!user) return 404;
        return await prisma.orderItem.findMany({
            where: {
                order: {
                    userId: user.id
                }
            },
            include: {
                product: true
            }
        })
    }

    static async changeStatus(token, status, id) {
        const jwt = verifyKey(token);
        if (!jwt) return 403;
        const user = await prisma.user.findUnique({
            where: { email: jwt.email }
        })
        if (!user || user.role != 'admin') return 403;
        return await prisma.order.update({
            where: { id:+id },
            data: { status }
        })
    }
}

