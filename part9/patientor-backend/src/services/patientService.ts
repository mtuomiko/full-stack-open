import patientData from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuidv1 } from 'uuid';
import { toNewPatient } from '../utils';

const patients: Patient[] = patientData.map(object => {
  const patient = toNewPatient(object) as Patient;
  patient.id = object.id;
  return patient;
});

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(x => {
    const { ssn: _ssn, ...tail } = x;
    return tail;
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  if (!findById(patientId)) {
    return undefined;
  }
  const newEntry = {
    id: uuidv1(),
    ...entry,
  };
  patients.forEach(p => {
    if (p.id === patientId) {
      p.entries.push(newEntry);
    }
  });
  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  findById,
  addEntry,
};