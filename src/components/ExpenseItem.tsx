import React from 'react'
import { IExpenseItem } from '../interfaces/IExpense'
import { Row, Col, Stack, Badge, Button } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'

type ExpenseItemProps = {
  expenseItem: IExpenseItem
}

const ExpenseItem = ({ expenseItem }: ExpenseItemProps) => {
  const { removeExpenseItem } = useExpenseContext();
  const { id, name, comment, date, amount, category } = expenseItem

  return (
    <Row className='w-100 p-2'>
      <Col xs={2} className="text-left d-flex align-items-center text-wrap">{ name }</Col>
      <Col xs={3} className="text-left d-flex align-items-center text-wrap">{ comment || 'No details' }</Col>
      <Col xs={2} className="text-left d-flex align-items-center">
        {category.length ?
          <Stack direction="horizontal" gap={2}>
            { category.map((cat, catIndex) => (
              <Badge bg='secondary' key={ catIndex }>{ cat.label }</Badge>
            )) }
          </Stack> : <p>Not Categorised</p>
        }
      </Col>
      <Col xs={2} className="text-left d-flex align-items-center">{ date }</Col>
      <Col xs={2} className="text-left d-flex align-items-center">${(amount).toFixed(2)}</Col>
      <Col xs={1} className="text-center d-flex align-items-center">
        <Button variant="danger" size="sm" onClick={ () => removeExpenseItem(id)}>&times;</Button>
      </Col>
    </Row>
  )
}

export default ExpenseItem