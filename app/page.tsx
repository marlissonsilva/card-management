import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

import styles from './page.module.css'
import { Button } from '@/app/ui/button'
import { Header } from './components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.copy}>
          <h2>
            Para você que compartilha seu cartão de crédito e sempre precisa
            calcular os valores de cada pessoa, temos a solução ideal para
            facilitar sua vida! 🚀
          </h2>
          <Link href={'/dashboard'}>
            <Button size={'lg'}>
              Login
              <IconArrowRight />
            </Button>
          </Link>
        </div>
        <div className={styles.containerImage}>
          <Image
            src={'/Invoice-bro.svg'}
            width={800}
            height={800}
            alt="Image"
          />
        </div>
      </main>
    </>
  )
}
