import { Suspense } from 'react'
import { Metadata } from 'next'
import { CreatePurchase } from '@/app/components/buttons'
import Search from '@/app/components/search'
import { fetchPurchasePages } from '@/app/lib/actions'
import Pagination from '@/app/components/pagination'
import { PurchaseTableSkeleton } from '@/app/components/skeletons'
import Table from '@/app/components/table'
export const metadata: Metadata = {
  title: 'Compras'
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const data = await fetchPurchasePages(query)
  const totalPages = data || 0

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Compras</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquise pelo nome..." />
        <CreatePurchase />
      </div>
      <Suspense key={query + currentPage} fallback={<PurchaseTableSkeleton/>}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
