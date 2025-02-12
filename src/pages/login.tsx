import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (email !== "usuario@correto.com" || password !== "senhacorreta") {
            setError("Usuário ou senha incorretos");
        } else {
            setError("");
            alert("Login bem-sucedido!");
        }
    };

    return (
        <form>
            <h2>Login</h2>
            <label>
                Email:
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <br />
            <label>
                Senha:
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <br />
            {error && <p style={{ color: "red" }} data-testid="error-message">{error}</p>}
            <button type="button" onClick={handleLogin}>Entrar</button>
        </form>
    );
};

export default Login;
