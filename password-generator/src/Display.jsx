import { TbRotateClockwise } from "react-icons/tb"
import { LuCopy } from "react-icons/lu"


const Display = ({config, regenerate, passwords, setShow}) => {
    

    const handleCopyClick = async(w) => {
        try {
            await navigator.clipboard.writeText(w)
            setShow(true)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }


    const displayPasswordElement = passwords?.map((word, i) => (
        <div key={i} className="display-pass-container">
            <p className="password-text">{word}</p>
            <button 
                id={i} 
                className="copy-clipboard-button"
                onClick={() => handleCopyClick(word)}
            ><LuCopy /></button>
        </div>
    ))
        

    return (
        <div className="display-container">
            <div className="background-color">
                <h2>Passwords</h2>
                <div className="password-display-grid">
                    {displayPasswordElement}
                </div>
            </div>
            <button 
                onClick={() => regenerate(config)}
                className="regenerate-button"><TbRotateClockwise className="regen-icon" 
            /> Regenerate passwords</button>

        </div>
    )
}

export default Display