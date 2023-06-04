import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
//import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  display: 'inline-block',
  width: '50%'
}));

export default function RowAndColumnSpacing({ rows }: any) {
  const data = rows ? [...rows][0] : undefined;
  if (data !== undefined) {
    const { id, firstName, lastName, maidenName, age, gender, phone, birthDate, email, image, address } = data
    return (
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>Id:</Item>
            <Item>{id}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>User Name</Item>
            <Item>{email}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Name</Item>
            <Item>{`${firstName} ${lastName} ${maidenName}`}</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Address</Item>
            <Item>{address?.address}</Item>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} >
              <Item>Gender</Item>
              <Item>{gender}</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>Phone</Item>
              <Item>{phone}</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>Age</Item>
              <Item>{age}</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>Date Of Birth</Item>
              <Item>{birthDate}</Item>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Item><img src={image} alt={image} style={{ width: '150px', height: '150px' }} /></Item>
          </Grid>
        </Grid>
      </Box>
    )
  }
  else return null
}