import React from "react";
import { Icon, IconProps, List, Segment } from "semantic-ui-react";
import { useStateValue } from "../state";
import {
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "../types";

interface EntryDetailProps {
  date: string;
  description: string;
  diagnosisCodes: Array<string> | undefined;
  icon: IconProps["name"];
  healthCheckRating?: HealthCheckRating;
  specialist: string;
}

const EntryDetail: React.FC<EntryDetailProps> = ({
  date,
  description,
  diagnosisCodes,
  icon,
  healthCheckRating,
  specialist,
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
        <div>
          <i style={{ color: "dimgrey", fontSize: 10 }}>
            Specialist: {specialist}
          </i>
        </div>
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

export const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <EntryDetail
      date={entry.date}
      description={entry.description}
      diagnosisCodes={entry?.diagnosisCodes}
      icon="hospital"
      specialist={entry.specialist}
    />
  );
};

export const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <EntryDetail
      date={entry.date}
      description={entry.description}
      diagnosisCodes={entry.diagnosisCodes}
      icon="stethoscope"
      healthCheckRating={entry.healthCheckRating}
      specialist={entry.specialist}
    />
  );
};

export const OccupationalHealthcareEntryDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <EntryDetail
      date={entry.date}
      description={entry.description}
      diagnosisCodes={entry.diagnosisCodes}
      icon="user md"
      specialist={entry.specialist}
    />
  );
};
