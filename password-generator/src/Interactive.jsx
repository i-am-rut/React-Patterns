
const Interative = ({setConfig}) => {
    return (
        <div className="user-action-container">
            <form>
                <select>
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
                        <input id="lower" type="checkbox" />
                    </div>
                    <div className="flex">
                        <label htmlFor="upper">Uppercase</label>
                        <input id="upper" type="checkbox" />
                    </div>
                    <div className="flex">
                        <label htmlFor="number">Numbers</label>
                        <input id="number" type="checkbox" />
                    </div>
                    <div className="flex">
                        <label htmlFor="char">Special character</label>
                        <input id="char" type="checkbox" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Interative