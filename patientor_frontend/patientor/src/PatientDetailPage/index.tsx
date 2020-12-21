import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, List } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient>();
  const [{ patientDetails }, dispatch] = useStateValue();

  React.useEffect(() => {
    const detail = patientDetails[id];

    if (detail) {
      setPatient(detail);
    } else {
      const getPatientDetail = async () => {
        const { data: detail } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(detail);
        dispatch({ type: "ADD_PATIENT_DETAIL", payload: detail });
      };
      getPatientDetail();
    }
  }, [id, dispatch, patientDetails]);

  const icon =
    patient?.gender === Gender.Male ? (
      <Icon name="mars" />
    ) : (
      <Icon name="venus" />
    );

  return (
    <div>
      <Container>
        <h2>
          {patient?.name} {icon}
        </h2>
      </Container>
      <List>
        <List.Item>ssn: {patient?.ssn}</List.Item>
        <List.Item>occupation: {patient?.occupation}</List.Item>
      </List>
    </div>
  );
};

export default PatientDetailPage;
