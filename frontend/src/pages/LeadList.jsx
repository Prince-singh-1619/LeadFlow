import React, { useEffect, useState } from 'react'
import SummaryApi from '../helpers/SummaryApi'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { IoCloseSharp } from 'react-icons/io5'
import EditData from '../components/EditData'

const LeadList = () => {
  const [leadData, setLeadData] = useState()
  const [selectedNote, setSelectedNote] = useState(null);
  const [editData, setEditData] = useState();
  const [showUpdateBox, setShowUpdateBox] = useState();

  const handleFetch = async () => {
    console.log("fetching...")
    try {
      const res = await fetch(SummaryApi.getList.url, {
        method: SummaryApi.getList.method,
        headers: {
          'content-type': 'application/json'
        }
      })

      const resData = await res.json();
      if (resData.success) {
        console.log(resData.data)
        // alert(resData.message)
        setLeadData(resData.data)
      }
      if (resData.error) {
        console.warn(resData.message)
        alert("failed")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])

  const handleDelete = async (dataId) => {
    try {
      const res = await fetch(`${SummaryApi.deleteUser.url}?dataId=${dataId}`, {
        method: SummaryApi.deleteUser.method,
        headers: {
          'content-type': 'application/json'
        }
      })
      const resData = await res.json()

      if (resData.success) {
        console.log(resData.message)
        setLeadData(prev => prev.filter(item => item._id !== dataId))
      }
      if (resData.error) {
        console.log(resData.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (data) => {
    setEditData(data)
    setShowUpdateBox(true)
  }

  const handleSave = async (editData) => {
    console.log("editData :", editData)
    try {
      const response = await fetch(SummaryApi.editUser.url, {
        method: SummaryApi.editUser.method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(editData)
      })

      const responseData = await response.json()
      if (responseData.success) {
        setLeadData(prev =>
          prev?.map(item => item?._id === editData._id ? editData : item)
        )
      }
      if (responseData.error) {
        // toast.error(responseData.message)
      }
    } catch (error) {
      console.warning("Some error occurred in editing", error)
    }
  }

  return (
    <section className="w-full mt-12 px-2">
      <h2 className="w-full text-2xl font-bold text-center py-2">Lead List</h2>

      {leadData?.length === 0 ? (
        <p className="text-center">No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-400 text-black">
                <th className="border border-gray-400 px-2 py-1 text-left">Name</th>
                <th className="border border-gray-400 px-2 py-1 text-left">Email</th>
                <th className="border border-gray-400 px-2 py-1 text-left">Phone</th>
                <th className="border border-gray-400 px-2 py-1 text-left">Company</th>
                <th className="border border-gray-400 px-2 py-1 text-left">Notes</th>
                <th className="border border-gray-400 px-2 py-1 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {leadData?.map((lead) => (
                <tr key={lead._id} className="even:bg-black/30">
                  <td className="border border-gray-400 px-2 py-1 break-words">{lead.name}</td>
                  <td className="border border-gray-400 px-2 py-1 break-words">{lead.email}</td>
                  <td className="border border-gray-400 px-2 py-1 break-words">{lead.phone}</td>
                  <td className="border border-gray-400 px-2 py-1 break-words">{lead.company}</td>
                  <td className="border border-gray-400 px-2 py-1 break-words">
                    {lead.notes && lead.notes.length > 25 ? (
                      <>
                        {lead.notes.substring(0, 25)}...
                        <button
                          className="text-blue-500 underline ml-2"
                          onClick={() => setSelectedNote(lead.notes)}
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      lead.notes
                    )}
                  </td>
                  <td className='flex justify-around border border-gray-400 px-2 py-1'>
                    <i onClick={() => handleEdit(lead)} className='w-fit p-2 rounded-full btn-bg btn-plus cursor-pointer'> <MdModeEditOutline /> </i>
                    <i onClick={() => handleDelete(lead._id)} className='w-fit p-2 rounded-full btn-bg btn-minus cursor-pointer '><MdDelete /></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Note popup */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-[6px]">
          <div className="bg-black/75 p-6 rounded-lg shadow-lg w-[500px] max-w-[90%]">
            <div className='flex  justify-between'>
              <h3 className="text-xl font-bold mb-4">Notes</h3>
              <button onClick={() => setSelectedNote(null)} className='w-8 h-8 btn btn-bg btn-minus flex justify-center items-center rounded mt-2'>
                <i> <IoCloseSharp /> </i>
              </button>
            </div>
            <p className="mb-6 break-words">{selectedNote}</p>
          </div>
        </div>
      )}

      <EditData open={showUpdateBox} onClose={() => setShowUpdateBox(false)} initialData={editData} onSave={handleSave} />
    </section>

  )
}

export default LeadList