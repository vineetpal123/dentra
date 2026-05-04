import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  identifyPatientRequest,
  addPatientRequest,
} from "../../../store/patients/slice"

import {
  selectIdentifiedPatient,
  selectIsNewPatient,
  selectIdentifyLoading,
} from "../../../store/patients/selectors"

import { Patient } from "../../../store/patients/slice"

interface Props {
  onSelect?: (patient: Patient) => void
  mode?: "select" | "create" // select = appointment, create = patient page
}

const PatientSelector: React.FC<Props> = ({
  onSelect,
  mode = "select",
}) => {
  const dispatch = useDispatch()

  const identifiedPatient = useSelector(selectIdentifiedPatient)
  const isNewPatient = useSelector(selectIsNewPatient)
  const loading = useSelector(selectIdentifyLoading)

  const [phone, setPhone] = useState("")
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
  })

  // 🔍 Auto detect (debounce)
  useEffect(() => {
    if (phone.length === 10) {
      const timer = setTimeout(() => {
        dispatch(identifyPatientRequest(phone))
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [phone])

  // ✅ Auto select after creation or existing
  useEffect(() => {
    if (
      mode === "select" &&
      identifiedPatient &&
      isNewPatient === false &&
      onSelect
    ) {
      onSelect(identifiedPatient)
    }
  }, [identifiedPatient, isNewPatient])

  // 💾 Create new patient
  const handleCreate = () => {
    dispatch(
      addPatientRequest({
        name: form.name,
        phone,
        age: Number(form.age),
        gender: form.gender,
        lastVisit: "",
        status: "Active",
      } as Patient)
    )
  }

  return (
    <div className="p-4 border rounded w-full max-w-md">
      <h3 className="font-semibold mb-2">
        {mode === "select" ? "Select Patient" : "Create Patient"}
      </h3>

      {/* PHONE INPUT */}
      <div className="mb-3">
        <label className="block text-sm">Phone Number</label>
        <input
          className="border p-2 w-full rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter 10 digit phone"
        />
      </div>

      {/* LOADING */}
      {loading && <p className="text-sm">Checking patient...</p>}

      {/* EXISTING PATIENT */}
      {isNewPatient === false && identifiedPatient && (
        <div className="p-3 border bg-green-50 rounded">
          <p className="text-green-700 font-medium">
            ✅ Patient already exists
          </p>
          <p>{identifiedPatient.name}</p>
          <p>{identifiedPatient.phone}</p>

          {mode === "select" && (
            <button
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => onSelect?.(identifiedPatient)}
            >
              Select Patient
            </button>
          )}

          {mode === "create" && (
            <p className="text-sm text-gray-500 mt-2">
              You cannot create duplicate patient
            </p>
          )}
        </div>
      )}

      {/* NEW PATIENT FORM */}
      {isNewPatient === true && (
        <div className="mt-3 space-y-2">
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <select
            className="border p-2 w-full rounded"
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded"
            disabled={!form.name || !form.age || !form.gender}
            onClick={handleCreate}
          >
            Create Patient
          </button>
        </div>
      )}
    </div>
  )
}

export default PatientSelector