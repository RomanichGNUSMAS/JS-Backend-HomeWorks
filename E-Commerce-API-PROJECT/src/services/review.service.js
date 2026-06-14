const { ReviewRepository } = require("../repositories/review.repository")

exports.ReviewService = class { 
    static async getAllReviewsOfProduct(id) {
        return await ReviewRepository.allProductReviews(id);
    }

    static async addRewiev(token,productId,rawData) {
        const result = await ReviewRepository.addReview(token, productId, rawData);
        switch (result) {
            case 403 : {
                throw new Error('you don\'t have a permission to do this operation');
            }

            case 40400 : {
                throw new Error('user not found')
            }

            case 40401 : {
                throw new Error('paid orders not found');
            }
            default : { return result }
        }
    }

    static async remove(token,id) {
        const result = await ReviewRepository.deleteReview(token, id);
        switch (result) {
            case 403 : {
                throw new Error('you haven\'t permission to delete not your reviews');
            }

            case 40401 : {
                throw new Error('user not found')
            }

            case 40400 : {
                throw new Error('review not found');
            }

            default : { return result }
        }
    }
}