import React, { useEffect } from 'react'
import { useExpenseContext } from '../context/ExpenseContext'
import baseExpenses from '../data/baseExpenses.json'
import { Stack, Row, Col, Button, Container } from 'react-bootstrap'

const Expenser = () => {
  const { expenseItems, setExpenseItems, monthCap, setMaxExpenses, openModal } = useExpenseContext();
  useEffect(() => {
    if (!expenseItems || !expenseItems.length) setExpenseItems(baseExpenses)
    if (!monthCap) setMaxExpenses(100)
  })
  return (
    <Container>
      <Stack>
        <Row>
          <Col>
            <h3>Monthly Cap ${monthCap}</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={openModal}>+ New</Button>
          </Col>
        </Row>
        {!expenseItems.length && (
          <Row className="d-flex justify-content-center align-items-center">
            <h3>No expenses recorded</h3>
          </Row>
        )}
        {expenseItems.length && (
          <p>{JSON.stringify(expenseItems)}</p>
        )}
      </Stack>
    </Container>
  )
}

export default Expenser