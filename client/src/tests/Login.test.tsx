import { render, screen, cleanup } from "@testing-library/react";
import Login from "../pages/Login";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("../components/LoginForm", () => ({
  default: () => <div data-testid="login-form">Mocked LoginForm</div>,
}));

describe("Login Page", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders login page correctly", () => {
    render(<Login />);

    const loginTexts = screen.getAllByText(/login/i);
    expect(loginTexts.length).toBeGreaterThan(0);

    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
    expect(screen.getByText(/productive/i)).toBeInTheDocument();

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
