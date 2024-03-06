export type BitcoinAddress = {
    id: string;
    address: string;
    balance: number;
    number_of_transactions: number;
    total_sent: number;
    total_received: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw_data: any;
};

export enum Page {
    'WALLET',
    'ADDRESS_DETAILS',
    'TRANSACTION_DETAILS',
}
