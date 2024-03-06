import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useAddressContext } from '../hooks/address';
import { useNavigation } from '../hooks/navigation';
import { BitcoinAddress, Page } from '../types';

export const AddressCard = ({ address }: { address: BitcoinAddress }) => {
    const navigation = useNavigation();
    const { setCurrentAddress } = useAddressContext();

    return (
        <Grid item xs={12} sm={6} md={5}>
            <Card
                variant="elevation"
                onClick={() => {
                    setCurrentAddress(address);
                    navigation.setCurrentPage(Page['ADDRESS_DETAILS']);
                }}
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                }}
            >
                <CardContent>
                    <Typography variant="h6">{address.address}</Typography>
                    <Typography>Balance: {address.balance}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
