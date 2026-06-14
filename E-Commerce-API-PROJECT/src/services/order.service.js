const { OrderRepository } = require("../repositories/order.repository")

exports.OrderService = class {
    static async orderCheckout (token) {
        const result = await OrderRepository.checkoutOrder(token);
        switch (result) {
            case 403 : {
                throw new Error('you haven\'t permission without token to order');
            }

            case 40400 : {
                throw new Error('user not found')
            }

            case 40401 : {
                throw new Error('cart not found')
            }

            case 400 : {
                throw new Error('too many count for this product');
            }

            default : { return result }
        } 
    }

    static async getOrdersForSpecificRole(token,role) {
        const result = await OrderRepository.getOrdersForSpecificRole(token,role);
        switch (result) {
            case 403 : {
                throw new Error('you haven\'t permission for get order or role not found')
            }

            case 404 : {
                throw new Error('user not found')
            }

            default : { return result }
        }
    }

    static async getOrderItems(token){
        const result = await OrderRepository.getOrderItems(token)
        switch(result) {
            case 403: {
                throw new Error('you haven\'t permission to get orderItems')
            }

            case 404 : {
                throw new Error('user not found')
            }

            default : { return result }
        }
    }

    static async changeStatus(token,status,id) {
        const result = await OrderRepository.changeStatus(token,status,id)
        switch (result) {
            case 403 : {
                throw new Error ('you don\'t have permission to change status')
            }

            default : { return result }
        }
    }
}