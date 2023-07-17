import React, { useState } from 'react';
import './App.css';
import { Select, SelectOption } from './components/Select'

const options = [
  {label: 'First', value: 1 },
  {label: 'second', value: 2 },
  {label: 'thirsd', value: 3 },
  {label: 'fourth', value: 4 },
  {label: 'fifth', value: 5 },
]

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])
  const [value2, setValue2] = useState<SelectOption[]>([])

  return (
    <div className="App">
      <Select options={options} onChange={evt => setValue(evt)} value={value} />
      <Select multiple options={options} onChange={evt=> setValue2(evt)} value={ value2 } />
    </div>
  );
}

export default App;
