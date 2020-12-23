import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Icon, List } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import {
  HealthCheckEntryDetail,
  HospitalEntryDetail,
  OccupationalHealthcareEntryDetail,
} from "../components/EntryDetail";
import { apiBaseUrl } from "../constants";
import { addEntry, addPatientDetail, useStateValue } from "../state";
import { Entry, Gender, Patient } from "../types";
import { assertNever } from "../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetail entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient>();
  const [{ patientDetails }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        {
          ...values,
        }
      );
      setPatient(updatedPatient);
      dispatch(addEntry(updatedPatient));

      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

        <h3>
          entries
          <span style={{ marginLeft: 8 }}>
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button onClick={() => openModal()} icon="plus" color="green" />
          </span>
        </h3>

        <List>
          {patient?.entries.map((entry) => (
            <List.Item key={entry.id}>
              <EntryDetails entry={entry} />
            </List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default PatientDetailPage;
