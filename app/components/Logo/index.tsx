import Link from 'next/link'
import styles from './logo.module.css'

export function Logo() {
  return (
    <Link href={'/'} className={styles.logo}>
      <h1 className={styles.logo__text}>CardControl</h1>
    </Link>
  )
}
