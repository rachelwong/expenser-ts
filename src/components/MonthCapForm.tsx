import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'

type MonthCapFormProps = {
  status: boolean
  setStatus: (value: boolean) => void
}

const MonthCapForm = ({ status, setStatus }: MonthCapFormProps) => {
  const { setMaxExpenses } = useExpenseContext()
  const [amount, setAmount] = useState<number>(0)

  const handleSubmit = () => {
    setMaxExpenses(amount)
    setStatus(false)
  }
  const handleClose = () => {
    setMaxExpenses(1000)
    setStatus(false);
  }

  return (
    <Modal centered show={status} onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Welcome</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='monthInput'>
            <Form.Label>Amount ($)</Form.Label>
            <p className="m-0 text-caption">This will set to $1000 if no amount is provided. You can change this later.</p>
            <Form.Control type="number" placeholder="Set Amount" onChange={(evt) => setAmount(parseInt(evt.target.value))} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={ handleSubmit }>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MonthCapForm