import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, List } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPatientDetail, useStateValue } from "../state";
import { Entry, Gender, Patient } from "../types";

const EntryItem: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <>
      <p>
        {entry.date} {entry.description}
      </p>
      {entry.diagnosisCodes && (
        <List.List>
          {entry.diagnosisCodes.map((code) => (
            <List.Item key={code}>{code}</List.Item>
          ))}
        </List.List>
      )}
    </>
  );
};

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
        dispatch(addPatientDetail(detail));
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

        <List>
          <List.Item>ssn: {patient?.ssn}</List.Item>
          <List.Item>occupation: {patient?.occupation}</List.Item>
        </List>

        <h3>entries</h3>
        <List>
          {patient?.entries.map((entry) => (
            <List.Item key={entry.id}>
              <EntryItem entry={entry} />
            </List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default PatientDetailPage;
