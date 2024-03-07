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
import { toast } from 'react-hot-toast';

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
        setNewAddress('');
        setOpenDialog(false);
    };

    const fetchData = async () => {
        try {
            const url = import.meta.env.DEV ? 'api/addresses/' : 'http://localhost:8000/addresses/';
            const response = await fetch(url);
            const data = await response.json();

            setBitcoinAddresses(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddAddress = async () => {
        try {
            const url = import.meta.env.DEV ? 'api/address/' : 'http://localhost:8000/address/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addr: newAddress }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            fetchData();
            toast.success('Bitcoin address added successfully');
        } catch (error) {
            toast.error('Failed to add Bitcoin address');
            console.error('Error fetching data:', error);
        }

        handleCloseDialog();
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography variant="h3" gutterBottom>
                        CoinTracker Wallet Manager
                    </Typography>

                    <Button variant="contained" onClick={handleOpenDialog}>
                        Add Address
                    </Button>
                </Box>
                <hr />

                <Grid sx={{ marginTop: 2 }} container spacing={2}>
                    {bitcoinAddresses.map((address) => (
                        <AddressCard key={address.id} address={address} />
                    ))}
                </Grid>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Bitcoin Address</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
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
                    <Button onClick={handleAddAddress} disabled={newAddress === ''}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
