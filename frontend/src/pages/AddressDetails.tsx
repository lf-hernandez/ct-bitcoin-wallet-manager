import { Container, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
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

    return (
        <div>
            <Container maxWidth="lg">
                <Typography variant="h3" gutterBottom>
                    Address Details
                </Typography>
                <hr />
                <Typography variant="h6">{currentAddress.address}</Typography>
                <Typography>Balance: {currentAddress.balance}</Typography>
                <Typography>
                    Number of Transactions: {currentAddress.number_of_transactions}
                </Typography>
                <Typography>Total Sent: {currentAddress.total_sent}</Typography>
                <Typography>Total Received: {currentAddress.total_received}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Transactions (raw data for testing purposes)
                </Typography>
                <List>
                    {currentAddress.raw_data.txs.map((transaction) => (
                        <div key={transaction.hash}>
                            <ListItem>
                                <ListItemText
                                    primary={`Transaction Hash: ${transaction.hash}`}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Balance: {transaction.balance}
                                            </Typography>
                                            <br />
                                            Fee: {transaction.fee}
                                            <br />
                                            Result: {transaction.result}
                                        </>
                                    }
                                />
                            </ListItem>
                            {currentAddress.raw_data.txs.length > 1 && <Divider />}
                        </div>
                    ))}
                </List>
            </Container>
        </div>
    );
};
