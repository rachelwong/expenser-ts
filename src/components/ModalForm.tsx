import React, { useState, useReducer } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'
import { IExpenseItem } from '../interfaces/IExpense'

type ModalFormProps = {
  status: boolean
}

const ModalForm = ({ status }: ModalFormProps) => {
  const { closeModal, expenseItems, addExpenseItem } = useExpenseContext();
  const newId = Number(expenseItems.length) + 1
  const initialState = { id: newId, name: '', amount: 0, category: [], comment: '', date: ''}
  const [state, updateState] = useReducer(
    (state, updates) => ({ ...state, ...updates, id: newId }),
    initialState
  );

  const handleClose = () => {
    // reset form object?
    closeModal();
    updateState(initialState)
  }

  const handleSubmit = () => {
    addExpenseItem(state)
    handleClose();
  }

  return (
    <Modal centered show={ status } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Add New Expense {JSON.stringify(state) }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="expenseName">
            <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Expense Title" onChange={(evt) => updateState({ name: evt.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseAmount">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Dollar amount"
              onChange={(evt) => updateState({ amount: parseFloat(evt.target.value) })} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='expenseDate'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(evt) => updateState({ date: evt.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseDetail">
            <Form.Label>Comment</Form.Label>
          <Form.Control type="text"  as="textarea" rows={3} placeholder="Details about the expense" onChange={(evt) => updateState({ comment: evt.target.value })}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>Cancel</Button>
        <Button variant="primary" onClick={ handleSubmit }>+ Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm