import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

import styles from './page.module.css'
import { Header } from './components/header'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.wrapper}>
        <div className={styles.copy}>
          <h2>
            Para você que compartilha seu cartão de crédito e sempre precisa
            calcular os valores de cada pessoa, temos a solução ideal para
            facilitar sua vida! 🚀
          </h2>
          <Link href={'/dashboard'}>
            <button className="flex px-4 py-2 rounded-xl text-white">
              Login
              <IconArrowRight />
            </button>
          </Link>
        </div>
        <div className={styles.containerImage}>
          <Image
            src={'/invoice-bro.svg'}
            width={800}
            height={800}
            alt="Image"
          />
        </div>
      </section>
    </main>
  )
}
