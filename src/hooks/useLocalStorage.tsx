import { useState, useEffect } from "react";

export function useCounter(initialValue = 0) {

    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem("counter");
        return saved ? parseInt(saved, 10) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem("counter", count.toString());
    }, [count]);

    return { count, increment: () => setCount(count + 1) };
}
