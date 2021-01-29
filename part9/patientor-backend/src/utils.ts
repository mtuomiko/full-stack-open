/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Gender, NewPatient } from './types';

const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
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

export default toNewPatient;