import '@testing-library/jest-dom';
import useGetData from "../hooks/useGetData";
import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

jest.mock('../hooks/useGetData', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe("useGetData", () => {
    const mockedUseGetData = jest.mocked(useGetData);

    test("fetchData should return mock data", async () => {
        const mockData = { id: 1, title: "Test todo", completed: false };
        mockedUseGetData.mockReturnValue({ data: mockData, loading: false, error: null }); //mock do retorno do custom hook

        const { result } = renderHook(() => useGetData());

        expect(result.current.data).toEqual(mockData);
    });

    test("fetchData should handle initial null state", () => {
        mockedUseGetData.mockReturnValue({ data: null, loading: false, error: null });

        const { result } = renderHook(() => useGetData());

        expect(result.current.data).toBeNull();
    });
})
