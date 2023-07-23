import React, { useState, useReducer, useEffect, ChangeEvent } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'
import { IExpenseItem, IExpenseFormValues } from '../interfaces/IExpense'
import { SelectOption } from './Select'
import { useForm, SubmitHandler } from "react-hook-form"

type ModalFormProps = {
  status: boolean
  selectedItem: IExpenseItem | null
}

const ModalForm = ({ status, selectedItem }: ModalFormProps) => {
  const { closeModal, expenseItems, addExpenseItem, clearSelectedItem, updateExpense } = useExpenseContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IExpenseFormValues>()

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const initialState = { id: Number(expenseItems.length) + 1, name: '', amount: 0, category: [] as SelectOption[], comment: '', date: ''}

  const [formValues, setFormValues] = useReducer((currVal, newVal) => ({...currVal, ...newVal}), initialState)

  const { name, amount, category, comment, date } = formValues

  const onSubmit: SubmitHandler<IExpenseFormValues> = (data) => {
    if (isEdit) {
      updateExpense(formValues)
    } else {
      addExpenseItem(formValues)
    }
    handleClose();
    setIsEdit(false)
    clearSelectedItem();
  }

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = evt.target
    setFormValues({[name]: type === 'number' ? Number(value) : value })
  }

  const handleClose = () => {
    closeModal();
    clearSelectedItem();
    setIsEdit(false)
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
              placeholder="Expense Title"
              value={name}
              {...register("name", { required: true })}
              onChange={handleFormChange} />
            {errors.name && <span className="text-danger error-text">Name is required</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseAmount">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Dollar amount"
              {...register("amount", { required: true, min: 0.01 })}
              value={ amount }
              onChange={handleFormChange} />
            {errors.amount && <span className="text-danger error-text">Amount must be greater than 0.01</span>}
          </Form.Group>
          <Form.Group className='mb-3' controlId='expenseDate'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register("date", { required: true })}
              value={ date }
              onChange={handleFormChange} />
          {errors.date && <span className="text-danger error-text">Date is required</span>}
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
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>{isEdit ? '> Edit' : '+ Add'}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm