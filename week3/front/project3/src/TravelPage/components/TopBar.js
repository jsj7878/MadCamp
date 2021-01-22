import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './topbar.css'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
    border: 0,
    outline:0,
  },
  title: {
    fontSize: '1.2rem',
    color: 'black',
    fontWeight: 'bold',
    flexGrow: 1,
    border: 0,
    outline:0
  },
}));

export default function TopBar({ setOpen }) {
  //const classes = useStyle();
  return (
    <div>
      <h1  className='planTitle'>My jeju trip plan</h1>
    </div>
  );
}