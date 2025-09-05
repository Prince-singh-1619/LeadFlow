import React, { useState } from 'react'
import SummaryApi from '../helpers/SummaryApi'

const LeadForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
    })
    const [error, setError] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const validate = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = "Name is required"
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Invalid email format"
        }

        if (data.phone && !/^\d{10}$/.test(data.phone)) {
            errors.phone = "Phone must be 10 digits"
        }

        if (!data.company) {
            errors.company = "Please select a company"
        }

        if (data.notes && data.notes.length > 1000) {
            errors.notes = "Notes can't exceed 1000 characters"
        }

        return errors
    };

    const handleSubmit = async (e) => {
        console.log("saving...")
        e.preventDefault()
        // console.log("data submitted", data)
        const validateForm = validate(data)
        setError(validateForm)

        if (Object.keys(validateForm).length !== 0) {
            alert("InValid form inputs")
            console.log("InValid form inputs")
            return
        }
        // alert("Valid form")
        console.log("Valid form")

        const res = await fetch(SummaryApi.saveList.url, {
            method: SummaryApi.saveList.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const resData = await res.json()
        if (resData.success) {
            alert(resData.message)
            console.log(resData.message)
            console.log(resData.data)
        }
        if (resData.error) {
            console.log(resData.message)
            alert(resData.message)
        }
    }

    return (
        <section className="w-full mt-12 px-4">
            <div className="flex items-center justify-between">
                <h2 className="w-full text-2xl font-bold text-center py-2">Lead Form</h2>
            </div>
            <div className="w-full h-[0.5px] bg-slate-600"></div>

            <form onSubmit={handleSubmit} className="flex justify-center pb-12">
                <section className="w-full max-w-2xl flex flex-col gap-6 mt-6">
                    {/* Name */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <label htmlFor="name" className="text-lg sm:text-xl font-bold">
                            Name*
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={data.name}
                            required
                            className="input-field w-full sm:w-4/5"
                            onChange={handleOnChange}
                        />
                    </div>
                    {error.name && <span className="text-red-400 text-sm">*{error.name}</span>}

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <label htmlFor="email" className="text-lg sm:text-xl font-bold">
                            Email*
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={data.email}
                            required
                            className="input-field w-full sm:w-4/5"
                            onChange={handleOnChange}
                        />
                    </div>
                    {error.email && <span className="text-red-400 text-sm">*{error.email}</span>}

                    {/* Phone */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <label htmlFor="phone" className="text-lg sm:text-xl font-bold">
                            Phone*
                        </label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={data.phone}
                            required
                            className="input-field w-full sm:w-4/5"
                            onChange={handleOnChange}
                        />
                    </div>
                    {error.phone && <span className="text-red-400 text-sm">*{error.phone}</span>}

                    {/* Company */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <label htmlFor="company" className="text-lg sm:text-xl font-bold">
                            Company*
                        </label>
                        <select
                            id="company"
                            name="company"
                            value={data.company}
                            required
                            className="input-field w-full sm:w-4/5"
                            onChange={handleOnChange}
                        >
                            <option value="">Select Company</option>
                            <option value="company-1">Company-1</option>
                            <option value="company-2">Company-2</option>
                            <option value="company-3">Company-3</option>
                            <option value="company-4">Company-4</option>
                            <option value="company-5">Company-5</option>
                            <option value="company-6">Company-6</option>
                            <option value="company-7">Company-7</option>
                            <option value="company-8">Company-8</option>
                            <option value="company-9">Company-9</option>
                            <option value="company-10">Company-10</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    {error.company && <span className="text-red-400 text-sm">*{error.company}</span>}

                    {/* Notes */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <label htmlFor="notes" className="text-lg sm:text-xl font-bold">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={data.notes}
                            maxLength={1000}
                            placeholder="Enter notes (optional)"
                            className="input-field w-full sm:w-4/5 h-48 resize-none"
                            onChange={handleOnChange}
                        />
                    </div>
                    {error.notes && <span className="text-red-400 text-sm">*{error.notes}</span>}

                    {/* Submit */}
                    <div className='w-full flex justify-end'>
                        <button className="btn btn-plus w-full sm:w-4/5 sm:mx-0 mt-4 mx-auto block">
                            Save
                        </button>
                    </div>
                </section>
            </form>
        </section>

    )
}

export default LeadForm