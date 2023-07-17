import React, { useState,useEffect } from 'react'
import styles from './select.module.css';


export type SelectOption = {
  label: string
  value: string | number
}

export type MultiSelectProps = {
  multiple: true // default to false
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

export type SingleSelectProps = {
  multiple?: false // default to false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export type SelectProps = {
  options: SelectOption[]
  // onChange: (value: SelectOption | undefined) => void
  // value?: SelectOption
} & (SingleSelectProps | MultiSelectProps)

export function Select ({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  const selectOption = (option: SelectOption): void => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(item => item !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value)  onChange(option)
    }
  }

  const isOptionSelected = (option: SelectOption): boolean => {
    return multiple ? value.includes(option) : option === value;
  }
  // every single time we open the select, reset to the first option
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  },[isOpen])

  return (
    // tabIndex makes it focusable
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className={styles.container}>
      <span className={styles.value}>
        {multiple ? (value.map((item, index) => (
          <button key={index}
            className={ styles['option-badge']}
            onClick={e => {
            e.stopPropagation()
            selectOption  (item)
          }}>{item.label}
            <span className={styles["remove-btn"]}>
              &times;
            </span>
          </button>
        ))) : value?.label }</span>
      <button
        onClick={e => {
        e.stopPropagation()
        clearOptions()
        }}
        className={styles['clear-btn']}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((item, index) => (
          <li
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={(e) => {
              e.stopPropagation()
              selectOption(item)
              setIsOpen(false)
            }}
            key={index}
            className={`${styles.option}
            ${isOptionSelected(item) ? styles.selected : ''}
            ${index === highlightedIndex ? styles.highlighted : ''}`}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

