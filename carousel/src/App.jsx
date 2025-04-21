import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { useEffect } from 'react'

function App() {
  const [images, setImages] = useState([])
  const [activeImg, setActiveImg] = useState(0)

  useEffect(()=> {
    if (images.length === 0) return
    const interval = setInterval(() => {
      setActiveImg(prev => {
        if(prev === images.length -1) {
          return 0
        }else {
          return prev + 1
        }
      })
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [images])

  const setImageArray = (images) => {
    setImages(images)
    setActiveImg(0)
  }
  const prevClick = () => {
    if(activeImg > 0) {
      setActiveImg(prev => prev - 1)
    }
  }

  const nextClick = () => {
    if(activeImg < images.length -1) {
      setActiveImg(prev => prev + 1)
    }
  }

  console.log(images)

  return (
    <div>
      <Search setImageArray={setImageArray} />
      {images.length > 0 &&
        <div className='image-container'>
          <button 
            className='prev-button'
            disabled={activeImg < 1} 
            onClick={prevClick}
          >⬅️</button>
          <img className='image' src={images[activeImg]?.urls?.regular} />
          <button 
            className='next-button'
            disabled={activeImg >= images.length - 1}
            onClick={nextClick}
          >➡️</button>
        </div>
      }
    </div>
  )
}

export default App
