import { useState, useEffect } from 'react';
import {
  fetchUpcomingLaunches,
  fetchRocket,
  fetchLaunchpad,
  fetchCapsule,
  LaunchResult,
  fetchRockets,
} from '../../../Network';
import { Rocket } from '../Rockets/Rockets';
import { LaunchItem } from '../Upcoming/Upcoming';

export function useUpcomingLaunches(): LaunchResult[] {
  const [upcomingLaunches, setUpcomingLaunches] = useState(
    new Array<LaunchResult>(),
  );

  useEffect(() => {
    const fetchData = async () => {
      const launches = await fetchUpcomingLaunches();

      const now = Date.now();
      const sortedLaunches = launches
        .filter((launch) =>
          new Date(launch.date).getTime() > now)
        .sort((a, b) => {
          // Sort by the closest launch date to latest launch date
          const aDate = Date.parse(a.date);
          const bDate = Date.parse(b.date);
          return aDate.valueOf() - bDate.valueOf();
        });

      setUpcomingLaunches(sortedLaunches);
    };
    fetchData();
    return () => {};
  }, []);

  return upcomingLaunches;
}

export function useLaunchDetails(launchResults: LaunchResult[]): LaunchItem[] {
  const [data, setData] = useState(new Array<LaunchItem>());
  useEffect(() => {
    const fetchData = async () => {
      const launches = launchResults.map(async (result) => {

        const rocket = await fetchRocket(result.rocket);
        const launchpad = await fetchLaunchpad(result.launchpad);
        const capsule = result?.capsule !== undefined
          ? await fetchCapsule(result?.capsule)
          : undefined;

        const launch: LaunchItem = {
          name: result.name,
          date: result.date,
          capsule: capsule?.name ?? '',
          rocket: rocket.name,
          launchpad: launchpad.name,
          location: `${launchpad.locality}, ${launchpad.region}`,
          description: result.details,
          crew: result.crew,
        };
        return launch;
      });

      const details = await Promise.all(launches);

      setData(details);
    };
    fetchData();
  }, [launchResults]);

  return data;
}

