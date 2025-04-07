import { PrismaClient } from '@prisma/client'
import { purchases } from './data/sample'

const prisma = new PrismaClient()

export async function seedDatabase() {
  try {
    for (const purchase of purchases) {
      await prisma.purchase.create({
        data: purchase
      })
    }

    console.log('Dados de seed inseridos com sucesso!')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}