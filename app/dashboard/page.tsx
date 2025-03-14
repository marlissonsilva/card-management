import { IconPlus } from '@tabler/icons-react'

import styles from './page.module.css'
import { Button } from '../components/Button'

export default async function Dashboard() {
  return (
    <main className={styles.main}>
      <nav>
        <menu className={styles.menu}>
          <Button url="/dashboard/register">
            <IconPlus /> Adicionar
          </Button>
        </menu>
      </nav>
      <section className={styles.content}></section>
    </main>
  )
}
