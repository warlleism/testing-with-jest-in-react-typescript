import { useEffect, useState } from "react";

export default function useGetData() {
    const [data, setData] = useState<{ id: number, title: string, completed: boolean } | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            const data = await response.json();
            return { ...data, completed: data.completed || false };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData().then(data => setData(data));
        setLoading(false)
    }, [])

    return { data, loading, error }
}