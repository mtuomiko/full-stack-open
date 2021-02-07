/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Gender, NewPatient, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './types';

const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
    entries: parseEntries(obj.entries),
  };

  return newPatient;
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

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return entry.type === 'Hospital';
};

const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
  return entry.type === 'OccupationalHealthcare';
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return entry.type === 'HealthCheck';
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
    throw new Error(`Missing entries: ${entries}`);
  }
  const parsedEntries = entries.map(e => {
    if (
      isHospitalEntry(e) ||
      isOccupationalHealthcareEntry(e) ||
      isHealthCheckEntry(e)
    ) {
      return e;
    }
    throw new Error(`Incorrect entry: ${e}`);
  });
  return parsedEntries;
};

export default toNewPatient;