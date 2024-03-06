import { AddressProvider } from './contexts/AddressContenxt';
import { NavigationProvider } from './contexts/NavigationContext';
import { useNavigation } from './hooks/navigation';
import { AddressDetails } from './pages/AddressDetails';
import { Wallet } from './pages/Wallet';
import { Page } from './types';

const RenderContent = () => {
    const { currentPage } = useNavigation();

    switch (currentPage) {
        case Page.WALLET:
            return <Wallet />;
        case Page.ADDRESS_DETAILS:
            return <AddressDetails />;

        default:
            return null;
    }
};

function App() {
    return (
        <NavigationProvider>
            <AddressProvider>
                <RenderContent />
            </AddressProvider>
        </NavigationProvider>
    );
}

export default App;
