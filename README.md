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

> npm install --save react-router-dom

Time to create a firestore database, please create an account in google firebase
Login to console and create an app, create a database and setup until you see firestore tab taking you to collection system, once done create few collections based on requirement, like `chats` and create few demo documents,

Collection we are using,

```javascript

// in firestore create two bogus document inside collection `chats` so that you can fetch something in the first place to see if connection is correct or not

const chats = {
    'KwNzwNk8F07WR1SlxzS5' : {
        admin: 'sdakdjlkajsldkjasd',
        description: 'Tips and Tricks in C++',
        image: 'https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg',
        name: 'C++ Programming',
    },
        'nbL01o7QfRgWp2CVcBcW' : {
        admin: 'fakjshfjlahsdfljkh6454654564asfd',
        description: 'Just short discussion about game ',
        image: 'https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg',
        name: 'About Games',
    }
}

```

> Go to project setting on left cornor of firebase console
> Click on add new web app
> Name your project and click next and it will show some config
> Please make sure you open your db rules and allow read/write for all users

> npm install --save firebase

> npm install dotenv-webpack --save-dev

You need to use webpack to provide process.env data into react, there is no stright way to do this.

NOTE: Restart your webpack since you have alter the webpack and added new plugin into.