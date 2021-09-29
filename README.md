# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

- `npm install`
- `npx kill-port 3000`
- `npm start`

## Learn More

- [ ] [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [ ] [React documentation](https://reactjs.org/).
- [ ] [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [ ] [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [ ] [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [ ] [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [ ] [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [ ] `npm run build` [fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Personal Notes

### Turotial proposed improvements

- [x] Display the location for each move in the format (col, row) in the move history list.
- [x] Bold the currently selected item in the move list.
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them.
- [x] Add a toggle button that lets you sort the moves in either ascending or descending order.
- [x] When someone wins, highlight the three squares that caused the win.
- [x] When no one wins, display a message about the result being a draw.

### Read/Watch List

- [ ] [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html#examples)
- [x] [Basics of React](https://www.youtube.com/watch?v=dGcsHMXbSOA&t=2235s)

### Notes

#### React
`import React from 'react';`

- JSX
- function components
- [`Component`](https://reactjs.org/docs/react-component.html)
- [`useState`](https://reactjs.org/docs/hooks-state.html)


`import ReactDOM from 'react-dom';`

- `render(...)`
```javascript
ReactDOM.render(
  <MainComponent />,
  document.getElementById('root')
);		
```

#### Development Environment
Sublime text: set the syntax to jsx : `ctrl + shift + p` > `ss jsx`
[Chrome devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)