import { createContext, useState } from "react";

interface SnapContextType {
    snap: boolean ;
    setSnap: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SnapContext = createContext<SnapContextType | null>(null);

export default function SnapProvider({ children }: { children: React.ReactNode }) {
  
    const [snap, setSnap] = useState<boolean>(false);

    return (
        <SnapContext.Provider value={{ snap, setSnap }}>
            {children}
        </SnapContext.Provider>
    )
}