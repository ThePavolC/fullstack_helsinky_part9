import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, SickLeave } from "../types";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

interface DateProps extends FieldProps {
  label: string;
}

export const DateField: React.FC<DateProps> = ({ field, label }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="date" />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const EntryTypeSelection = ({
  setFieldValue,
  setFieldTouched,
}: {
  setFieldValue: FormikProps<{ type: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ type: string[] }>["setFieldTouched"];
}) => {
  const field = "type";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = [
    "Hospital",
    "HealthCheck",
    "OccupationalHealthcare",
  ].map((type) => ({
    key: type,
    text: `${type}`,
    value: type,
  }));

  return (
    <Form.Field>
      <label>Type</label>
      <Dropdown
        fluid
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const SickLeaveSelection = ({
  setFieldValue,
  setFieldTouched,
}: {
  setFieldValue: FormikProps<{
    sickLeave: SickLeave;
  }>["setFieldValue"];
  setFieldTouched: FormikProps<{
    sickLeave: SickLeave;
  }>["setFieldTouched"];
}) => {
  const field = "sickLeave";

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFieldTouched(field, true);
    setFieldValue(field, {
      startDate: start?.toISOString().slice(0, 10),
      endDate: end?.toISOString().slice(0, 10),
    });
  };
  return (
    <Form.Field>
      <label>Sick leave</label>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <div style={{ color: "red" }}>
        <ErrorMessage name={field} />
      </div>
    </Form.Field>
  );
};

export const HealthCheckRatingSelection = ({
  setFieldValue,
  setFieldTouched,
}: {
  setFieldValue: FormikProps<{ healthCheckRating: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{
    healthCheckRating: string[];
  }>["setFieldTouched"];
}) => {
  const field = "healthCheckRating";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const options = [
    ["Healthy", 0],
    ["LowRisk", 1],
    ["HighRisk", 2],
    ["CriticalRisk", 3],
  ];

  const stateOptions = options.map(([name, value]) => {
    return {
      key: name,
      text: `${name}`,
      value: value,
    };
  });

  return (
    <Form.Field>
      <label>Health Check Rating</label>
      <Dropdown
        fluid
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
