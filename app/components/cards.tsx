import {
  IconBuildingBank,
  IconClock,
  IconInbox,
  IconUsersGroup
} from '@tabler/icons-react'
import { fetchCardData } from '../lib/actions'
import formatCurrency from '../lib/utils'

const iconMap = {
  collected: IconBuildingBank,
  responsibles: IconUsersGroup,
  pending: IconClock,
  purchases: IconInbox
}

export default async function CardWrapper() {
  const data = await fetchCardData()
  if (!data) return null
  const { totalAmount, totalPending, totalPurchases, totalResponsible } = data
  return (
    <>
      <Card
        title="Total"
        value={formatCurrency(totalAmount)}
        type="collected"
      />
      <Card
        title="Pendente"
        value={formatCurrency(totalPending)}
        type="pending"
      />
      <Card title="Total de compras" value={totalPurchases} type="purchases" />
      <Card
        title="Responśaveis"
        value={totalResponsible.length}
        type="responsibles"
      />
    </>
  )
}

export function Card({
  title,
  value,
  type
}: {
  title: string
  value: number | string
  type: 'purchases' | 'responsibles' | 'pending' | 'collected'
}) {
  const Icon = iconMap[type]

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  )
}
