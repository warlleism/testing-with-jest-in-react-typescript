import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { usePostData } from '../hooks/usePostData';

// Mock fetch to control its behavior in tests
(window as any).fetch = jest.fn();

describe('usePostData Hook', () => {

    const mockUrl = 'https://example.com/posts';
    const mockData = { title: 'Test Post', completed: false };
    const mockResponseData = { ...mockData, id: 1 };

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('should successfully post data', async () => {
        // Mock a successful fetch response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponseData)
        });

        const { result } = renderHook(() => usePostData(mockUrl));

        // Perform the post operation
        let postResult;
        
        await act(async () => {
            postResult = await result.current.postData(mockData);
        });

        // Assertions
        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockData)
        });
        expect(postResult).toEqual(mockResponseData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.response).toEqual(mockResponseData);
    });

    test('should handle fetch error', async () => {
        // Mock a fetch error
        const errorMessage = 'Network Error';
        (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => usePostData(mockUrl));

        // Perform the post operation
        let postResult;
        await act(async () => {
            postResult = await result.current.postData(mockData);
        });

        // Assertions
        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockData)
        });
        expect(postResult).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.response).toBeNull();
    });

    test('should set loading state correctly', async () => {
        // Create a promise that we can resolve/reject manually
        let resolveFetch: (value: any) => void;
        const fetchPromise = new Promise((resolve) => {
            resolveFetch = resolve;
        });

        (fetch as jest.Mock).mockImplementationOnce(() => fetchPromise);

        const { result } = renderHook(() => usePostData(mockUrl));

        // Start the post operation
        let postResultPromise: Promise<any>;
        act(() => {
            postResultPromise = result.current.postData(mockData);
        });

        // Check loading state is true immediately
        expect(result.current.loading).toBe(true);

        // Resolve the fetch promise
        await act(async () => {
            resolveFetch({
                ok: true,
                json: () => Promise.resolve(mockResponseData)
            });
            await postResultPromise;
        });

        // Check loading state is false after completion
        expect(result.current.loading).toBe(false);
    });
});