export interface Purchase {
  responsible: string
  amount: number
  description: string
  status?: boolean
  installments: number
  dateOfPurchase: Date
}
