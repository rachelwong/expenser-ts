import React, { useState, useEffect } from 'react';
import './App.css';
// import { Select, SelectOption } from './components/Select'
import { ExpenseProvider } from './context/ExpenseContext';
import Expenser from './components/Expenser'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [value, setValue] = useState<SelectOption | undefined>(options[0])
  // const [value2, setValue2] = useState<SelectOption[]>([])

  return (
    <ExpenseProvider>
      <Expenser />
      {/* <Select options={options} onChange={evt => setValue(evt)} value={value} />
      <Select multiple options={options} onChange={evt=> setValue2(evt)} value={ value2 } /> */}
    </ExpenseProvider>
  );
}

export default App;
