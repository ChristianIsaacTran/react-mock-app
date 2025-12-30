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