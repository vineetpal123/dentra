// components/PatientSelector.tsx

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  checkPatientRequest,
  createPatientRequest
} from "../store/patient/actions"
import { RootState } from "../store"
import { Patient } from "../types/patient"

interface Props {
  onSelect: (patient: Patient) => void
}

const PatientSelector: React.FC<Props> = ({ onSelect }) => {
  const dispatch = useDispatch()

  const { loading, patient, isNew, creating } = useSelector(
    (state: RootState) => state.patient
  )

  const [phone, setPhone] = useState("")
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: ""
  })

  // 🔍 Auto detect
  const handleCheck = () => {
    if (phone.length === 10) {
      dispatch(checkPatientRequest(phone))
    }
  }

  // ✅ Select existing
  const handleSelect = () => {
    if (patient) {
      onSelect(patient)
    }
  }

  // 💾 Create new
  const handleCreate = () => {
    dispatch(
      createPatientRequest({
        phone,
        name: form.name,
        age: Number(form.age),
        gender: form.gender as any
      })
    )
  }

  // 🧠 Auto select after creation (optional improvement)
  React.useEffect(() => {
    if (!creating && patient && isNew === false) {
      onSelect(patient)
    }
  }, [creating])

  return (
    <div className="p-4 border rounded">
      <h3>Select Patient</h3>

      {/* PHONE INPUT */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleCheck}>Check</button>
      </div>

      {/* LOADING */}
      {loading && <p>Checking patient...</p>}

      {/* EXISTING PATIENT */}
      {isNew === false && patient && (
        <div className="mt-3 p-3 border bg-green-50">
          <p>✅ Existing Patient</p>
          <p><strong>{patient.name}</strong></p>
          <p>{patient.phone}</p>

          <button onClick={handleSelect}>
            Select Patient
          </button>
        </div>
      )}

      {/* NEW PATIENT */}
      {isNew === true && (
        <div className="mt-3 p-3 border bg-yellow-50">
          <p>New Patient</p>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <select
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            disabled={creating}
            onClick={handleCreate}
          >
            {creating ? "Creating..." : "Create & Select"}
          </button>
        </div>
      )}
    </div>
  )
}

export default PatientSelector