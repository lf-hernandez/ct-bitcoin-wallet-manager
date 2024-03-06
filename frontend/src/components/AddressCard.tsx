import { Card, CardContent, Grid, Typography } from '@mui/material';
import { BitcoinAddress } from '../types';

export const AddressCard = ({ address }: { address: BitcoinAddress }) => {
    return (
        <Grid item xs={12} sm={6} md={5}>
            <Card variant="elevation">
                <CardContent>
                    <Typography variant="h6">{address.address}</Typography>
                    <Typography>Balance: {address.balance}</Typography>
                    <Typography>
                        Number of Transactions: {address.number_of_transactions}
                    </Typography>
                    <Typography>Total Sent: {address.total_sent}</Typography>
                    <Typography>Total Received: {address.total_received}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
