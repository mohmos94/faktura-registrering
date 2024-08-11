// src/components/invoice/Invoice.tsx

import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, TextField, Button, Divider } from '@mui/material';
import InvoiceItems from './InvoiceItems';
import PaymentInfo from './PaymentInfo';
import { createFaktura, fetchBrregData } from '../../service/API';
import { BrregEnhet, Faktura, fakturaInformasjon } from '../../service/Interface';
import { validateInputs } from '../../util/validation';
import { calculateSubtotal, calculateTotalVat, calculateTotal, formatDate } from '../../util/calculations';
import { useAuthToken } from '../../service/useAuthToken';

interface Errors {
    accountNumber: string;
    kidNumber: string;
    dueDate: string;
    description: string;
    quantity: string;
    price: string;
    vatRate: string;
    invoiceNumber: string;
    invoiceDate: string;
}

const Invoice: React.FC = () => {
    const { getAuthToken } = useAuthToken();
    const [orgNumber, setOrgNumber] = useState('');
    const [organization, setOrganization] = useState<BrregEnhet | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [currentAccountNumber, setCurrentAccountNumber] = useState('');
    const [currentKidNumber, setCurrentKidNumber] = useState('');
    const [currentDueDate, setCurrentDueDate] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentVatRate, setCurrentVatRate] = useState(25);
    const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState('');
    const [currentInvoiceDate, setCurrentInvoiceDate] = useState('');

    const [invoiceItems, setInvoiceItems] = useState<fakturaInformasjon[]>([]);
    const [editMode, setEditMode] = useState(false);

    const [errors, setErrors] = useState<Errors>({
        accountNumber: '',
        kidNumber: '',
        dueDate: '',
        description: '',
        quantity: '',
        price: '',
        vatRate: '',
        invoiceNumber: '',
        invoiceDate: '',
    });

    const handleFetchOrganization = async () => {
        try {
            const token = await getAuthToken();
            console.log("hello world")
            console.log("token: " + token)

            if (!token) {
                setError('User is not authenticated.');
                return;
            }

            const data = await fetchBrregData(orgNumber, token);
            setOrganization(data);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Ukjent feil');
        }
    };

    const addItem = () => {
        const validationErrors = validateInputs(
            currentAccountNumber,
            currentKidNumber,
            currentDueDate,
            currentDescription,
            currentQuantity,
            currentPrice,
            currentVatRate,
            currentInvoiceNumber,
            currentInvoiceDate
        );

        if (Object.values(validationErrors).some((msg) => msg !== '')) {
            setErrors(validationErrors);
            return;
        }

        setInvoiceItems((prevItems) => [
            ...prevItems,
            {
                beskrivelse: currentDescription,
                antall: currentQuantity,
                pris: currentPrice,
                mva: currentVatRate,
            },
        ]);

        setCurrentDescription('');
        setCurrentQuantity(1);
        setCurrentPrice(0);
        setCurrentVatRate(25);
    };

    const handleDeleteItem = (index: number) => {
        setInvoiceItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const subtotal = calculateSubtotal(invoiceItems) || 0;
    const totalVat = calculateTotalVat(invoiceItems) || 0;
    const total = calculateTotal(invoiceItems) || 0;

    const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const dateValue = event.target.value;
        setter(dateValue);
    };

    const handleSendInvoice = async () => {
        try {
            const token = await getAuthToken();

            if (!token) {
                setError('User is not authenticated.');
                return;
            }

            const invoiceData: Faktura = {
                fakturanummer: currentInvoiceNumber,
                fakturadato: formatDate(currentInvoiceDate),
                forfallsdato: formatDate(currentDueDate),
                sumEksMva: subtotal,
                mvaBelop: totalVat,
                totalBelop: total,
                avsenderOrganisasjonsnummer: "123456789", // Sett til avsenders organisasjonsnummer
                mottakerOrganisasjonsnummer: organization ? organization.organisasjonsnummer : '',
                kontonummer: currentAccountNumber,
                kidNummer: currentKidNumber,
                kundenavn: organization ? organization.navn : '',
                postadresse: organization ? organization.forretningsadresse.adresse.join(', ') : '',
                postnummerSted: organization ? `${organization.forretningsadresse.postnummer} ${organization.forretningsadresse.poststed}` : '',
                fakturaLinjer: invoiceItems.map(item => ({
                    fakturanummer: currentInvoiceNumber,
                    varebeskrivelse: item.beskrivelse,
                    antall: item.antall,
                    prisPerEnhet: item.pris,
                    mvaSats: item.mva,
                })),
                notat: '' // Sett til en standardverdi eller inkluder en input fra brukeren
            };

            console.log("Invoice data: " + JSON.stringify(invoiceData, null, 2));

            const response = await createFaktura(invoiceData, token);

            console.log('Invoice successfully saved:', response);

            // Tilbakestill alle tilstandsvariabler til sine opprinnelige verdier
            setOrgNumber('');
            setOrganization(null);
            setCurrentAccountNumber('');
            setCurrentKidNumber('');
            setCurrentDueDate('');
            setCurrentDescription('');
            setCurrentQuantity(1);
            setCurrentPrice(0);
            setCurrentVatRate(25);
            setCurrentInvoiceNumber('');
            setCurrentInvoiceDate('');
            setInvoiceItems([]);
            setErrors({
                accountNumber: '',
                kidNumber: '',
                dueDate: '',
                description: '',
                quantity: '',
                price: '',
                vatRate: '',
                invoiceNumber: '',
                invoiceDate: '',
            });

        } catch (error) {
            console.error('Error sending invoice:', error);
            setError(error instanceof Error ? error.message : 'Ukjent feil ved sending av faktura');
        }
    };



    return (
        <Paper elevation={3} style={{ padding: '16px', margin: '20px 0' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Organisasjonsnummer"
                        value={orgNumber}
                        onChange={(e) => setOrgNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleFetchOrganization} fullWidth>
                        Hent organisasjonsdata
                    </Button>
                    <TextField
                        label="Kontonummer"
                        value={currentAccountNumber}
                        onChange={(e) => setCurrentAccountNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.accountNumber}
                        helperText={errors.accountNumber}
                    />
                    <TextField
                        label="KID-nummer"
                        value={currentKidNumber}
                        onChange={(e) => setCurrentKidNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.kidNumber}
                        helperText={errors.kidNumber}
                    />
                    <TextField
                        label="Fakturanummer"
                        value={currentInvoiceNumber}
                        onChange={(e) => setCurrentInvoiceNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.invoiceNumber}
                        helperText={errors.invoiceNumber}
                    />

                    <TextField
                        label="Forfallsdato"
                        type="date"
                        value={currentDueDate}
                        onChange={handleDateChange(setCurrentDueDate)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.dueDate}
                        helperText={errors.dueDate}
                    />
                    <TextField
                        label="Fakturadato"
                        type="date"
                        value={currentInvoiceDate}
                        onChange={handleDateChange(setCurrentInvoiceDate)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.invoiceDate}
                        helperText={errors.invoiceDate}
                    />

                    <TextField
                        label="Varebeskrivelse"
                        value={currentDescription}
                        onChange={(e) => setCurrentDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
                        label="Antall"
                        type="number"
                        value={currentQuantity}
                        onChange={(e) => setCurrentQuantity(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                    <TextField
                        label="Pris"
                        type="number"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <TextField
                        label="MVA-sats (%)"
                        type="number"
                        value={currentVatRate}
                        onChange={(e) => setCurrentVatRate(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                        error={!!errors.vatRate}
                        helperText={errors.vatRate}
                    />

                    <Box mt={2}>
                        <Button variant="contained" color="secondary" onClick={addItem} fullWidth style={{ marginBottom: '8px' }}>
                            Legg til vare
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setEditMode(!editMode)}
                            fullWidth
                            style={{ marginTop: '8px', marginBottom: '8px' }}
                        >
                            {editMode ? 'Avslutt redigeringsmodus' : 'Rediger fakturaposter'}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendInvoice}
                            fullWidth
                            style={{ marginTop: '8px' }}
                        >
                            Send Faktura
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box padding="16px">
                        <Typography variant="h4" gutterBottom style={{ textAlign: 'left' }}>
                            Faktura
                        </Typography>
                        <Grid container justifyContent="space-between" alignItems="flex-start">
                            <Grid item xs={5}>
                                <Typography variant="h6" style={{ textAlign: 'left' }}>Ditt Selskapsnavn</Typography>
                                <Typography variant='body2' style={{ textAlign: 'left' }}>
                                    Org nr: XXX XXX XXX MVA
                                </Typography>
                                <Typography variant='body2' style={{ textAlign: 'left' }}>
                                    Adresse, postnummer, sted
                                </Typography>
                                <Typography variant='body2' style={{ textAlign: 'left' }}>
                                    Telefon - e-postadresse
                                </Typography>
                            </Grid>
                            {organization ? (
                                <Grid item xs={5} style={{ textAlign: 'right' }}>
                                    <Typography variant="h6">{organization.navn}</Typography>
                                    <Typography variant='body2'>
                                        Org.nr: {organization.organisasjonsnummer}
                                    </Typography>
                                    <Typography variant='body2'>
                                        {organization.forretningsadresse.adresse.join(', ')}
                                    </Typography>
                                    <Typography variant='body2'>
                                        {organization.forretningsadresse.postnummer} {organization.forretningsadresse.poststed}
                                    </Typography>
                                </Grid>
                            ) : (
                                <Grid item xs={5} style={{ textAlign: 'right' }}>
                                    <Typography color="error" variant="body2">
                                        {error || "Ingen organisasjonsdata funnet"}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>

                        <Box marginTop="10px">
                            <Grid container justifyContent="space-between">
                                <Grid item xs={5}>
                                    <Typography variant="h6" style={{ textAlign: 'left' }}>Kundeinformasjon</Typography>
                                    <Typography style={{ textAlign: 'left' }}>Kundenavn:</Typography>
                                    <Typography style={{ textAlign: 'left' }}>Postadresse:</Typography>
                                    <Typography style={{ textAlign: 'left' }}>Postnummer, sted:</Typography>
                                </Grid>
                                <Grid item xs={5} style={{ textAlign: 'right' }}>
                                    <Typography>Fakturanummer: {currentInvoiceNumber || 'skal tildeles'}</Typography>
                                    <Typography>Fakturadato: {formatDate(currentInvoiceDate) || 'DD-MM-ÅÅÅÅ'}</Typography>
                                    <Typography>Forfallsdato: {formatDate(currentDueDate) || 'DD-MM-ÅÅÅÅ'}</Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Box>

                        <Box margin="20px 0">
                            <Typography variant="h6" style={{ textAlign: 'left', marginBottom: 10 }}>FAKTURAINFORMASJON</Typography>
                            <Divider />
                            <Typography variant="body1" gutterBottom style={{ textAlign: 'left', marginTop: 10 }}>
                                Beskrivelse av vare eller tjeneste.
                            </Typography>
                        </Box>

                        <InvoiceItems
                            items={invoiceItems}
                            subtotal={subtotal}
                            vat={totalVat}
                            total={total}
                            onDeleteItem={handleDeleteItem}
                            editMode={editMode}
                        />

                        <Box marginTop="20px">
                            <PaymentInfo
                                betalingsinformasjon={{
                                    kontonummer: currentAccountNumber || 'Ikke angitt',
                                    kidnummer: currentKidNumber || 'Ikke angitt',
                                    fakturanummer: currentInvoiceNumber || '999',
                                    forfallsdato: formatDate(currentDueDate) || 'Ikke angitt',
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Invoice;
