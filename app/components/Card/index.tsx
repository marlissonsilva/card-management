import styles from './card.module.css'
export function Card(props: any) {
  const {
    amount,
    description,
    responsible,
    dateOfPurchase,
    installments,
    status
  } = props.purchases

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <p className={styles.amount}>{formatCurrency(amount)}</p>
        {status ? (
          <input type="checkbox" checked={status} className={styles.checkbox} />
        ) : (
          <input type="checkbox" className={styles.checkbox} />
        )}
      </div>
      <h2 className={styles.responsible}>{responsible}</h2>
    </div>
  )
}
