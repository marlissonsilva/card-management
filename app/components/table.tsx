import { listPurchase } from '../lib/actions'
import { IconCheck, IconClock } from '@tabler/icons-react'
import formatCurrency, { formatDateToLocal } from '../lib/utils'
import { DeletePurchase, UpdatePurchase } from './buttons'
import { NoData } from './no-data'

export default async function Table({
  query,
  currentPage
}: {
  query: string
  currentPage: number
}) {
  const purchases = await listPurchase(query, currentPage)
  
  if (!purchases || purchases.length === 0) {
    return <NoData />
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* mobile */}
          <div className="md:hidden">
            {purchases?.map((purchase) => (
              <div
                key={purchase.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{purchase.responsible}</p>
                    </div>
                  </div>
                  <div>
                    <span className="mb-2 flex gap-2 items-center">
                      {purchase.status ? 'Pago' : 'Pendente'}
                      {purchase.status ? (
                        <IconCheck stroke={1.4} />
                      ) : (
                        <IconClock stroke={1.4} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(purchase.amount)}
                    </p>
                    <p>{formatDateToLocal(purchase.dateOfPurchase)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePurchase id={purchase.id} />
                    <DeletePurchase id={purchase.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-base font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Responsável
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Valor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data da compra
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {purchases?.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="w-full border-b border-zinc-200 py-3 text-base last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{purchase.responsible}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(purchase.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(purchase.dateOfPurchase)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="flex gap-2 items-center">
                      {purchase.status ? 'Pago' : 'Pendente'}
                      {purchase.status ? (
                        <IconCheck stroke={1.4} />
                      ) : (
                        <IconClock stroke={1.4} />
                      )}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePurchase id={purchase.id} />
                      <DeletePurchase id={purchase.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
