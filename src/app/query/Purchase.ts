'use server'
import { PrismaClient } from '@prisma/client'
import { Purchase } from '../data/models/Purchase'

const prisma = new PrismaClient()

export async function createPurchase(data: Purchase) {
  const result = await prisma.purchase.create({ data })
  if (result) {
    return true
  }
}

export async function listPurchases() {
  const result = await prisma.purchase.findMany()
  return result 
}
