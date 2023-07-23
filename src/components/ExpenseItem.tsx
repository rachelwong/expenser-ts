import React from 'react'
import { IExpenseItem } from '../interfaces/IExpense'
import { Row, Col, Stack, Badge, Button } from 'react-bootstrap'
import { useExpenseContext } from '../context/ExpenseContext'
import Field from './Field'

type ExpenseItemProps = {
  expenseItem: IExpenseItem
}

const ExpenseItem = ({ expenseItem }: ExpenseItemProps) => {
  const { removeExpenseItem, getItem, openModal, updateValue } = useExpenseContext();
  const { id, name, comment, date, amount, category } = expenseItem

  const handleEdit = (id: number) => {
    getItem(id);
    openModal();
  }

  return (
    <Row className='w-100 p-2'>
      <Col xs={2} className="text-left d-flex align-items-center text-wrap">
        <Field model={name} editValue={(val) => updateValue(id, 'name', val)} type={'text'} />
      </Col>
      <Col xs={3} className="text-left d-flex align-items-center text-wrap">
        <Field model={comment} editValue={(val) => updateValue(id, 'comment', val)} type={'text'} />
      </Col>
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
      <Col xs={2} className="text-left d-flex align-items-center">
        <Field model={amount} editValue={(val) => updateValue(id, 'amount', val)} type={'number'} />
      </Col>
      <Col xs={1} className="text-center d-flex align-items-center">
        <Button className="mx-1" variant="danger" size="sm" onClick={ () => handleEdit(id)}>Edit</Button>
        <Button variant="danger" size="sm" onClick={ () => removeExpenseItem(id)}>&times;</Button>
      </Col>
    </Row>
  )
}

export default ExpenseItem