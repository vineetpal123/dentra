import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  AddButton,
  Container,
  Content,
  Header,
  SearchInput,
  SearchWrapper,
  StatusBadge,
  TableCard,
  Title,
} from "./patient.styled";
import PatientTable from "../components/PatientTable";
import { fetchPatientsRequest, Patient } from "../store/patients/slice";
import { selectPatients } from "../store/patients/selectors";
import { HeaderRow } from "./dashboard.styled";

const Patients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatientsRequest());
  }, [dispatch]);

  const list = useSelector(selectPatients) || [];
  console.log("patient list from selector:", list);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);

  const filtered = list.filter((p: Patient) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <Content>
        <Header>
          <Title>Patients</Title>
          <AddButton onClick={() => setModalOpen(true)}>
            + Add Patient
          </AddButton>
        </Header>

        <SearchWrapper>
          <SearchInput
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>

        <TableCard>
          <PatientTable
            patients={filtered}
            onEdit={(patient) => {
              setEditing(patient);
              setModalOpen(true);
            }}
            onDelete={(id) => {
              // Implement delete via dispatch if needed
              console.log("Delete patient", id);
            }}
          />
        </TableCard>
        {modalOpen && (
          <PatientModal
            onClose={() => {
              setModalOpen(false);
              setEditing(null);
            }}
            onSave={(data: Patient) => {
              alert(JSON.stringify(data));
              //if (editing) dispatch(updatePatient(data));
              //else dispatch(addPatient(data));
              setModalOpen(false);
            }}
            initialData={editing}
          />
        )}
      </Content>
    </Container>
  );
};
const PatientModal = ({ onClose, onSave, initialData }: any) => {
  const [form, setForm] = useState<Patient>(
    initialData || {
      id: Date.now(),
      name: "",
      phone: "",
      lastVisit: "",
      status: "Active",
    },
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          width: 380,
          maxWidth: "90%",
        }}
      >
        <h3>{initialData ? "Edit" : "Add"} Patient</h3>

        <input
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
          placeholder="Last Visit"
          value={form.lastVisit}
          onChange={(e) => setForm({ ...form, lastVisit: e.target.value })}
        />

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            marginTop: 12,
          }}
        >
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  );
};
export default Patients;
