import React from "react";
import DataTable, { DataColumn } from "./DataTable";
import { Patient } from "../store/patients/slice";
import { StatusBadge } from "../pages/patient.styled";

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete?: (id: number) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onEdit,
  onDelete,
}) => {
  const columns: DataColumn<Patient>[] = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "lastVisit", label: "Last Visit" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge status={row.status}>{row.status}</StatusBadge>
      ),
    },
    {
      key: "id",
      label: "Action",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={() => onEdit(row)}>Edit</button>
          {onDelete && <button onClick={() => onDelete(row.id)}>Delete</button>}
        </div>
      ),
    },
  ];

  return (
    <DataTable<Patient>
      data={patients}
      columns={columns}
      rowKey={(row) => row.id}
      noDataMessage="No patients found"
    />
  );
};

export default PatientTable;
