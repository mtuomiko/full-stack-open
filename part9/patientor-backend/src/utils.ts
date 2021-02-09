/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  Gender,
  NewPatient,
  Entry,
  NewEntry,
  NewBaseEntry,
  Diagnosis,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  HealthCheckRating,
} from './types';
import diagnosisData from '../data/diagnoses.json';

export const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
    entries: obj.entries ? parseEntries(obj.entries) : [],
  };

  return newPatient;
};

export const toNewEntry = (obj: any): NewEntry => {
  if (!obj) {
    throw new Error(`Incorrect entry: ${obj}`);
  }

  switch (obj.type) {
    case 'Hospital':
      return parseHospitalEntry(obj);
    case 'OccupationalHealthcare':
      return parseOccupationalHealthcareEntry(obj);
    case 'HealthCheck':
      return parseHealthCheckEntry(obj);
    default:
      throw new Error(`Incorrect entry type: ${obj.type}`);
  }
};

const parseNewBaseEntry = (obj: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString(obj.description),
    date: parseDate(obj.date),
    specialist: parseString(obj.specialist),
  };
  if (obj.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);
  }
  return newBaseEntry;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(codes) || !codes.every(c => isDiagnosisCode(c))) {
    throw new Error(`Incorrect diagnosis codes: ${codes}`);
  }
  return codes as Array<Diagnosis['code']>;
};

const isDiagnosisCode = (code: any): code is Diagnosis['code'] => {
  return diagnosisData.map(d => d.code).includes(code);
};

const parseHospitalEntry = (entry: any): NewHospitalEntry => {
  if (!entry || entry.type !== 'Hospital') {
    throw new Error(`Incorrect hospital entry: ${entry}`);
  }
  const newBaseEntry: NewBaseEntry = parseNewBaseEntry(entry);
  const newEntry: NewHospitalEntry = {
    type: 'Hospital',
    discharge: {
      date: parseDate(entry?.discharge?.date),
      criteria: parseString(entry?.discharge?.criteria),
    },
    ...newBaseEntry,
  };
  return newEntry;
};

const parseOccupationalHealthcareEntry = (entry: any): NewOccupationalHealthcareEntry => {
  if (!entry || entry.type !== 'OccupationalHealthcare') {
    throw new Error(`Incorrect occupational healthcare entry: ${entry}`);
  }
  const newBaseEntry: NewBaseEntry = parseNewBaseEntry(entry);
  const newEntry: NewOccupationalHealthcareEntry = {
    type: 'OccupationalHealthcare',
    employerName: parseString(entry.employerName),
    ...newBaseEntry,
  };
  if (entry.sickLeave) {
    newEntry.sickLeave = {
      startDate: parseDate(entry.sickLeave?.startDate),
      endDate: parseDate(entry.sickLeave?.endDate),
    };
  }
  return newEntry;
};

const parseHealthCheckEntry = (entry: any): NewHealthCheckEntry => {
  if (!entry || entry.type !== 'HealthCheck') {
    throw new Error(`Incorrect health check entry: ${entry}`);
  }
  const newBaseEntry: NewBaseEntry = parseNewBaseEntry(entry);
  const newEntry: NewHealthCheckEntry = {
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    ...newBaseEntry,
  };
  return newEntry;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing parameter: ${text}`);
  }
  return text;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Missing entries array: ${entries}`);
  }
  const parsedEntries = entries.map(e => {
    const entry = toNewEntry(e) as Entry;
    entry.id = parseString(e.id);
    return entry;
  });

  return parsedEntries;
};
