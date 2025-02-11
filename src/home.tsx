import { useState } from "react";

export default function Home() {

    const [text, setText] = useState(true)

    const [user, setUser] = useState<any[] | null>([
        { id: 1, name: "John Doe", email: "john@example.com", active: true },
        { id: 2, name: "Jane Doe", email: "jane@example.com", active: true },
        { id: 3, name: "Bob Doe", email: "bob@example.com", active: true },
    ])


    const handleActive = (email: string) => {
        const newUser = user?.map((user) => user.email === email ? { ...user, active: !user.active } : user)
        setUser(newUser as any)
    }


    return (
        <>
            <div>
                <button id="button1" onClick={() => setText(!text)}>Click</button>
                {text ? <div data-testid="teste-div">true</div> : <div data-testid="teste-div">false</div>}
            </div>
            <div data-testid="teste-users" style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 30 }}>
                {user?.map((item) => (
                    <div key={item.email}>
                        <div data-testid={`teste-users-name-${item.id}`}>{item.name}</div>
                        <div data-testid={`teste-users-email-${item.id}`}>{item.email}</div>
                        <div data-testid={`teste-users-active-${item.id}`}>{item.active ? "True" : "False"}</div>
                        <button data-testid={`change-button-${item.id}`} onClick={() => handleActive(item.email)}>Change status</button>
                    </div>
                ))}
            </div>
        </>
    );
}

