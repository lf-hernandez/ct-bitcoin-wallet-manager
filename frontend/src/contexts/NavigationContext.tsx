import { createContext, useState } from 'react';
import { Page } from '../types';

type NavigationState = {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
};

export const NavigationContext = createContext<NavigationState>({
    currentPage: Page.WALLET,
    setCurrentPage: () => {},
});

type Props = {
    children: React.ReactNode;
};

export const NavigationProvider = ({ children }: Props) => {
    const [currentPage, setCurrentPage] = useState(Page.WALLET);

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
};
