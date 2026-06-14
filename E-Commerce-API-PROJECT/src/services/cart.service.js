const { CartRepository } = require("../repositories/cart.repository")

exports.CartService = class {
    static async getUserCart(token){
        const result = await CartRepository.getUserCart(token);
        if(!result) throw new Error('user not found');
        return result
    }

    static async addToCart(rawData,token) {
        const result = await CartRepository.addProductToCart(rawData,token);
        switch(result) {
            case 40400 : {
                throw new Error('invalid token')
            }

            case 40401 : {
                throw new Error('user not found');
            }

            case 40402 : {
                throw new Error('product not found');
            }
            case 400 : {
                throw new Error('to much quantity for that product')
            }

            default : {
                return result;
            }
        }
    }

    static async updateQuantity(quantity,id) {
        console.log(id)
        const result = await CartRepository.changeQuantityOfProduct(quantity,id);
        switch ( result) {
            case 404 : {
                throw new Error('cart item not found')
            }
            case 400 : {
                throw new Error('too much quantity for this product')
            }
            default : return result;
        }
    }

    static async removeProduct(id) {
        const result = await CartRepository.removeCartItem(id);
        if(!result) throw new Error('product not found');
        return result;
    }
}