import { Suspense } from 'react'
import { Metadata } from 'next'
import ResponsibleTable from '@/app/components/table-responsible'
export const metadata: Metadata = {
  title: 'Responsáveis'
}

export default async function Page() {
  // const searchParams = await props.searchParams
  // const query = searchParams?.query || ''
  // const currentPage = Number(searchParams?.page) || 1
  // const totalPages = await fetchPurchasePages(query)

  return (
    <div className="w-full">
      <Suspense>
        <ResponsibleTable />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  )
}
