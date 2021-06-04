import {
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from '@material-ui/core';
  import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
  import './Upcoming.css';
  import React from 'react';
  import SpacexLaunchInfo from '../SpaceX/SpacexLaunchInfo';
  
  export interface LaunchItem {
    /** Unique name for this launch */
    name: string;
    date: string;
    rocket: string;
    launchpad: string;
    location: string;
    capsule?: string;
    description?: string;
    crew?: string[];
  }
  
  interface LaunchTableProps {
    /**
     */
    items: LaunchItem[];
  }
  
  function formatDate(dateUtc: string): string {
    const date = new Date(dateUtc);
    return date.toLocaleString();
  }
  
  function hasExpandableContent(item: LaunchItem): boolean {
    return (
      (item?.crew !== undefined && item?.crew?.length > 0)
      || (item?.description !== undefined && item?.description?.length > 0)
    );
  }
  
  /**
   * @param props
   */
  function Row(props: { row: LaunchItem }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    const isExpandable = hasExpandableContent(row);
  
    const expansionCell = (
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
    );
    const expansionRow = (
      <TableRow
        className={`${
          !open ? 'upcoming-launch-row' : 'upcoming-launch-row-expanded'
        }`}
      >
        
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {isExpandable ? (
              <SpacexLaunchInfo details={row.description} crewIds={row.crew} />
            ) : undefined}
          </Collapse>
        </TableCell>
      </TableRow>
    );
  
    return (
      <>
        <TableRow className="upcoming-launch-row">
          {
            isExpandable ? expansionCell : <TableCell />
          }
          <TableCell>{row.name}</TableCell>
          <TableCell align="left">{formatDate(row.date)}</TableCell>
          <TableCell align="left">{row.rocket}</TableCell>
          <TableCell align="left">{row.launchpad}</TableCell>
          <TableCell align="left">{row.location}</TableCell>
          <TableCell align="left">{row.capsule}</TableCell>
        </TableRow>
        {isExpandable ? expansionRow : undefined}
      </>
    );
  }
  
  /**
   * @param props
   */
  const LaunchTable: React.FC<LaunchTableProps> = ({
    items,
  }: LaunchTableProps) => (
    <TableContainer component={Paper}>
      <Table className="upcoming-launch-table" aria-label="table">
        <TableHead>
          <TableRow className="upcoming-launch-header">
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Rocket</TableCell>
            <TableCell>Launchpad</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Capsule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
  export default LaunchTable;
  
