import { useState } from "react";

export default function SearchApi() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState<any>(null);

    const handleSearch = async () => {
        if (query.trim()) {
            await fetchResults(query);
        }
    };

    const fetchResults = async (query: string) => {

        if (!query) return;

        const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
        const data = await response.json();
        setData(data.items);
    }

    return (
        <div>
            <input type="text" data-testid="search-input" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button data-testid="search-button" onClick={handleSearch}>Search</button>

            <div>
                {data?.map((item: any) => (
                    <div key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.full_name}</div>
                    </div>
                ))}
            </div>
        </div>

    );
}
