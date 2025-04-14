import FormEdit from '@/app/components/edit-form'
import { fetchPurchaseById, fetchResponsible } from '@/app/lib/actions'
import { notFound } from 'next/navigation'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const [purchase, responsible] = await Promise.all([
    fetchPurchaseById(id),
    fetchResponsible()
  ])

  if (!purchase) {
    notFound()
  }

  return (
    <div className="w-full h-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Editar compra</h1>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 md:mt-8 ">
        <FormEdit purchases={purchase} responsible={responsible} />
      </div>
    </div>
  )
} 
