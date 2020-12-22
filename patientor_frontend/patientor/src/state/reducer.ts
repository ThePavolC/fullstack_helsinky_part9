import { State } from "./state";
import {
  ADD_PATIENT,
  ADD_PATIENT_DETAIL,
  Diagnosis,
  DiagnosisActionTypes,
  Patient,
  PatientActionTypes,
  SET_DIAGNOSES_LIST,
  SET_PATIENT_LIST,
} from "../types";

export type Action =
  | {
      type: typeof SET_PATIENT_LIST;
      payload: Patient[];
    }
  | {
      type: typeof ADD_PATIENT;
      payload: Patient;
    }
  | {
      type: typeof ADD_PATIENT_DETAIL;
      payload: Patient;
    }
  | {
      type: typeof SET_DIAGNOSES_LIST;
      payload: Diagnosis[];
    };

export const setPatientList = (patientList: Patient[]): PatientActionTypes => {
  return {
    type: SET_PATIENT_LIST,
    payload: patientList,
  };
};

export const setDiagnosesList = (
  diagnosesList: Diagnosis[]
): DiagnosisActionTypes => {
  return {
    type: SET_DIAGNOSES_LIST,
    payload: diagnosesList,
  };
};

export const addPatient = (patient: Patient): PatientActionTypes => {
  return {
    type: ADD_PATIENT,
    payload: patient,
  };
};

export const addPatientDetail = (patient: Patient): PatientActionTypes => {
  return {
    type: ADD_PATIENT_DETAIL,
    payload: patient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case ADD_PATIENT_DETAIL:
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload,
        },
      };
    case SET_DIAGNOSES_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};
