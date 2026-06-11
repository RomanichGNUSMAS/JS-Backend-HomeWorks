const { PrismaClient } = require("../generated/prisma/client");
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config({ quiet:true });

const adapter = new PrismaPg({ connectionString:process.env.DATABASE_URL })
exports.prisma = new PrismaClient({ adapter })