import React, { useEffect } from 'react'
import { useExpenseContext } from '../context/ExpenseContext'
import baseExpenses from '../data/baseExpenses.json'
import { Stack, Row, Col, Button, Container } from 'react-bootstrap'
import ExpenseItem from './ExpenseItem'

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
          <>
            <Row className='w-100'>
              <Col xs={ 2} className="text-center">Name</Col>
              <Col xs={ 4} className="text-center">Details</Col>
              <Col xs={ 2} className="text-center">Category</Col>
              <Col xs={ 2} className="text-center">Date</Col>
              <Col xs={2 } className="text-center">Amount</Col>
            </Row>
            {expenseItems.map((item) => (
              <ExpenseItem expenseItem={item} key={ item.id } />
            ))}
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Expenser