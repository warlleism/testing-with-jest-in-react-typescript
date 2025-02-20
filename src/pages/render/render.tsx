import { useState } from 'react';
import { items } from './data';

export function Render() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextItem = () => {
        setCurrentIndex((prevIndex) => prevIndex === items.length - 1 ? 0 : prevIndex + 1);
    };

    const currentItem = items[currentIndex];

    return (
        <div>
            <div>
                <h2>{currentItem?.title}</h2>
                <p>{currentItem?.description}</p>
            </div>
            <button onClick={handleNextItem}>
                Próximo Item
            </button>
        </div>
    );
}
