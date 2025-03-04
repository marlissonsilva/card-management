'use client'
import { IconPlus } from '@tabler/icons-react'

import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/button'

export default function Dashboard() {
  const route = useRouter()
  return (
    <main className={styles.main}>
      <nav>
        <menu className={styles.menu}>
          <Button onClick={() => route.push('/dashboard/register')}>
            <IconPlus /> Adicionar
          </Button>
          <Button>
            <IconPlus /> Resumo
          </Button>
          <Button>
            <IconPlus /> Compras
          </Button>
        </menu>
      </nav>
      <section className={styles.content}></section>
    </main>
  )
}
