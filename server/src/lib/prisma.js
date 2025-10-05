const {PrismaClient} = require('@prisma/client');

// import {PrismaClient} from '.src/generated/prisma'

const prisma = new PrismaClient();

module.exports = prisma;