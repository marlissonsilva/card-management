import { IconHome, IconInvoice, IconUsersGroup } from '@tabler/icons-react'
import { Button } from '../Button'
import styles from './menu.module.css'
export function Menu() {
  return (
    <nav className={styles.nav}>
      <menu className={styles.menu}>
        <Button url="/dashboard">
          <IconHome /> Home
        </Button>
        <Button url="/dashboard/purchase">
          <IconInvoice /> Compras
        </Button>
        <Button url="/dashboard/responsible">
          <IconUsersGroup /> Responsáveis
        </Button>
      </menu>
    </nav>
  )
}
