import React from 'react';
import { Grid, Typography } from '@mui/material';
import { BrregEnhet } from '../../service/Interface'; // Import BrregEnhet from the correct path

interface InvoiceDetailsProps {
    organization: BrregEnhet;
}


const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ organization }) => (
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
                Kundenavn
            </Typography>
            <Typography>Adresse</Typography>
            <Typography>Postnummer Sted</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Typography>Fakturanummer: 999</Typography>
            <Typography>Kundenummer: 22</Typography>
            <Typography>Fakturadato: 18.11.20</Typography>
            <Typography>Forfallsdato: 25.11.20</Typography>
        </Grid>
    </Grid>
);

export default InvoiceDetails;
