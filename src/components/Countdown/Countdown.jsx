import React, { useEffect, useState } from 'react';
import { setInterval } from 'timers';
import { DateTime } from 'luxon';
import './Countdown.css';

export interface CountdownProps {
  endTime: number;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateCountdown(endTime: number): CountdownTime {
  if (endTime === undefined || Number.isNaN(endTime)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const endDate = DateTime.fromMillis(endTime);
  const now = DateTime.fromJSDate(new Date(Date.now()));

  const { days, hours, minutes, seconds } = endDate.diff(now, ['day', 'minute', 'hour', 'seconds']);

  return {
    days,
    hours,
    minutes,
    seconds: Math.round(seconds),
  };
}

const Countdown: React.FC<CountdownProps> = (props: CountdownProps) => {
  const { endTime } = props;
  const [countdown, setCountdown] = useState(calculateCountdown(endTime));

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (!isMounted) return;
      const calculatedCountdown = calculateCountdown(endTime);
      setCountdown(calculatedCountdown);
    }, 1000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [endTime]);

  return (
    <span className="countdown-ticker">
      {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s`}
    </span>
  );
};

export default Countdown;
