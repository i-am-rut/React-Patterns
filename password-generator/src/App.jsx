import { useEffect, useState } from 'react'
import Interative from './Interactive'
import './App.css'

function App() {
  const [config, setConfig] = useState(null)
  const [passwords, setPasswords] = useState(null)

  const lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  const upper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  const number = ['0','1','2','3','4','5','6','7','8','9']

  const char = ['!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',';',':','\'','"','<','>','.',',','?','/','|','`','~']
  const lookup = {lower, upper, number, char}
  

  useEffect(() => {
    if(!config) return
    
    combinePasswords(config)
    
  }, [config])


  const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)] 
  }

  const generateFromConfig = (config) => {
    const arr = []
    for(let key in config) {
      if(config[key] === true){
        arr.push(key)
      }
    }
    return [config.amount, ...arr]
  }

  const generatePasword = (cfg) => {
    const configArr = generateFromConfig(cfg)
    const configArrWithoutLength = configArr.filter(elem => elem.length > 2)
    const guaranteedChars = configArrWithoutLength.map(key => {
      const arr = lookup[key]
      return getRandomElement(arr)
    })
    const arraysCombined = configArrWithoutLength.flatMap(key => lookup[key])
    const remainingLength = configArr[0] - guaranteedChars.length
    const remainingArray = []
    for(let i = 0; i < remainingLength; i++) {
      remainingArray.push(getRandomElement(arraysCombined))
    }
    const finalArray = [...guaranteedChars, ...remainingArray].sort(() => Math.random() - 0.5)
    return finalArray.join('')
  }

  const combinePasswords = (cnfg) => {
    const generated = []
    for(let i = 0; i < 3; i++) {
      generated.push(generatePasword(cnfg))
    }
    setPasswords(generated)
  }

  console.log(passwords)

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
