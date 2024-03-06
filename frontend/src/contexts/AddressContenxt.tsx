import React, { createContext, useState } from 'react';
import { BitcoinAddress } from '../types';

type AddressState = {
    currentAddress: BitcoinAddress | null;
    setCurrentAddress: (address: BitcoinAddress | null) => void;
};

export const AddressContext = createContext<AddressState>({
    currentAddress: null,
    setCurrentAddress: () => {},
});

type Props = {
    children: React.ReactNode;
};

export const AddressProvider = ({ children }: Props) => {
    const [currentAddress, setCurrentAddress] = useState<BitcoinAddress | null>(null);

    return (
        <AddressContext.Provider value={{ currentAddress, setCurrentAddress }}>
            {children}
        </AddressContext.Provider>
    );
};
