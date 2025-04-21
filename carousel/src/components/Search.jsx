import { useState } from "react"

const Search = ({setImageArray}) => {
    const [catagory, setCatagory] = useState("")
    const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    
    const handleSearch = async () => {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${catagory}&per_page=5&client_id=${ACCESS_KEY}`)

        const json = await res.json()

        setImageArray(json.results)
    }

    return (
        <div className="search-container">
            <input 
                className="search-input" 
                value={catagory}
                type="text" 
                onChange={(e) => setCatagory(e.target.value)}
                placeholder="Enter image catagory"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default Search