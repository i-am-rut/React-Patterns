import { useState } from "react"

const Interactive = ({setConfig}) => {
    const [format, setFormat] = useState({
        amount: "",
        lower: false,
        upper: false,
        number: false,
        char: false
    })
    const [error, setError] = useState(null)

    const validate = (format) => {
        let amountErr = null
        let checkedErr = null
        const {amount, lower, upper, number, char} = format
        if(amount === "") {
            amountErr = "Select the length of password first."
        }
        if(!lower && !upper && !number && !char) {
            checkedErr = "Check atleast one of the fields above."
        }
        return [amountErr, checkedErr]
    }

    const handleGenerate = (e) => {
        e.preventDefault()
        const Errors = validate(format)

        if (Errors[0] || Errors[1]) {
            setError([Errors[0], Errors[1]])
            return
        } else {
            setConfig(format)
            setError(null)
        }

    }
    

    return (
        <div className="user-action-container">
            <form>
                <div className="config-container">
                    <select value={format.amount} onChange={(e => setFormat(prev => ({...prev, amount: e.target.value})))}>
                        <option value="">Select password length</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                    </select>
                    <div className="checkbox-container">
                        <div className="flex">
                            <label htmlFor="lower">Lowercase</label>
                            <input 
                                value={format.lower}
                                onChange={e => (setFormat(prev => ({...prev, lower: e.target.checked})))}
                                id="lower" type="checkbox" />
                        </div>
                        <div className="flex">
                            <label htmlFor="upper">Uppercase</label>
                            <input
                                value={format.upper}
                                onChange={e => (setFormat(prev => ({...prev, upper: e.target.checked})))} 
                                id="upper" type="checkbox" />
                        </div>
                        <div className="flex">
                            <label htmlFor="number">Numbers</label>
                            <input 
                                value={format.number}
                                onChange={e => (setFormat(prev => ({...prev, number: e.target.checked})))}
                                id="number" type="checkbox" />
                        </div>
                        <div className="flex">
                            <label htmlFor="char">Special character</label>
                            <input 
                                value={format.char}
                                onChange={e => (setFormat(prev => ({...prev, char: e.target.checked})))}
                                id="char" type="checkbox" />
                        </div>
                    </div>
                </div>
                {error && 
                    <div className="config-error">
                        {
                            error.map((err, index) => (
                                err && <p key={index} >{err}</p>
                            ))
                        }
                    </div>
                }
                <button 
                    className="generate-button"
                    onClick={(e) => handleGenerate(e)}
                >Generate passwords</button>
            </form>
        </div>
    )
}

export default Interactive