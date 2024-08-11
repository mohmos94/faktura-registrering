import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { getFakturaByFakturaNummer, oppdaterNotatFelt } from '../../service/API';
import { Faktura } from '../../service/Interface';
import { useAuthToken } from '../../service/useAuthToken';

const InvoiceDetail: React.FC = () => {
    const { fakturanummer } = useParams<{ fakturanummer: string }>();
    const { getAuthToken } = useAuthToken();
    const [faktura, setFaktura] = useState<Faktura | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notat, setNotat] = useState<string>('');
    const [isEditingNote, setIsEditingNote] = useState<boolean>(false);

    useEffect(() => {
        const fetchInvoice = async () => {
            const token = await getAuthToken();

            if (token && fakturanummer) {
                try {
                    console.log("Fakturanummer fra URL:", fakturanummer);

                    const fetchedInvoice = await getFakturaByFakturaNummer(fakturanummer, token);
                    console.log("Faktura hentet:", fetchedInvoice);

                    if (fetchedInvoice) {
                        setFaktura(fetchedInvoice);
                        // Parse notat JSON string to get the actual message
                        const parsedNotat = JSON.parse(fetchedInvoice.notat);
                        setNotat(parsedNotat.notat || '');
                    } else {
                        setError('Faktura ikke funnet.');
                    }
                } catch (err) {
                    setError('En feil oppsto under henting av faktura.');
                }
            } else {
                setError('Kunne ikke autentisere eller fakturanummer mangler.');
            }
            setLoading(false);
        };

        fetchInvoice();
    }, [fakturanummer, getAuthToken]);

    const handleNotatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotat(event.target.value);
    };

    const handleSaveNotat = async () => {
        const token = await getAuthToken();
        if (token && fakturanummer) {
            try {
                // Update notat field with the JSON structure again
                const success = await oppdaterNotatFelt(fakturanummer, JSON.stringify({ notat }), token);
                console.log("sjekke success ", success);
                if (success) {
                    alert('Notat oppdatert!');
                    setIsEditingNote(false);
                }
            } catch (error) {
                setError('Kunne ikke oppdatere notatet.');
            }
        }
    };

    if (loading) {
        return <Typography variant="body1">Laster fakturadetaljer...</Typography>;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    if (!faktura) {
        return <Typography variant="body1" color="error">Faktura ikke funnet.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Faktura {faktura.fakturanummer}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Kundenavn</TableCell>
                                <TableCell>{faktura.kundenavn}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Fakturadato</TableCell>
                                <TableCell>{faktura.fakturadato}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Forfallsdato</TableCell>
                                <TableCell>{faktura.forfallsdato}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Sum eks. MVA</TableCell>
                                <TableCell>{faktura.sumEksMva}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>MVA-beløp</TableCell>
                                <TableCell>{faktura.mvaBelop}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Totalbeløp</TableCell>
                                <TableCell>{faktura.totalBelop}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Avsender Org.nr</TableCell>
                                <TableCell>{faktura.avsenderOrganisasjonsnummer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mottaker Org.nr</TableCell>
                                <TableCell>{faktura.mottakerOrganisasjonsnummer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Kontonummer</TableCell>
                                <TableCell>{faktura.kontonummer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>KID-nummer</TableCell>
                                <TableCell>{faktura.kidNummer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Postadresse</TableCell>
                                <TableCell>{faktura.postadresse}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Postnummer/Sted</TableCell>
                                <TableCell>{faktura.postnummerSted}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Notat</TableCell>
                                <TableCell>
                                    {isEditingNote ? (
                                        <>
                                            <TextField
                                                value={notat}
                                                onChange={handleNotatChange}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                margin="normal"
                                            />
                                            <Button variant="contained" color="primary" onClick={handleSaveNotat}>
                                                Lagre Notat
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="body2">{notat || 'Ingen notat lagt til.'}</Typography>
                                            <IconButton onClick={() => setIsEditingNote(true)}>
                                                <NoteAddIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default InvoiceDetail;
