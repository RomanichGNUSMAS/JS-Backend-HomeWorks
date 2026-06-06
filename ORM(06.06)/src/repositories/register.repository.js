const { prisma } = require("../configs/db");

class RegisterRepository {
    static async register(rawData) {
        const { email, password } = rawData;

        const found = await prisma.user.findFirst({
            where: {
                email: "user@example.com",
            },
            select: {
                email: true,
            }
        })
        if(!found)
    }

}