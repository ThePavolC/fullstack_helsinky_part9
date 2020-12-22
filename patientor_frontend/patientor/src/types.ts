export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";
export const ADD_PATIENT_DETAIL = "ADD_PATIENT_DETAIL";
export const SET_DIAGNOSES_LIST = "SET_DIAGNOSES_LIST";

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

interface AddPatientDetailAction {
  type: typeof ADD_PATIENT_DETAIL;
  payload: Patient;
}

export type PatientActionTypes =
  | SetPatientListAction
  | AddPatientAction
  | AddPatientDetailAction;

interface SetDiagnosesListAction {
  type: typeof SET_DIAGNOSES_LIST;
  payload: Diagnosis[];
}

export type DiagnosisActionTypes = SetDiagnosesListAction;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
