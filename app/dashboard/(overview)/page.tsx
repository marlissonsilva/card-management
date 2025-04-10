import CardWrapper from '@/app/components/cards'
import { CardsSkeleton } from '@/app/components/skeletons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="flex flex-col xl:flex-row gap-5 mt-10">
        <div className="min-h-[500px] w-[100%] bg-zinc-100 xl:w-1/2 p-6 rounded-2xl">
          {' '}
          <h2 className='text-xl font-medium p-2'>Gráfico</h2>
        </div>
        <div className="min-h-[500px] w-[100%] bg-zinc-100 xl:w-1/2 p-6 rounded-2xl">
          {' '}
          <h2 className='text-xl font-medium p-2'>Últimas compras</h2>
        </div>
      </div>
    </main>
  )
}
