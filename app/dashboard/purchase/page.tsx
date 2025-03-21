import { Card } from '@/app/components/Card'
import { listPurchase } from '@/app/lib/query'
import styles from './page.module.css'
import { Button } from '@/app/components/Button'
import { IconPlus } from '@tabler/icons-react'
import { Input } from '@/app/ui/input'

export default async function Page() {
  const purchases = await listPurchase()
  return (
    <main>
      <div className={styles.wrapper}>
        <Input placeholder="Buscar compra" />
        <Button url="/dashboard/purchase/register" color="bg-violet-500">
          <IconPlus /> Adicionar
        </Button>
      </div>
      <section className={styles.container}>
        {purchases.map((purchase) => (
          <Card key={purchase.id} purchases={purchase} />
        ))}
      </section>
    </main>
  )
}
