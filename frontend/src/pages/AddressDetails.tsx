import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Box, Button, Card, CardContent, Container, Divider, Typography } from '@mui/material';
import toast from 'react-hot-toast';

import { useAddressContext } from '../hooks/address';
import { useNavigation } from '../hooks/navigation';
import { Page } from '../types';

export const AddressDetails = () => {
    const { currentAddress } = useAddressContext();
    const { setCurrentPage } = useNavigation();

    if (!currentAddress) {
        setCurrentPage(Page.WALLET);
        return null;
    }

    const iconStyle = { color: 'blue', verticalAlign: 'middle', marginRight: '4px' };
    const handleSync = async () => {
        try {
            const response = await fetch(`api/address/sync/${currentAddress.address}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            toast.success('Sync complete');
        } catch (error) {
            toast.error('Sync failed');
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button startIcon={<ArrowBackIcon />} onClick={() => setCurrentPage(Page.WALLET)}>
                    Back
                </Button>
                <Typography variant="h4">Address Details</Typography>
                <Button startIcon={<DeleteIcon />} variant="contained" color="error">
                    Delete
                </Button>
            </Box>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{ marginRight: 2 }}>
                        {currentAddress.address}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <ShowChartIcon style={iconStyle} />
                        <Typography variant="body1">Balance: {currentAddress.balance}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <ShowChartIcon style={iconStyle} />
                        <Typography variant="body1">
                            Transactions: {currentAddress.number_of_transactions}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <ShowChartIcon style={iconStyle} />
                        <Typography variant="body1">
                            Total Sent: {currentAddress.total_sent}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <ShowChartIcon style={iconStyle} />
                        <Typography variant="body1">
                            Total Received: {currentAddress.total_received}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <Box>
                <Button variant="contained" color="secondary" onClick={handleSync}>
                    Synchronize Transactions
                </Button>
            </Box>

            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                Transactions
            </Typography>
            {currentAddress.raw_data.txs.map(
                (transaction: { hash: string; balance: number; fee: number; result: number }) => (
                    <Card key={transaction.hash} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                Transaction Hash: {transaction.hash}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Balance: {transaction.balance}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Fee: {transaction.fee}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Result: {transaction.result}
                            </Typography>
                        </CardContent>
                        {currentAddress.raw_data.txs.length > 1 && <Divider />}
                    </Card>
                )
            )}
        </Container>
    );
};
