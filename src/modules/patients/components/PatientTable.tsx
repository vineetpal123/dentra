import React from 'react';
import { Patient } from '../../../store/patients/slice';
import DataTable, { DataColumn } from '../../../components/DataTable';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete?: (id: number) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, onEdit, onDelete }) => {
  const columns: DataColumn<Patient>[] = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    {
      key: 'id',
      label: 'Action',
      align: 'center',
      render: (row) => (
        <>
          <IconButton color="primary" onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
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
