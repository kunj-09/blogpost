import { PrismaClient } from "@prisma/client";    //This imports PrismaClient from the Prisma package, which is used to interact with your database. PrismaClient provides methods for querying, inserting, updating, and deleting data from your database.

const globalPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;

export default prisma;


//In development, when your code reloads, it might try to create new database connections each time, which can cause issues (like too many connections).This code prevents that by reusing the same database connection during development. In production, where the app doesn’t reload as often, this is not a problem.In short: This code ensures you’re using only one database connection while developing your app.