import React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fakturaInformasjon } from '../../service/Interface'



interface InvoiceItemsProps {
    items: fakturaInformasjon[];
    subtotal: number;
    vat: number;
    total: number;
    onDeleteItem: (index: number) => void;
    editMode: boolean;
}

const InvoiceItems: React.FC<InvoiceItemsProps> = ({ items, subtotal, vat, total, onDeleteItem, editMode }) => (
    <Box>
        {items.map((item, index) => (
            <Grid container key={index} alignItems="space-between" style={{ textAlign: 'left' }}>
                <Grid item xs>
                    <Typography variant="subtitle2">{item.beskrivelse || "Timer/Vare/etc."}</Typography>
                    <Typography>Antall: {item.antall}</Typography>
                    <Typography>Beløp: {item.pris.toFixed(2)}</Typography>
                    <Typography>Mva: {item.mva}%</Typography>
                </Grid>
                <Grid item xs style={{ textAlign: 'right' }}>
                    <Typography>Sum: kr {(item.antall * item.pris).toFixed(2)}</Typography>
                    <Typography>Mva: kr {(item.antall * item.pris * item.mva / 100).toFixed(2)}</Typography>
                </Grid>
                {editMode && (
                    <Grid item xs={1}>
                        <IconButton onClick={() => onDeleteItem(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
        ))}

        <Box margin="20px 0">
            <Grid container spacing={2}>
                <Grid item xs={8} style={{ textAlign: 'left' }}>
                    <Typography>Sum eks. mva</Typography>
                    <Typography>Merverdiavgift</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Sum å betale
                    </Typography>
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography>kr {subtotal.toFixed(2)}</Typography>
                    <Typography>kr {vat.toFixed(2)}</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        kr {total.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </Box>
);

export default InvoiceItems;
