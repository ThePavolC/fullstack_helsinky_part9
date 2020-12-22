import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, IconProps, List, Segment } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPatientDetail, useStateValue } from "../state";
import {
  Entry,
  Gender,
  Patient,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "../types";
import { assertNever } from "../utils";

interface EntryDetailProps {
  date: string;
  description: string;
  diagnosisCodes: Array<string> | undefined;
  icon: IconProps["name"];
  healthCheckRating?: HealthCheckRating;
}

const EntryDetail: React.FC<EntryDetailProps> = ({
  date,
  description,
  diagnosisCodes,
  icon,
  healthCheckRating,
}) => {
  const [{ diagnoses }] = useStateValue();

  let heartColor: IconProps["color"];
  switch (healthCheckRating) {
    case HealthCheckRating.Healthy:
      heartColor = "green";
      break;
    case HealthCheckRating.LowRisk:
      heartColor = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      heartColor = "red";
      break;
    case HealthCheckRating.CriticalRisk:
      heartColor = "black";
      break;
  }

  return (
    <Segment>
      <h4>
        {date} <Icon name={icon} />
      </h4>

      <div>
        <i style={{ color: "dimgrey" }}>{description}</i>
      </div>
      {diagnosisCodes && (
        <div>
          <List.List>
            {diagnosisCodes.map((code) => (
              <List.Item key={code}>
                {code} - {diagnoses[code]?.name}
              </List.Item>
            ))}
          </List.List>
        </div>
      )}

      {healthCheckRating !== undefined && (
        <div>
          <Icon name="heart" color={heartColor} />
        </div>
      )}
    </Segment>
  );
};

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <EntryDetail
      date={entry.date}
      description={entry.description}
      diagnosisCodes={entry?.diagnosisCodes}
      icon="hospital"
    />
  );
};

const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <EntryDetail
      date={entry.date}
      description={entry.description}
      diagnosisCodes={entry.diagnosisCodes}
      icon="stethoscope"
      healthCheckRating={entry.healthCheckRating}
    />
  );
};

const OccupationalHealthcareEntryDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <EntryDetail
      date={entry.date}
      description={entry.description}
      diagnosisCodes={entry.diagnosisCodes}
      icon="user md"
    />
  );
};

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
              <EntryDetails entry={entry} />
            </List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default PatientDetailPage;
