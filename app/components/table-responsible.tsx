import { getResponsibles } from '../lib/actions'
import Search from './search'
import formatCurrency from '../lib/utils'

export default async function ResponsibleTable({}) {
  const responsibles = await getResponsibles()
  return (
    <div className="w-full">
      <h1 className={` mb-8 text-xl md:text-2xl`}>Responsáveis</h1>
      <Search placeholder="Pesquise pelo nome..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {responsibles?.map((responsible) => (
                  <div
                    key={responsible.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{responsible.responsible}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pendente</p>
                        <p className="font-medium">{formatCurrency(responsible.totalPending)}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pago</p>
                        <p className="font-medium">{formatCurrency(responsible.totalPaid)}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{responsible.totalPurchases} compras</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nome
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total de compras
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Valor a pagar
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Valor Pago
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {responsibles.map((responsible) => (
                    <tr key={responsible.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{responsible.responsible}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {responsible.totalPurchases}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatCurrency(responsible.totalPending)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {formatCurrency(responsible.totalPaid)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
