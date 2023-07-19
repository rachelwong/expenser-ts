import React from 'react'
import { IExpenseItem } from '../interfaces/IExpense'
import { Row, Col, Stack, Badge } from 'react-bootstrap'

type ExpenseItemProps = {
  expenseItem: IExpenseItem
}

const ExpenseItem = ({ expenseItem }: ExpenseItemProps) => {
  const { id, name, comment, date, amount, category } = expenseItem

  return (
    <Row className='w-100 p-2'>
      <Col xs={2} className="text-left">{ name }</Col>
      <Col xs={4} className="text-left">{ comment || 'No details' }</Col>
      <Col xs={2} className="text-left">
        {category.length ?
          <Stack direction="horizontal" gap={2}>
            { category.map((cat, catIndex) => (
              <Badge bg='secondary' key={ catIndex }>{ cat.label }</Badge>
            )) }
          </Stack> : <p>Not Categorised</p>
        }
      </Col>
      <Col xs={2} className="text-left">{ date }</Col>
      <Col xs={2} className="text-left">${ (amount).toFixed(2) }</Col>
    </Row>
  )
}

export default ExpenseItem