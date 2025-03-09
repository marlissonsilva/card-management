import { Header } from '../components/Header'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import styles from './page.module.css'

export default function DashoboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={styles.main}>
      <Header>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            width={40}
            className="rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Header>
      <main>{children}</main>
    </main>
  )
}
