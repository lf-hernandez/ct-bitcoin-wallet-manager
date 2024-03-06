import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddressCard } from '../components/AddressCard';
import { BitcoinAddress } from '../types';

export const Wallet = () => {
    const [bitcoinAddresses, setBitcoinAddresses] = useState<Array<BitcoinAddress>>([]);

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
                <Typography variant="h5" gutterBottom>
                    Bitcoin Addresses
                </Typography>
                <Grid container spacing={2}>
                    {bitcoinAddresses.map((address) => (
                        <AddressCard key={address.id} address={address} />
                    ))}
                </Grid>
            </Container>
        </div>
    );
};
