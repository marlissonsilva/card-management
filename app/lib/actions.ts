'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'

const FormSchema = z.object({
  id: z.string(),
  responsible: z.string().min(3, 'Nome deve ter pelo menos 2 caracteres'),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Valor tem que ser maior que R$: 0,00.' }),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  dateOfPurchase: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: 'Data inválida' }),
  installments: z.number()
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

export async function createPurchase(
  state: State,
  formData: FormData
): Promise<State> {
  const rawAmount = formData.get('amount') as string
  const normalizedAmount =
    parseFloat(rawAmount.replace(/\./g, '').replace(',', '.')) || 0

  const rawInstallments = formData.get('installments') as string
  const normalizedInstallments = Number(rawInstallments) || 0

  const validatedFields = CreatePurchase.safeParse({
    responsible: formData.get('responsible'),
    amount: normalizedAmount,
    description: formData.get('description'),
    dateOfPurchase: formData.get('dateOfPurchase'),
    installments: normalizedInstallments
  })

  console.log('Validated Fields', validatedFields)

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Falha ao criar compra'
    }
  }

  const result = await prisma.purchase.create({
    data: {
      ...validatedFields.data,
      amount: normalizedAmount,
      installments: normalizedInstallments
    }
  })

  console.log('Result', result)

  revalidatePath('/dashboard/')
  redirect('/dashboard/register')
}
