import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../login';

describe('Login Component', () => {
    it('should render login form', () => {
        render(<Login />);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    });

    it('should update input values when user types', () => {
        render(<Login />);

        const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
        const passwordInput = screen.getByLabelText('Senha:') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('should show error message for incorrect credentials', () => {
        render(<Login />);

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Senha:');
        const loginButton = screen.getByRole('button', { name: 'Entrar' });

        fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        expect(screen.getByTestId('error-message')).toHaveTextContent('Usuário ou senha incorretos');
    });

    it('should login successfully with correct credentials', () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
        render(<Login />);

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Senha:');
        const loginButton = screen.getByRole('button', { name: 'Entrar' });

        fireEvent.change(emailInput, { target: { value: 'usuario@correto.com' } });
        fireEvent.change(passwordInput, { target: { value: 'senhacorreta' } });
        fireEvent.click(loginButton);

        expect(alertMock).toHaveBeenCalledWith('Login bem-sucedido!');
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

        alertMock.mockRestore();
    });
});