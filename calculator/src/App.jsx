import { useState } from 'react';
import './App.css'


function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState(null)

  const buttonArr = [ "AC", "clr", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "null", 0, ".", "=" ]

  

  const clearScr = () => {
    setExpression('')
    setResult(null)
  }

  const backSpace = () => {
    setExpression(prev =>  prev.slice(0, -1))
  }

  const handleInput = (value) => {
    if (value !== "null") {
      setExpression(prev => prev + value)
    }
  }


  const calculate = () => {
    let operation = ''
    for(let i = 0; i< expression.length; i++) {
      const op = expression[i]
      if(["+", "-", "*", "/", "%"].includes(op)){
        operation = op
      } else {
        setResult("Invalid expression")
      }
    }
    const n1 = +expression.split(`${operation}`)[0]
    const n2 = +expression.split(`${operation}`)[1]

    if (operation === "+") setResult(n1 + n2)
    if (operation === "-") setResult(n1 - n2)
    if (operation === "*") setResult(n1 * n2)
    if (operation === "/") {
      if(n2 !== 0){
        setResult((n1 / n2).toFixed(2))
      }else {
        setResult("Error")
      }
    }
    if (operation === "%") setResult((n1 * (n2 / 100)).toFixed(2))
  }

  return (
    <div className='container'>
      <div className='screen'>
        {expression}
        {result && <div>={result}</div>}
      </div>
      <div className='button-container'>
        {
          buttonArr.map(elem => (
          <button
          key={elem}
          onClick={elem === "AC"? clearScr : elem === "clr" ? backSpace : elem === "=" ? calculate : () => {handleInput(elem.toString())} }
          className='keys'>{elem}</button>))
        }
      </div>
    </div>
  )
}

export default App
