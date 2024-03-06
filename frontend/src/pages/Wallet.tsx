import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AddressCard } from '../components/AddressCard';
import { BitcoinAddress } from '../types';

export const Wallet = () => {
    const [bitcoinAddresses, setBitcoinAddresses] = useState<Array<BitcoinAddress>>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newAddress, setNewAddress] = useState('');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddAddress = () => {
        handleCloseDialog();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('api/addresses/');
                const data = await response.json();

                setBitcoinAddresses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                <Typography variant="h3" gutterBottom>
                    CoinTracker Wallet Manager
                </Typography>
                <hr />
                <Grid container spacing={2}>
                    {bitcoinAddresses.map((address) => (
                        <AddressCard key={address.id} address={address} />
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleOpenDialog}>
                        Add Address
                    </Button>
                </Box>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Bitcoin Address</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Bitcoin Address"
                        fullWidth
                        variant="standard"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddAddress}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
