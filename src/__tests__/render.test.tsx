import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Render } from '../pages/render/render';

jest.mock('../pages/render/data', () => ({
    items: [
        {
            id: 1,
            img: 'test-image-1.jpg',
            title: 'Test Title 11',
            description: 'Test Description 1'
        },
        {
            id: 2,
            img: 'test-image-2.jpg',
            title: 'Test Title 22',
            description: 'Test Description 2'
        },
        {
            id: 3,
            img: 'test-image-3.jpg',
            title: 'Test Title 33',
            description: 'Test Description 3'
        }
    ]
}));

describe("<Render />", () => {

    test("should render first item correctly", () => {

        const { getByText } = render(<Render />);
        expect(getByText("Test Title 11")).toBeInTheDocument();

    });

    test("should render second item correctly", () => {

        const { getByText, getByRole } = render(<Render />);

        const button = getByRole("button", { name: "Próximo Item" });
        fireEvent.click(button);

        expect(getByText("Test Title 22")).toBeInTheDocument();

        fireEvent.click(button);

        expect(getByText("Test Title 33")).toBeInTheDocument();

        fireEvent.click(button);

        expect(getByText("Test Title 11")).toBeInTheDocument();
    })


});
