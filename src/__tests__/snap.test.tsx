import { render, fireEvent } from '@testing-library/react';
import { SnapContext } from '../context/SnapProvider';
import Snap from '../pages/snap/snap';
import '@testing-library/jest-dom';
import { useState } from 'react';

const mockSetSnap = jest.fn();

const mockSnapContext = {
    snap: false,
    setSnap: jest.fn((value: React.SetStateAction<boolean>) => {
        mockSnapContext.snap = typeof value === 'function'
            ? value(mockSnapContext.snap)
            : value;
        mockSetSnap(mockSnapContext.snap);
    }) as React.Dispatch<React.SetStateAction<boolean>>
};


describe('Snap Component', () => {

    test('should render "SNAP OFF" initially', () => {

        mockSnapContext.snap = false;

        const { getByTestId } = render(
            <SnapContext.Provider value={mockSnapContext}>
                <Snap />
            </SnapContext.Provider>
        );

        expect(getByTestId('snap')).toHaveTextContent('SNAP OFF');
    });

    test('should render "SNAP ON" when snap is true', () => {

        mockSnapContext.snap = true;

        const { getByTestId } = render(
            <SnapContext.Provider value={mockSnapContext}>
                <Snap />
            </SnapContext.Provider>
        );

        expect(getByTestId('snap')).toHaveTextContent('SNAP ON');
    });

    test('should toggle snap state when button is clicked', () => {

        mockSnapContext.snap = false;

        const { getByRole } = render(
            <SnapContext.Provider value={mockSnapContext}>
                <Snap />
            </SnapContext.Provider>
        );

        const button = getByRole('button', { name: /SNAP/i });
        fireEvent.click(button);

        expect(mockSetSnap).toHaveBeenCalledWith(true);
    });

    test("should toggle snap state multiple times when button is clicked", async () => {

        const TestWrapper = () => {
            const [snap, setSnap] = useState(false);
            return (
                <SnapContext.Provider value={{ snap, setSnap }}>
                    <Snap />
                </SnapContext.Provider>
            );
        };

        const { getByTestId } = render(<TestWrapper />);

        const button = getByTestId("button");

        // Primeiro clique
        fireEvent.click(button);
        expect(getByTestId("snap")).toHaveTextContent("SNAP ON");

        // Segundo clique
        fireEvent.click(button);
        expect(getByTestId("snap")).toHaveTextContent("SNAP OFF");
    });
});