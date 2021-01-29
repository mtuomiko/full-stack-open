import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosisData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries,
};