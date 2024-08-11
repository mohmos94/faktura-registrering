import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Container, Typography, Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import { getFakturaByOrgNummer } from '../../service/API';
import { Faktura } from '../../service/Interface';
import { useAuthToken } from '../../service/useAuthToken';

const InvoiceDetails: React.FC = () => {
    const { orgNum } = useParams<{ orgNum: string }>();
    const { getAuthToken } = useAuthToken();
    const [invoices, setInvoices] = useState<Faktura[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Faktura>('fakturanummer');

    useEffect(() => {
        const fetchInvoices = async () => {
            const token = await getAuthToken();

            if (token && orgNum) {
                try {
                    const fetchedInvoices = await getFakturaByOrgNummer(orgNum, token);
                    setInvoices(fetchedInvoices);
                } catch (err) {
                    setError('En feil oppsto under henting av fakturaer.');
                }
            } else {
                setError('Kunne ikke autentisere eller organisasjonsnummer mangler.');
            }
            setLoading(false);
        };

        fetchInvoices();
    }, [orgNum, getAuthToken]);

    const handleRequestSort = (property: keyof Faktura) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedInvoices = [...invoices].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        if (order === 'asc') {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    });

    if (loading) {
        return <Typography variant="body1">Laster fakturaer...</Typography>;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Fakturaer for Organisasjon {orgNum}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {[
                                    { id: 'fakturanummer', label: 'Fakturanummer' },
                                    { id: 'fakturadato', label: 'Fakturadato' },
                                    { id: 'forfallsdato', label: 'Forfallsdato' },
                                    { id: 'sumEksMva', label: 'Eks MVA' },
                                    { id: 'mvaBelop', label: 'MVA' },
                                    { id: 'totalBelop', label: 'Totalbeløp' },
                                    { id: 'avsenderOrganisasjonsnummer', label: 'Avsender' },
                                    { id: 'mottakerOrganisasjonsnummer', label: 'Mottaker' },
                                    { id: 'kundenavn', label: 'Kundenavn' },
                                    { id: 'postadresse', label: 'Adresse' },
                                    { id: 'postnummerSted', label: 'Postnummer' }
                                ].map((column) => (
                                    <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={order}
                                            onClick={() => handleRequestSort(column.id as keyof Faktura)}
                                        >
                                            <Typography variant="body2" noWrap>
                                                {column.label}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedInvoices.map((invoice) => (
                                <TableRow key={invoice.fakturanummer}>
                                    <TableCell>
                                        <Link to={`/faktura/${invoice.fakturanummer}`}>
                                            {invoice.fakturanummer}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{invoice.fakturadato}</TableCell>
                                    <TableCell>{invoice.forfallsdato}</TableCell>
                                    <TableCell>{invoice.sumEksMva}</TableCell>
                                    <TableCell>{invoice.mvaBelop}</TableCell>
                                    <TableCell>{invoice.totalBelop}</TableCell>
                                    <TableCell>{invoice.avsenderOrganisasjonsnummer}</TableCell>
                                    <TableCell>{invoice.mottakerOrganisasjonsnummer}</TableCell>
                                    <TableCell>{invoice.kundenavn}</TableCell>
                                    <TableCell>{invoice.postadresse}</TableCell>
                                    <TableCell>{invoice.postnummerSted}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default InvoiceDetails;
