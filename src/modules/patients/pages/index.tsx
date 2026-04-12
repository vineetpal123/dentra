import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  AddButton,
  Header,
  SearchInput,
  SearchWrapper,
  TableCard,
  Title,
} from '../styled/index.styled';
import PatientTable from '../components/PatientTable';
import { fetchPatientsRequest, Patient } from '../../../store/patients/slice';
import { selectPatients } from '../../../store/patients/selectors';
import { usePatients } from '../hooks/usePatients';
import { Button } from '@mui/material';

const Patients = () => {
  const dispatch = useDispatch();
  const { openForm } = usePatients();

  useEffect(() => {
    dispatch(fetchPatientsRequest());
  }, [dispatch]);

  const list = useSelector(selectPatients) || [];
  console.log('patient list from selector:', list);

  const [search, setSearch] = useState('');

  const filtered = list.filter((p: Patient) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Header>
        <Title>Patients</Title>
        <Button variant="contained" onClick={() => openForm('create')}>
          Add Patient
        </Button>
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
          onEdit={(data) => openForm('edit', data)}
          onDelete={(id) => {
            // Implement delete via dispatch if needed
            console.log('Delete patient', id);
          }}
        />
      </TableCard>
    </>
  );
};

export default Patients;
