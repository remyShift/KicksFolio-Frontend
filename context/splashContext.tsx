import { createContext, useContext, useState, type PropsWithChildren } from 'react';

const SplashContext = createContext<{
    isSplashScreenVisible: boolean;
    setIsSplashScreenVisible: (value: boolean) => void;
}>({
    isSplashScreenVisible: true,
    setIsSplashScreenVisible: () => {},
});

export const SplashProvider = ({ children }: PropsWithChildren) => {
    const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

    return <SplashContext.Provider value={{ isSplashScreenVisible, setIsSplashScreenVisible }}>{children}</SplashContext.Provider>;
};

export const useSplash = () => useContext(SplashContext);