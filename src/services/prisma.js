const { PrismaClient} = require("@prisma/client")

// console.log(process.env.DATABASE_URL)

module.exports = new PrismaClient()
