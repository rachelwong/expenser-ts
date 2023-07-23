import React, { useEffect, useState, ChangeEvent } from 'react'
import { useExpenseContext } from '../context/ExpenseContext'
import baseExpenses from '../data/baseExpenses.json'
import { Stack, Row, Col, Button, Container, Form } from 'react-bootstrap'
import ExpenseItem from './ExpenseItem'
import MonthCapForm from './MonthCapForm'
import Field from './Field'
import { debounce } from "lodash"
import { IExpenseItem } from '../interfaces/IExpense'

const Expenser = () => {
  const { expenseItems, setExpenseItems, monthCap, setMaxExpenses, openModal, clearExpenses, getTotalExpenses } = useExpenseContext();
  const [monthCapFormStatus, setMonthCapFormStatus] = useState<boolean>(false)
  const [showToolbar, setShowToolbar] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [sortAsc, setSortAsc] = useState<boolean>(false)
  const [filteredExpenses, setFilteredExpenses] = useState<IExpenseItem[]>(expenseItems)

  const handleQuery = (evt: ChangeEvent<HTMLInputElement>): void => {
    setQuery((evt.target.value).trim().toLowerCase())
  }
  const debouncedQuery = debounce(handleQuery, 500);

  useEffect(() => {
    if (!expenseItems || !expenseItems.length) setExpenseItems(baseExpenses)
    if (!monthCap) setMonthCapFormStatus(true)
    if (query) {
      setFilteredExpenses((prev) => {
        return expenseItems.filter(item =>
          item.name.toLowerCase().search(query) > -1 || item.comment.toLowerCase().search(query) > -1)
      })
    } else {
      setFilteredExpenses([...expenseItems])
    }
    setFilteredExpenses((prev) => {
      if (sortAsc) {
        return prev.sort((a, b) => {
          return (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0;
        })
      } else {
        return prev.sort((a, b) => {
          return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
        })
      }
    })
  }, [expenseItems, setExpenseItems, monthCap, query, sortAsc])

  return (
    <Container>
      <MonthCapForm status={monthCapFormStatus} setStatus={setMonthCapFormStatus} />
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
            <Button variant="outline-info" onClick={() => setShowToolbar(!showToolbar)}>
              {showToolbar && 'Hide '}Options
            </Button>
            <Button variant="secondary" onClick={ clearExpenses}>Clear All</Button>
            <Button variant="primary" onClick={openModal}>+ New</Button>
          </Col>
        </Row>
        {showToolbar &&
          <Stack direction="horizontal">
            <Button onClick={ () => setSortAsc(!sortAsc) }>Sort { sortAsc ? 'A-Z' : 'Z-A' }</Button>
            <Form>
              <Form.Group>
                <Form.Control className="mx-1" placeholder="Search Expenses" type='text' name="search" onChange={debouncedQuery} />
              </Form.Group>
            </Form>
        </Stack>}
        {!expenseItems.length && (
          <Row className="d-flex justify-content-center align-items-center">
            <h3>{ !query ? 'No expenses recorded' : `No results for ${query}`}</h3>
          </Row>
        )}
        {filteredExpenses.length && (
          <>
            <Row className='w-100'>
              <Col xs={ 2} className="text-center">Name</Col>
              <Col xs={ 3} className="text-center">Details</Col>
              <Col xs={ 2} className="text-center">Category</Col>
              <Col xs={ 2} className="text-center">Date</Col>
              <Col xs={2} className="text-center">Amount</Col>
              <Col xs={1 } className="text-center">Actions</Col>
            </Row>
            {filteredExpenses.map((item) => (
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