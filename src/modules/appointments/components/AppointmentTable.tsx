import React, { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteAppointmentRequest } from '../../../store/appointments/slice';
import DataTable, { DataColumn } from '../../../components/DataTable';

export type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: string;
};

type Order = 'asc' | 'desc';

interface Props {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
}

const AppointmentTable: React.FC<Props> = ({ appointments, onEdit }) => {
  const dispatch = useDispatch();

  console.log('appointments in table', appointments);

  const [searchText, setSearchText] = useState('');
  const [orderBy, setOrderBy] = useState<'date' | 'time'>('date');
  const [order, setOrder] = useState<Order>('asc');
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);

  const handleDeleteClick = (appt: Appointment) => {
    setDeleteTarget(appt);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    dispatch(deleteAppointmentRequest(deleteTarget.id));
    setDeleteTarget(null);
  };

  // 🔍 Search
  const filteredAppointments = useMemo(() => {
    if (!searchText) return appointments;

    const search = searchText.toLowerCase();

    return appointments.filter(
      (appt) =>
        appt.patient.toLowerCase().includes(search) || appt.doctor.toLowerCase().includes(search)
    );
  }, [appointments, searchText]);

  // 🔃 Sort
  const sortedAppointments = useMemo(() => {
    const sorted = [...filteredAppointments];

    sorted.sort((a, b) => {
      const valueA = orderBy === 'date' ? `${a.date} ${a.time}` : a.time;
      const valueB = orderBy === 'date' ? `${b.date} ${b.time}` : b.time;

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredAppointments, orderBy, order]);

  const handleSort = (property: 'date' | 'time') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns: DataColumn<Appointment>[] = [
    { key: 'patient', label: 'Patient', sortable: false },
    { key: 'phone', label: 'Patient Phone', sortable: false },
    { key: 'doctor', label: 'Doctor', sortable: false },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => row.date,
    },
    {
      key: 'time',
      label: 'Time',
      sortable: true,
      render: (row) => row.startTime,
    },
    { key: 'status', label: 'Status', sortable: false },
    {
      key: 'id',
      label: 'Action',
      align: 'center',
      render: (row) => (
        <>
          <IconButton color="primary" onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        placeholder="Search by patient or doctor"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <DataTable
        data={sortedAppointments}
        columns={columns}
        sortBy={orderBy}
        sortOrder={order}
        onSortChange={(key) => {
          const keyAsString = String(key);
          if (keyAsString === 'date' || keyAsString === 'time') {
            handleSort(keyAsString as 'date' | 'time');
          }
        }}
        rowKey={(row) => row.id}
      />

      <Dialog open={!!deleteTarget} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Appointment</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to delete this appointment?</Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {deleteTarget?.patient} with {deleteTarget?.doctor}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentTable;
