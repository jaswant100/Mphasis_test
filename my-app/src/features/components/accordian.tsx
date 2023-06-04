import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
export default function SimpleAccordion({ rows }: any) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const data = rows ? [...rows][0] : undefined;
  if (data !== undefined) {
    const { company, address } = data
    return (
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Company Details</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <Item>Name</Item>
                    <Item>{company?.name}</Item>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>Department</Item>
                    <Item>{company?.department}</Item>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>Title</Item>
                    <Item>{company?.title}</Item>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Item>Address</Item>
                  <Item>{address?.address}</Item>
                </Grid>
              </Grid>
            </Box>

          </AccordionDetails>
        </Accordion>
      </div>
    )
  }
  else return null;
}