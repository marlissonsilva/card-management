import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { deletePurchase } from '@/app/lib/actions'

export function CreatePurchase() {
  return (
    <Link
      href="/dashboard/compras/criar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar</span>{' '}
      <IconPlus className="h-5 md:ml-4" />
    </Link>
  )
}

export function UpdatePurchase({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/compras/${id}/editar`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <IconPencil className="w-5" />
    </Link>
  )
}

export function DeletePurchase({ id }: { id: string }) {
  const deletePurchaseWithId = deletePurchase.bind(null, id)
  return (
    <form action={deletePurchaseWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <IconTrash className="w-5" />
      </button>
    </form>
  )
}
