> npm install --save react react-dom

Create a folder `src` in root level

We need webpack for compliling react code which then we can render on browser
Because `import` is not understandable in browser

> npm install --save @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader sass sass-loader style-loader webpack webpack-cli

***Webpack*** -> is a module builder, main purpose is to bundle JS file so that we can use inside browser, like `import` needs to be `const` or respective keyword before it gets load in the browser

***Babel*** -> is a JS complier, it transpile into lower version of JS

> We have provided webpack.common.js, just copy the code which is alredy created for you to use

Add new script in `package.json`

> Run `npm run watch`
> Run `npm start`

**You can install a package to run both script at the same time**

> npm install --save concurrently

Add new script for both script together in one, (You need one terminal now on)

> Run `npm start dev`

We need a watcher to refresh our electron application

> npm install --save-dev electron-reload

> npm install --save bootstrap@4.5.0