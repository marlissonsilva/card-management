import { IconPlus } from '@tabler/icons-react'

import styles from './page.module.css'
import { listPurchases } from '../query/Purchase'
import { Button } from '../components/Button'
import TransactionCard from '../components/Card'

export default async function Dashboard() {
  const purchases = await listPurchases()
  console.log(purchases)

  return (
    <main className={styles.main}>
      <nav>
        <menu className={styles.menu}>
          <Button url="/dashboard/register">
            <IconPlus /> Adicionar
          </Button>
        </menu>
      </nav>
      <section className={styles.content}>
        {purchases &&
          purchases.map((purchase) => (
            <TransactionCard
              key={purchase.id}
              responsible={purchase.responsible}
              amount={purchase.amount}
              description={purchase.description}
              status={purchase.status}
              installments={purchase.installments}
              dateOfPurchase={purchase.dateOfPurchase}
            />
          ))}
      </section>
    </main>
  )
}
