import { useState } from "react";

export function usePostData(url: string) {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<{ title: string; completed: boolean; id: number } | null>(null);

    const postData = async (data: any) => {
        setLoading(true);

        try {
            const fetchResponse: { ok: boolean; json: () => Promise<{ title: string; completed: boolean; id: number }> } = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await fetchResponse.json();
            setResponse(responseData);
            return responseData;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { postData, loading, error, response };
}