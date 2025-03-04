import { Logo } from "../Logo"
import styles from "./header.module.css"
import { HeaderProps } from "./types"

export function Header({ children }: HeaderProps) {
  return (
    <section className={styles.header}>
      <Logo />
      {children}
    </section>
  )
}
