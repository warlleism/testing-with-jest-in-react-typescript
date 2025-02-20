import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "../pages/home/home";

describe("<Home />", () => {

    test("should display TRUE in div", async () => {
        const { getByTestId } = render(<Home />);

        const testeDiv = getByTestId("teste-div");
        expect(testeDiv).toBeInTheDocument();
        expect(testeDiv).toHaveTextContent("true");
    });

    test("should display FALSE in div where button is clicked", async () => {
        const { getByTestId, getByText } = render(<Home />);

        const button = getByText("Click");
        fireEvent.click(button);

        const testDiv = getByTestId("teste-div");
        expect(testDiv).toBeInTheDocument();
        expect(testDiv).toHaveTextContent("false");
    })

    test("should render user information", () => {
        const users = [
            { id: 1, name: "John Doe", email: "john@example.com", active: true },
            { id: 2, name: "Jane Doe", email: "jane@example.com", active: true },
            { id: 3, name: "Bob Doe", email: "bob@example.com", active: true },
        ];

        const { getByTestId, getByText } = render(<Home />);

        const userDiv = getByTestId("teste-users");
        expect(userDiv).toBeInTheDocument();

        users.forEach((user) => {
            expect(getByText(user.name)).toBeInTheDocument();
            expect(getByText(user.email)).toBeInTheDocument();
            expect(getByTestId(`teste-users-active-${user.id}`)).toHaveTextContent(user.active ? "True" : "False");
        });

        const button1 = getByTestId("change-button-1");
        fireEvent.click(button1);

        expect(getByTestId("teste-users-active-1")).toHaveTextContent("False");
    });
});