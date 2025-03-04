'use server'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

import { Purchase } from '../data/models/Purchase'

export async function createPurchase(data: Purchase) {
  const result = await prisma.purchase.create({ data })
  if (result) {
    return true
  }
}
