import { useState, useEffect } from 'react'

// initialValue can be a value or a function of a generic type
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // invoke checking localstorage one time not every time the component re-renders
  // get value from localStorage or get the value we passed in
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue) return JSON.parse(jsonValue)
    if (!jsonValue) {
      if (typeof initialValue === 'function') {
        // typescript that initialValue is of a function type
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    }
  })

  // set the value backinto localstorage and runs anytime the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])
  // tell typescript what the types in that array always going to be
  return [value, setValue] as [T, typeof setValue]
}