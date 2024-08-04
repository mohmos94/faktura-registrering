import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

interface Betalingsinformasjon {
    kontonummer: string;
    kidnummer: string;
    fakturanummer: string;
    forfallsdato: string;
}

interface PaymentInfoProps {
    betalingsinformasjon: Betalingsinformasjon;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ betalingsinformasjon }) => (
    <Box mt={3}>
        <Grid container spacing={2}>
            <Grid item xs={8} style={{ textAlign: 'left' }}>
                <Typography variant="body1">Betaling gjøres til konto: {betalingsinformasjon.kontonummer}</Typography>
                <Typography>KID-nummer: {betalingsinformasjon.kidnummer}</Typography>
                <Typography>Merk gjerne betalingen: {betalingsinformasjon.fakturanummer}</Typography>
                <Typography>Forfallsdato: {betalingsinformasjon.forfallsdato}</Typography>
            </Grid>
        </Grid>
    </Box>
);

export default PaymentInfo;
