import { useState } from 'react'
import Interative from './Interactive'
import './App.css'

function App() {
  const [config, setConfig] = useState(null)

  return (
    <div>
      <div className='title'>Password generator</div>
      <div className='user-cta-container'>
        <p className='style'>Password configuration</p>
        <Interative setConfig={setConfig} />
      </div>
    </div>
  )
}

export default App
