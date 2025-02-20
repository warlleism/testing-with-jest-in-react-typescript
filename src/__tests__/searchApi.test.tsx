import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchApi from '../pages/searchApi/searchApi';
import '@testing-library/jest-dom';

// Mock the fetch function
(window.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            items: [
                { id: 1, name: 'test-repo', full_name: 'test-owner/test-repo' },
                { id: 2, name: 'another-repo', full_name: 'another-owner/another-repo' }
            ]
        }),
        ok: true
    })
) as jest.Mock;

describe('SearchApi Component', () => {

    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    test('renders input and button', () => {
        const { getByTestId } = render(<SearchApi />);

        const input = getByTestId('search-input');
        const button = getByTestId('search-button');

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('updates input value on typing', () => {
        const { getByTestId } = render(<SearchApi />);

        const input = getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'react' } });

        expect(input).toHaveValue('react');
    });

    test('calls fetch with correct query when search button is clicked', async () => {
        const { getByTestId } = render(<SearchApi />);

        const input = getByTestId('search-input');
        const button = getByTestId('search-button');

        // Type a search query
        fireEvent.change(input, { target: { value: 'react' } });
        fireEvent.click(button);

        // Wait for fetch to be called
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('https://api.github.com/search/repositories?q=react');
        });
    });

    test('does not call fetch when query is empty', async () => {
        const { getByTestId } = render(<SearchApi />);

        const input = getByTestId('search-input');
        const button = getByTestId('search-button');

        // Type an empty string
        fireEvent.change(input, { target: { value: ' ' } });
        fireEvent.click(button);

        // Wait to ensure fetch is not called
        // Wait to ensure fetch is not called when query is empty
        // This is a workaround because waitFor does not support async/await
        await waitFor(() => {
            expect(fetch).not.toHaveBeenCalled();
        });
    });

    test('updates data state after successful fetch', async () => {
        const { getByTestId, findByText } = render(<SearchApi />);
    
        const input = getByTestId('search-input');
        const button = getByTestId('search-button');
    
        // Simular digitação no input
        fireEvent.change(input, { target: { value: 'react' } });
    
        // Simular clique no botão
        fireEvent.click(button);
    
        // Esperar os itens aparecerem na tela
        expect(await findByText('test-repo')).toBeInTheDocument();
        expect(await findByText('another-repo')).toBeInTheDocument();
    });

});