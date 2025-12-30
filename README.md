# note to self

- after coming back to the odin project after christmas break, I tried to make a vite react project 
with the "npm create vite@latest someproject -- --template react", but I forgot that the name of the project 
cannot have capital letters due to npm's naming convention. Make sure when making future projects to not have any
capital letters in the project name.

## purpose of this repo

- this is going over the example assignment in the react mock components and callbacks section in the odin project.

## remember to setup the testing suite and config files

npm install --save-dev vitest

npm install jsdom --save--dev

npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

1. vitest: the main test suite 
2. jsdom: enables HTML in Vitest
3. @testing-library/react: includes render function and screen functions like .getByRole()
4. @testing-library/jest-dom: includes custom matchers and assertive functions like .toBeInTheDocument()
5. @testing-library/user-event: API that simulates user interactions with the webpage elements

## vite.config.js

- add a new section to the config file:

test: {
    globals: true,
    setupFiles: "path to the setup.js",
    environment: "jsdom",
}

## setup.js file

- make a setup file so that vitest can run this upon test suite setup:

setup.js:

import {expect, afterEach} from "vitest";
import {cleanup} from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(()=> {
    cleanup();
});

- make sure to include this setup file inside the vite.config.js

## note in testing:

- if I want to inspect the html structure of the component, there is an optional screen.debug() function that I can call
that would show me the component's html structure during the npm run test script.

## main takeaway

1. to simulate a callback to track the number of times its been called to assert it with build in functions through vitest like
.toHaveBeenCalledTimes() or checking if it was even called at all with .toHaveBeenCalled(), we use:

    const mockedCallback = vi.fn();

2. to simulate an entire module or override a component's implementation, we use:

    vi.mock("path to mocked file", () => ({someProp}) => <div data-testid="someName">{someProp}</div>);

    - where the first arrow function tells the .mock() function that we are overriding the logic, then the second arrow function is the 
    actual replacement for the implementation. In this case above we are overriding the logic with a new function that accepts some kind of 
    prop named "someProp" then returning a react component that uses "someProp" inside the div with a data-testid attribute to query later in the 
    testing phase.


3. Mocking is used to isolate the thing we are trying to test by "simulating" external things like API calls or even entire modules or components 
to only test the behavior of the main thing itself. Mocking the callbacks or the child components/API calls makes the outside factors predictable
and allows us to only interact with the main component during testing.