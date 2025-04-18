'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'

const FormSchema = z.object({
  id: z.string(),
  responsible: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Valor tem que ser maior que R$: 0,00.' }),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  dateOfPurchase: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Selecione uma data válida'
    }),
  installments: z.coerce
    .number()
    .int()
    .min(1, 'Parcelas devem ser maior que 0')
    .max(12, 'Parcelas devem ser menor que 12')
})

export type State = {
  errors?: {
    responsible?: string[] | undefined
    amount?: string[] | undefined
    description?: string[] | undefined
    dateOfPurchase?: string[] | undefined
    installments?: string[] | undefined
  }
  message?: string | undefined
}

const CreatePurchase = FormSchema.omit({ id: true })
const ITEMS_PER_PAGE = 8

export async function createPurchase(
  state: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreatePurchase.safeParse({
    responsible: formData.get('responsible'),
    amount: formData.get('amount'),
    description: formData.get('description'),
    dateOfPurchase: formData.get('dateOfPurchase'),
    installments: formData.get('installments')
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Falha ao criar compra'
    }
  }

  try {
    await prisma.purchase.create({
      data: {
        ...validatedFields.data
      }
    })
  } catch (error) {
    return {
      message: `Database error: Falha ao criar compra.${error}`
    }
  }

  revalidatePath('/dashboard/')
  redirect('/dashboard/compras')
}

export async function updatePurchase(
  id: string,
  previousState: State, 
  formData: FormData
): Promise<State> {
  const validatedFields = CreatePurchase.safeParse({
    responsible: formData.get('responsible'),
    amount: formData.get('amount'),
    description: formData.get('description'),
    dateOfPurchase: formData.get('dateOfPurchase'),
    installments: formData.get('installments')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Falha ao atualizar compra'
    }
  }

  try {
    await prisma.purchase.update({
      where: { id },
      data: { ...validatedFields.data }
    })
  } catch (error) {
    return {
      message: `Database error: Falha ao atualizar compra.${error}`
    }
  }

  revalidatePath('/dashboard/compras')
  redirect('/dashboard/compras')
}

export async function fetchPurchaseById(id: string) {
  const purchase = await prisma.purchase.findUnique({
    where: { id }
  })
  return purchase
}

export async function fetchResponsible() {
  const responsible = await prisma.purchase.findMany({
    distinct: ['responsible']
  })
  return responsible
}

export async function listPurchase(query: string, currentPage: number) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const purchases = await prisma.purchase.findMany({
    where: {
      OR: [
        {
          responsible: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ]
    },
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: {
      dateOfPurchase: 'desc'
    }
  })
  return purchases
}

export async function fetchPurchasePages(query: string) {
  try {
    const totalInvoices = await prisma.purchase.count({
      where: {
        OR: [
          {
            responsible: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      }
    })

    const totalPages = Math.ceil(totalInvoices / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
  }
  revalidatePath('/dashboard/compras')
}

export async function getResponsibles() {
  const responsibles = await prisma.purchase.findMany({
    distinct: ['responsible']
  })

  const responsibleTotals = await Promise.all(
    responsibles.map(async (responsible) => {
      const purchases = await prisma.purchase.findMany({
        where: {
          responsible: responsible.responsible
        }
      })

      const totalPurchases = purchases.length
      const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)
      const totalPending = purchases
        .filter(purchase => !purchase.status)
        .reduce((sum, purchase) => sum + purchase.amount, 0)
      const totalPaid = purchases
        .filter(purchase => purchase.status)
        .reduce((sum, purchase) => sum + purchase.amount, 0)

      return {
        ...responsible,
        totalPurchases,
        totalAmount,
        totalPending,
        totalPaid
      }
    })
  )

  return responsibleTotals
}

export async function deletePurchase(id: string) {
  try {
    await prisma.purchase.delete({
      where: {
        id
      }
    })
    revalidatePath('/dashboard/compras')
    return { message: 'Compra deletada com sucesso' }
  } catch (error) {
    return { message: `Database error: Falha ao deletar compra. ${error}` }
  }
}

export async function fetchCardData() {
  try {
    const [amount, pending, totalResponsible, purchases] = await Promise.all([
      prisma.purchase.aggregate({
        _sum: {
          amount: true
        }
      }),

      prisma.purchase.aggregate({
        _sum: {
          amount: true
        },
        where: {
          status: false
        }
      }),

      prisma.purchase.findMany({
        distinct: ['responsible']
      }),

      prisma.purchase.count()
    ])

    const totalAmount = Number(amount._sum.amount?.toFixed(2) || 0)
    const totalPending = Number(pending._sum.amount?.toFixed(2) || 0)
    const totalPurchases = purchases

    return {
      totalAmount,
      totalPending,
      totalResponsible,
      totalPurchases
    }
  } catch (error) {
    console.error('Database Error:', error)
  }
  revalidatePath('/dashboard/compras')
}
