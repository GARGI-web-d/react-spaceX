import {
    Input,
    makeStyles,
    MenuItem,
    Select,
    Typography,
  } from '@material-ui/core';
  import React, { useState } from 'react';
  import Countdown from './Countdown';
  import './Countdown.css';
  
  export interface LaunchCountdown {
    name: string;
    // launchTimes: number;
    endTime: number;
  }
  
  export interface CountdownSelectProps {
    selectedIndex: number;
    items: string[];
    onSelectionChanged: (event: React.ChangeEvent<{ value: unknown }>) => void;
  }
  
  const useStyles = makeStyles({
    underline: {
      '&:before': {
        borderBottom: '2px solid #005c22',
      },
      '&:after': {
        borderBottom: '2px solid #005c22',
      },
      '&:hover': {
        borderBottom: '2px solid #005c22',
      },
    },
  });
  
  const CountdownSelect = (props: CountdownSelectProps) => {
    const { selectedIndex, items, onSelectionChanged } = props;
  
    // Track the state of the picker being open or closed
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const classes = useStyles();
    return (
      <Select
        className="picker"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={onSelectionChanged}
        value={selectedIndex}
        input={<Input classes={classes} />}
      >
        {items.map((item, index) => (
          <MenuItem key={item} value={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    );
  };
  
  export interface CountdownSelectorProps {
    countdowns: LaunchCountdown[];
  }
  
  const CountdownSelector: React.FC<CountdownSelectorProps> = ({
    countdowns,
  }: CountdownSelectorProps) => {
    const sortedCountdowns = countdowns.sort((a, b) => a.endTime - b.endTime);
    const names = sortedCountdowns.map((item) => item.name);
    const times = sortedCountdowns.map((item) => item.endTime);
  
    const [value, setValue] = useState(0);
  
    const handleSelectionChanged = (
      event: React.ChangeEvent<{ value: unknown }>,
    ) => {
      setValue(event.target.value as number);
    };
  
    return (
      <>
        <div className="countdown-header">
          <Typography variant="h3">Countdown Until</Typography>
          <CountdownSelect
            selectedIndex={value}
            items={names}
            onSelectionChanged={handleSelectionChanged}
          />
        </div>
        <div className="countdown-content">
          <Countdown endTime={times[value]} />
        </div>
      </>
    );
  };
  
  export default CountdownSelector;
