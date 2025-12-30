import { describe, it, expect, vi, mockImplementationOnce } from "vitest";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/* 
mocks the fetch function to simulate a call to the API, but not a REAL call to the api.
during unit testing, you shouldn't make a real call to the API since we want to test the actual code rather than if the browser 
calls the API. Also calling the API during testing could waste resources, so mocking external resources or event modules/components 
is the way to go to isolate the testing to one component.
*/
window.fetch = vi.fn(() => {
  const user = { name: "Jack", email: "jack@email.com" };

  return Promise.resolve({
    json: () => Promise.resolve(user),
  });
});

it.skip("render h1 element", () => {
  render(<App />);

  // the slashes with i at the end is a regex case-insensitive tag, meaning that it will match it regardless of case. Reminder to not puts quotes around regex slashes //
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});

it.skip("list contains 5 animals", () => {
  render(<App />);

  const listElement = screen.getByRole("list");
  const listItems = screen.getAllByRole("listitem");

  // assert that list HTML element is in the DOM, that it has the class name "animals", and that the list contains exactly 5 items in it
  expect(listElement).toBeInTheDocument();
  expect(listElement).toHaveClass("animals");
  expect(listItems.length).toBe(5);
});

describe("Testing App Component", () => {
  it.skip("loading text is shown while API request is in progress", async () => {
    render(<App />);

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });

  it.skip("user's name is rendered", async () => {
    render(<App />);
    const userName = await screen.findByText("Jack");
    expect(userName).toBeInTheDocument();
  });

  it("error message is shown", async () => {
    /*
    .mockImplementationOnce() is a jest/vitest thing. They both have this and it overrides the original mocked function
    only once with the given implementation in the given callback function. In this case, we use it to 
    force the mocked API to fail and it will return a Promise.reject request with that object messsage for the error 
    */
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: "API is down" });
    });

    render(<App />);

    const errorMessage = await screen.findByText("API is down");
    expect(errorMessage).toBeInTheDocument();
  });
});


/*
The guide goes over two more examples to demonstrate the userEvent and mocking callback handlers.

1. using userEvent to simulate user interactions:
    - it makes us rewrite App.jsx again to have a counter that incremenets and decrements with a button. 
    - the guide uses a custom html data-testid attribute in the <h2> label so that we can query the counter with .getByTestId()
    - Once the buttons are made, we make one test to assert that each button does it's job. So we get the increment button 
    by querying the text with the increment one being .getByText("Increment") and then invoking the userEvent on it by 
    using the queried button to call a function from userEvent. Same thing for the decrement button:
    ex: 
    const incrementBtn = screen.getByText("Increment");

    userEvent.click(incrementBtn); //simulates a click
    userEvent.click(incrementBtn); //simulates another click

    // assert that the button has been clicked two times
    expect(counter.textContent).toEqual("2");

    // note: we use the string "2" instead of the numerical 2 because we are comparing the textContent, so a string to a string 

2. mocking callback handlers:
    - it makes us rewrite the App.jsx again to make a simple input html element for a form with a value attribute and a onChange handler to 
    change the input when typing. 
    - we also use userEvent to simulate the user typing into the text field.
    - we use vitest vi.fn() to mock the basic callback function to count how many times we called it with .toHaveBeenCalledTimes(). 
    ex: 

    const handler = vi.fn();

    // render a custom Input component with the mocked onChange handler
    render(<Input handleChange={handler} inputValue="" />);

    const input = screen.getByRole("textbox");

    // .type(queried element, "message to type into the input element")
    userEvent.type(input, "React");

    expect(handler).toHaveBeenCalledTimes(5);

    - since we are using userEvent to simulate the user typing into the text input element and we are 
    simulating typing in "React", the onChange callback should be called 5 times since there are 5 letters in "React".
*/
