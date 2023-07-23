import React, { useState, useReducer, useEffect, ChangeEvent } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'
import { IExpenseItem } from '../interfaces/IExpense'
import { SelectOption } from './Select'

type ModalFormProps = {
  status: boolean
  selectedItem: IExpenseItem | null
}

const ModalForm = ({ status, selectedItem }: ModalFormProps) => {
  const { closeModal, expenseItems, addExpenseItem, clearSelectedItem, updateExpense } = useExpenseContext();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  let initialState = { id: Number(expenseItems.length) + 1, name: '', amount: 0, category: [] as SelectOption[], comment: '', date: ''}

  const [formValues, setFormValues] = useReducer((currVal, newVal) => ({...currVal, ...newVal}), initialState)

  const { name, amount, category, comment, date } = formValues

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = evt.target
    setFormValues({[name]: type === 'number' ? Number(value) : value })
  }

  const handleClose = () => {
    closeModal();
    clearSelectedItem();
    setIsEdit(false)
  }

  const handleSubmit = () => {
    if (isEdit) {
      updateExpense(formValues)
    } else {
      addExpenseItem(formValues)
    }
    handleClose();
    setIsEdit(false)
    clearSelectedItem();
  }

  useEffect(() => {
    if (selectedItem && !!Object.keys(selectedItem).length) {
      setIsEdit(true)
      setFormValues(selectedItem)
    }
  }, [selectedItem])

  return (
    <Modal centered show={status} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit' : 'Add New'} Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="expenseName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Expense Title"
              value={ name }
              onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseAmount">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="Dollar amount"
              value={ amount }
              onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='expenseDate'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={ date }
              onChange={handleFormChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseDetail">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              name="comment"
              value={ comment }
              placeholder="Details about the expense"
              onChange={handleFormChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>{isEdit ? '> Edit' : '+ Add'}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm