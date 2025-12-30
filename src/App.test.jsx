import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";


it("render h1 element", () => {
    render(<App />);
    // the slashes with i at the end is a regex case-insensitive tag, meaning that it will match it regardless of case
    expect(screen.getByText("/hello world/i")).toBeInTheDocument();
});