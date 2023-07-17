import {useLocalStorage} from '../hooks/useLocalStorage'
import { useContext, createContext, ReactNode, useState } from 'react'
import { SelectOption } from '../components/Select'

type ExpenseContextProviderProps = {
  children: ReactNode
}

type ExpenseItem = {
  id: number
  name: string
  amount: number
  date: Date
  comment: string
  category: SelectOption[]
}

interface ExpenseContextProp {
  expenseItems: ExpenseItem[]
  monthCap: number
  clearExpenses: () => void
  addExpenseItem: (item: ExpenseItem) => void
  removeExpenseItem: (id: number) => void
  getTotalExpenses: () => number
}

const ExpenserContext = createContext({} as ExpenseContextProp)

export function useExpenseContext() { return useContext(ExpenserContext) }

export function ExpenseProvider ({ children }: ExpenseContextProviderProps) {
    const [expenseItems, setExpenseItems] = useLocalStorage<ExpenseItem[]>("expenses", [])

    const clearExpenses = (): void => {
      setExpenseItems([])
    }

    const removeExpenseItem = (id: number): void => {
      setExpenseItems(prev => prev.filter(item => item.id !== id))
    }

    const getTotalExpenses = (): number => {
      if (!expenseItems.length) return 0
      return expenseItems.reduce((acc, cur) => {
        acc += cur.amount
        return acc
      }, 0)
    }

    const addExpenseItem = (newItem: ExpenseItem): void => {
      setExpenseItems((prev) => {
        if (prev.find(item => item.id === newItem.id)) {
          return prev.map(item => {
            if (item.id === newItem.id) {
              return { ...newItem }
            } else {
              return item
            }
          })
        } else {
          return [...prev, newItem]
        }
      })
    }
 }