import { useContext } from "react";
import { SnapContext } from "../../context/SnapProvider";

export default function Snap() {
    const snapContext = useContext(SnapContext);

    if (!snapContext) {
        return null;
    }

    const { snap, setSnap } = snapContext;

    const handleClick = () => {
        setSnap(!snap);
    };

    return (
        <div>
            <button data-testid="button" onClick={handleClick}>SNAP</button>
            <div data-testid="snap">{snap ? 'SNAP ON' : 'SNAP OFF'}</div>
        </div>
    );
}