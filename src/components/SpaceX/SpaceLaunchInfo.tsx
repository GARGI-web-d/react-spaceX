import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchCrewMember } from '../../../Network';
import './styles.css';

interface SpacexLaunchInfoProps {
  details?: string;
  crewIds?: string[];
}

function DetailsContainer(props: { details: string }) {
  const { details } = props;

  return (
    <>
      <Container className="details-container">
        <Typography className="spacex-info-header" variant="h4">
          Mission
        </Typography>
        <p>{details}</p>
      </Container>
    </>
  );
}


const SpacexLaunchInfo: React.FC<SpacexLaunchInfoProps> = ({
  crewIds,
  details,
}: SpacexLaunchInfoProps) => (
  <div className="launch-info">
    {details !== undefined && details !== null && details.length !== null && details.length > 0 ? (
      <DetailsContainer details={details} />
    ) : undefined}
    
  </div>
);

SpacexLaunchInfo.defaultProps = {
  details: '',
};

export default SpacexLaunchInfo;
