import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Login", () => {
  it("Renders login text", () => {
    render(<Login />);
    const loginTexts = screen.getAllByText("Login");
    expect(loginTexts.length).toBeGreaterThan(0);
  });
});
