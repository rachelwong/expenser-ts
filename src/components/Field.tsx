import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './field.module.css'

type FieldProps = {
  model: string | number
  type: string
  editValue: (...args: any[]) => void
}

const Field = ({ model, type, editValue }: FieldProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [fieldValue, setFieldValue] = useState<string|number>(0);

  const handleSubmit = () => {
    type === 'text' ? editValue(fieldValue) : editValue(Number(fieldValue))
    setEditMode(false)
  }

  return (
    <div className="position-relative d-block">
      {editMode ? (
        <Form.Group className="d-flex justify-content-start w-100 align-items-center">
          <Form.Control
            type={type.toString()}
            value={fieldValue}
            onChange={(evt) => setFieldValue(evt.target.value)} />
          <Button size="sm" variant="info" onClick={handleSubmit}>&#x2713;</Button>
          <Button size="sm" variant="info" onClick={() => setEditMode(false)}>&times;</Button>
        </Form.Group>
      ) : (
          <Button
            size="sm"
            className={`${styles['field-btn']} w-100 h-100 d-block`}
            onClick={() => setEditMode(true)}>
            {type === 'text' ? model : `$${model}`}
          </Button>
      )}
    </div>
  )
}

export default Field