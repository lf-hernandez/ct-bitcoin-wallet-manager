import { useEffect, useState } from 'react';
import './App.css';

type BitcoinAddress = {
    id: string;
    address: string;
};
function App() {
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
        <>
            <h1>CoinTracker Wallet Manager</h1>
            <h3>Bitcoin Addresses</h3>
            <ul>
                {bitcoinAddresses.map((address) => (
                    <li style={{ listStyle: 'none' }} key={address.id}>
                        {address.address}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
