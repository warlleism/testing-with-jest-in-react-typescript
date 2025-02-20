import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../hooks/useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => store[key] = value.toString(),
        clear: () => store = {}
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('useCounter Hook', () => {

    beforeEach(() => {
        localStorageMock.clear();
    });

    test('should initialize with default value', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
    });

    test('should initialize with custom initial value', () => {
        const { result } = renderHook(() => useCounter(10));
        expect(result.current.count).toBe(10);
    });

    test('should initialize from localStorage if value exists', () => {
        localStorage.setItem('counter', '5');
        const { result } = renderHook(() => useCounter())
        expect(result.current.count).toBe(5);
    });

    test('should increment count', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1);
    });

    test('should save incremented value to localStorage', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.increment();
        });

        expect(localStorage.getItem('counter')).toBe('1');
    });
});