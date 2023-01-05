# Project: testing react components in typescript

## Set up

### (1) install react with typescript

`npx create-react-app my-app --template typescript`

note: CRA includes jest

Ref: <https://create-react-app.dev/docs/adding-typescript/>

### (2) add react-test-renderer to test snapshots

`npm install --save-dev react-test-renderer`

Ref: <https://jestjs.io/docs/tutorial-react>

### (3) install jest-watch-typeahead

`npm i -D --exact jest-watch-typeahead@0.6.5`

note: this is not in the official docs! j-w-t is included as a dependency but not included in the install package

Ref: <https://stackoverflow.com/questions/70204039/failed-to-initialize-watch-plugin-node-modules-jest-watch-typeahead-filename-js>

### (4) rename master to main

`git branch --move master main`

## Tutorial

<https://app.pluralsight.com/guides/how-to-test-react-components-in-typescript>
