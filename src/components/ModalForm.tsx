import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'

type ModalProps = {
  status: boolean
}

const ModalForm = ({ status }: ModalProps) => {
  const { closeModal } = useExpenseContext();

  const handleClose = () => {
    // reset form object?
    closeModal();
  }

  return (
    <Modal show={status} onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Add New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Expense Title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
          <Form.Control type="number" placeholder="Dollar amount" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Comment</Form.Label>
          <Form.Control type="text"  as="textarea" rows={3}placeholder="Details about the expense" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>Cancel</Button>
        <Button variant="primary">Add Expense</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm