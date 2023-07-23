import React, { useEffect, useState } from 'react'
import { useExpenseContext } from '../context/ExpenseContext'
import baseExpenses from '../data/baseExpenses.json'
import { Stack, Row, Col, Button, Container } from 'react-bootstrap'
import ExpenseItem from './ExpenseItem'
import MonthCapForm from './MonthCapForm'
import Field from './Field'

const Expenser = () => {
  const { expenseItems, setExpenseItems, monthCap, setMaxExpenses, openModal, clearExpenses, getTotalExpenses } = useExpenseContext();
  const [monthCapFormStatus, setMonthCapFormStatus] = useState<boolean>(false)

  useEffect(() => {
    if (!expenseItems || !expenseItems.length) setExpenseItems(baseExpenses)
    if (!monthCap) setMonthCapFormStatus(true)
  }, [expenseItems, setExpenseItems, monthCap])

  return (
    <Container>
      <MonthCapForm status={monthCapFormStatus} setStatus={ setMonthCapFormStatus } />
      <Stack>
        <Row>
          <Col>
            <h3 className="d-flex justify-content-start align-items-center">Monthly Cap
              <Field model={monthCap} editValue={(e) => setMaxExpenses(e)} type={'number'} />
            </h3>
          </Col>
          <Col>
            <h3 className="d-flex justify-content-start align-items-center">Balance
              {monthCap - getTotalExpenses()}
            </h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="secondary" onClick={ clearExpenses}>Clear All</Button>
            <Button variant="primary" onClick={openModal}>+ New</Button>
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
              <Col xs={ 3} className="text-center">Details</Col>
              <Col xs={ 2} className="text-center">Category</Col>
              <Col xs={ 2} className="text-center">Date</Col>
              <Col xs={2} className="text-center">Amount</Col>
              <Col xs={1 } className="text-center">Actions</Col>
            </Row>
            {expenseItems.map((item) => (
              <ExpenseItem expenseItem={item} key={ item.id } />
            ))}
            <Row className='w-100'>
              <Col xs={ 2} className="text-center"></Col>
              <Col xs={ 3} className="text-center"></Col>
              <Col xs={ 2} className="text-center"></Col>
              <Col xs={ 2} className="text-center"></Col>
              <Col xs={2} className="text-left">
                <span className="text-uppercase">Sum</span>
                ${getTotalExpenses()}
              </Col>
              <Col xs={1 } className="text-center"></Col>
            </Row>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Expenser