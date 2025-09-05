import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const EditData = ({ open, onClose, initialData, onSave }) => {
    const [editData, setEditData] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setEditData({ ...initialData });
        }
    }, [initialData]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editData);
        onClose();
    };

    const dialogRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="w-full h-screen fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto">
            <section
                ref={dialogRef}
                className="w-[90%] max-w-lg bg-[#212121] text-white p-6 rounded-xl shadow-lg"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Edit Lead</h2>
                    <button
                        onClick={onClose}
                        className="btn btn-bg btn-minus w-8 h-8 text-white flex justify-center items-center"
                    >
                        <i><IoCloseSharp size={20} /></i>
                    </button>
                </div>
                <div className="w-full h-[0.5px] bg-slate-600 mb-4"></div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold mb-1">
                            Name*
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={editData.name || ""}
                            required
                            className="input-field w-full"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-semibold mb-1">
                            Email*
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={editData.email || ""}
                            required
                            className="input-field w-full"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block font-semibold mb-1">
                            Phone*
                        </label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={editData.phone || ""}
                            required
                            className="input-field w-full"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block font-semibold mb-1">
                            Company*
                        </label>
                        <select
                            id="company"
                            name="company"
                            value={editData.company || ""}
                            required
                            className="input-field w-full"
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

                    <div>
                        <label htmlFor="notes" className="block font-semibold mb-1">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={editData.notes || ""}
                            maxLength={1000}
                            placeholder="Enter notes (optional)"
                            className="input-field w-full h-24 resize-none"
                            onChange={handleOnChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-plus w-full mt-4"
                    >
                        Update
                    </button>
                </form>
            </section>
        </div>
    );
};

export default EditData;
