import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

//temp webpage to test routing behaviour
jest.mock("./pages/Home/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/About/About", () => () => <div>About Page</div>);
jest.mock("./pages/Menu/Menu", () => () => <div>Menu Page</div>);
jest.mock("./pages/Reservations/Reservations", () => () => <div>Reservations Page</div>);
jest.mock("./pages/Orders/Orders", () => () => <div>Orders Page</div>);
jest.mock("./pages/Login/Login", () => () => <div>Login Page</div>);

describe("App routing", () => {
  test("renders App component container", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("app-component")).toBeInTheDocument();
  });

  test("renders Home page on default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Reservations page on /reservations route", () => {
    render(
      <MemoryRouter initialEntries={["/reservations"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Reservations Page")).toBeInTheDocument();
  });

  test("renders fallback Home page on unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});