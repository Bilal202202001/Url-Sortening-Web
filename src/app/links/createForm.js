'use client'
import { useState } from "react"

export default function LinksCreateForm() {

    const [result, updateResults] = useState(null)

    const handleForm = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        // console.log(data);
        const JsonData = JSON.stringify(data)
        // console.log(JsonData) 
        const endpoint = '/api/links/'
        const options = {
            method: "Post",
            handle: {
                "Content-Type": "application/json"
            },
            body: JsonData
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        updateResults(result)
        // console.log(result);

    }

    return <>
        <form onSubmit={handleForm}>
            <input type="text" defaultValue="https://github.com/Bilal202202001/nextjs-project" name="url" placeholder="Your URL link shorten" />
            <button type="submit">Shorten</button>
        </form>
        <div>
            <h3>Results : {result && JSON.stringify(result)}</h3>
        </div>
    </>

}