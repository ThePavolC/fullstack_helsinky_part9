import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Field, Form, Formik } from "formik";
import {
  DateField,
  DiagnosisSelection,
  EntryTypeSelection,
  HealthCheckRatingSelection,
  SickLeaveSelection,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Discharge, Entry, HealthCheckRating, SickLeave } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

export interface NewEntryFormValues extends EntryFormValues {
  sickLeave?: SickLeave;
  employerName?: string;
  dischargeDate?: string;
  dischargeCriteria?: string;
  discharge?: Discharge;
  healthCheckRating: HealthCheckRating;
}

interface Props {
  onSubmit: (values: NewEntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [isHospital, setIsHospital] = React.useState<boolean>(false);
  const [isHealthCheck, setIsHealthCheck] = React.useState<boolean>(false);
  const [isOccupational, setIsOccupational] = React.useState<boolean>(false);
  const initialState = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [""],
    type: "Hospital" as const,
    sickLeave: { startDate: "", endDate: "" },
    dischargeDate: "",
    dischargeCriteria: "",
    healthCheckRating: 0,
  };

  const customOnSubmit = (data: NewEntryFormValues) => {
    data.discharge = {
      criteria: data.dischargeCriteria || "",
      date: data.dischargeDate || "",
    };

    return onSubmit(data);
  };

  const onTypeChanged = (setFieldValue: any, field: any, value: any) => {
    setIsHospital(false);
    setIsHospital(false);
    setIsOccupational(false);

    switch (value) {
      case "Hospital":
        setIsHospital(true);
        break;
      case "HealthCheck":
        setIsHealthCheck(true);
        break;
      case "OccupationalHealthcare":
        setIsOccupational(true);
        break;
      default:
        setIsHospital(true);
    }

    setFieldValue(field, value);
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={customOnSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }

        if (values.type && values.type === "OccupationalHealthcare") {
          if (!values.sickLeave) {
            errors.sickLeave = requiredError;
          }
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        if (values.type && values.type === "HealthCheck") {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type && values.type === "Hospital") {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <EntryTypeSelection
              setFieldValue={(field, value) =>
                onTypeChanged(setFieldValue, field, value)
              }
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field label="Date" name="date" component={DateField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {isOccupational && (
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />
            )}
            {isOccupational && (
              <SickLeaveSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            )}

            {isHospital && (
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="dischargeCriteria"
                component={TextField}
              />
            )}
            {isHospital && (
              <Field
                label="Discharge Date"
                name="dischargeDate"
                component={DateField}
              />
            )}
            {isHealthCheck && (
              <HealthCheckRatingSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
