import { useContext } from 'react';
import { AddressContext } from '../contexts/AddressContenxt';

export const useAddressContext = () => {
    return useContext(AddressContext);
};
