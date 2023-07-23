export type IExpenseItem = {
  id: number
  name: string
  amount: number
  date: string
  comment: string
  category: ISelectOption[]
}

export type IExpenseFormValues = {
  name: string
  amount: number
  date: string
  comment: string
  category: ISelectOption[]
}

export type ISelectOption = {
  label: string
  value: string | number
}