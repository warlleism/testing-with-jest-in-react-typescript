import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { usePostData } from '../hooks/usePostData';

(window as any).fetch = jest.fn(); //Isso permite que você simule respostas de API sem realmente fazer requisições HTTP.

describe('usePostData Hook', () => {

    const mockUrl = 'https://example.com/posts';
    const mockData = { id: 1, title: 'Test Post', completed: false };
    const mockResponseData = mockData;

    beforeEach(() => { // Limpa todos os mocks antes de cada teste para garantir que um teste não interfira no outro.
        jest.clearAllMocks();
    });

    test('should successfully post data', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ //configuração do fetch para retornar uma resposta bem-sucedida (ok: true) com os dados fictícios (mockResponseData).
            ok: true,
            json: () => Promise.resolve(mockResponseData)
        });

        const { result } = renderHook(() => usePostData(mockUrl)); //Renderização do Hook

        let postResult;

        await act(async () => { //act - garantir que todas as atualizações de estado e efeitos sejam aplicados antes de fazer asserções.
            postResult = await result.current.postData(mockData);
        });

        expect(fetch).toHaveBeenCalledWith(mockUrl, { // Verifica se o fetch foi chamado com a URL correta, método POST, cabeçalhos e corpo da requisição
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockData)
        });
        expect(result.current.loading).toBe(false); // Verifica se o resultado da requisição é o esperado
        expect(result.current.error).toBeNull(); // Verifica se o resultado da requisição é o esperado
        expect(postResult).toEqual(mockResponseData); // Verifica se o resultado da requisição é o esperado
        expect(result.current.response).toEqual(mockResponseData); // Verifica se o resultado da requisição é o esperado
    });

    test('should handle fetch error', async () => {
        const errorMessage = 'Network Error';
        (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage)); //mockRejectedValueOnce - configura o mock para que a próxima chamada ao fetch retornará uma Promise rejeitada

        const { result } = renderHook(() => usePostData(mockUrl));

        let postResult;
        await act(async () => {
            postResult = await result.current.postData(mockData);
        });

        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockData)
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(errorMessage);
        expect(postResult).toBeNull();
        expect(result.current.response).toBeNull();
    });
});