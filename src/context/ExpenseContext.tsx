import {useLocalStorage} from '../hooks/useLocalStorage'
import { useContext, createContext, ReactNode, useState } from 'react'
import { SelectOption } from '../components/Select'
import ModalForm from '../components/ModalForm'

type ExpenseContextProviderProps = {
  children: ReactNode
}

export type ExpenseItem = {
  id: number
  name: string
  amount: number
  date: string
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
  setMaxExpenses: (amount: number) => void
  setExpenseItems: (items: ExpenseItem[]) => void
  openModal: () => void
  closeModal: () => void
  updateValue: (id: number, key: string, value: string | number | SelectOption[]) => void
}

const ExpenserContext = createContext({} as ExpenseContextProp)

export function useExpenseContext() { return useContext(ExpenserContext) }

export function ExpenseProvider({ children }: ExpenseContextProviderProps) {
    const [expenseItems, setExpenseItems] = useLocalStorage<ExpenseItem[]>("expenses", [])
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [monthCap, setMonthCap] = useLocalStorage<number>("month-cap", 0)

    const openModal = () => { setIsOpen(true) }
    const closeModal = () => { setIsOpen(false) }

    const setMaxExpenses = (amount: number): void => {
      setMonthCap(amount)
    }

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

  const updateValue = (id: number, key: string, value: string | number | SelectOption[]): void => {
      setExpenseItems((prev) => {
        if (prev.find(item => item.id === id)) {
          return prev.map(item => {
            if (item.id === id) {
              return { ...item, [key]: value }
            } else {
              return item
            }
          })
        } else {
          return prev
        }
      })
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
  return <ExpenserContext.Provider value={{
    monthCap,
    expenseItems,
    addExpenseItem,
    getTotalExpenses,
    clearExpenses,
    removeExpenseItem,
    setMaxExpenses,
    setExpenseItems,
    closeModal,
    openModal,
    updateValue
  }}>
    {children}
    <ModalForm status={isOpen} />
    </ExpenserContext.Provider>
 }