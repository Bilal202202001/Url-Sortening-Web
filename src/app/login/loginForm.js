'use client'
import { useState } from "react"

export default function LoginForm({ didSubmit }) {

    const [result, updateResults] = useState(null)

    const handleForm = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        // console.log(data);
        const JsonData = JSON.stringify(data)
        // console.log(JsonData) 
        const endpoint = '/api/auth/login'
        const options = {
            method: "Post",
            handle: {
                "Content-Type": "application/json"
            },
            body: JsonData
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        if (response.status === 200) {
            window.location.href = "/"
        }
        updateResults(result)
        if (didSubmit) {
            didSubmit(result)
        }
        // console.log(result);

    }

    return <>
        <form onSubmit={handleForm} className="w-screen h-3/4">
            <div className="flex flex-1 flex-col justify-center lg:px-8">
                <div className=" flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
                <img src='/images/permission.png' alt='no Pic' className=" h-24 w-24 mt-3"/>
                    <h2 className="mt-10 text-center text-2xl font-bold w-30 text-gray-800">
                        LOGIN
                    </h2>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
                    <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                        User Name
                    </label>
                    <input type="text" defaultValue="" id="username" name="userName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 mt-3" />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <input type="password" defaultValue="" id="password" name="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 mt-3" />
                </div>
                <div className="mt-5">
                    <button
                        type="submit"
                        className="flex m-auto justify-center rounded-md bg-gray-800 hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-700 w-60"
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </form>
        <div>
            <h3>{result && JSON.stringify(result)}</h3>
        </div>
    </>

}