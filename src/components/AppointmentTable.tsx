import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteAppointmentRequest } from "../store/appointments/slice";

export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
};

type Order = "asc" | "desc";

interface Props {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
}

const AppointmentTable: React.FC<Props> = ({ appointments, onEdit }) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [orderBy, setOrderBy] = useState<"date" | "time">("date");
  const [order, setOrder] = useState<Order>("asc");
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
        appt.patient.toLowerCase().includes(search) ||
        appt.doctor.toLowerCase().includes(search),
    );
  }, [appointments, searchText]);

  // 🔃 Sort
  const sortedAppointments = useMemo(() => {
    const sorted = [...filteredAppointments];

    sorted.sort((a, b) => {
      const valueA = orderBy === "date" ? `${a.date} ${a.time}` : a.time;
      const valueB = orderBy === "date" ? `${b.date} ${b.time}` : b.time;

      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredAppointments, orderBy, order]);

  const handleSort = (property: "date" | "time") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box>
      {/* 🔍 Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search by patient or doctor"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>

              <TableCell sortDirection={orderBy === "date" ? order : false}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={orderBy === "time" ? order : false}>
                <TableSortLabel
                  active={orderBy === "time"}
                  direction={orderBy === "time" ? order : "asc"}
                  onClick={() => handleSort("time")}
                >
                  Time
                </TableSortLabel>
              </TableCell>

              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedAppointments.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No appointments found
                </TableCell>
              </TableRow>
            )}

            {sortedAppointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.patient}</TableCell>
                <TableCell>{appt.doctor}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(appt)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(appt)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🗑 Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Appointment</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this appointment?
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {deleteTarget?.patient} with {deleteTarget?.doctor}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentTable;
