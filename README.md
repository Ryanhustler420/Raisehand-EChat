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

> npm install --save redux react-redux
> npm install --save redux-thunk
> npm install --save react-hook-form

Since we are successfully register a new user via firebase api, we also need to create a model document inside db which represent user details,

```javascript

const uProfile = {
        uid: user.uid, 
        username: 'some@44', 
        email: 'email.@domain.com', 
        avatar: 'https://placeholder.py/125x150',
        joinedChats: []
    }

```

> npm install --save @reduxjs/toolkit

> npm install --save moment

> npm install --save-dev webpack-merge

Now you just need to run `npm run build` in order to make a production build and produce an executable file for ready to use

After build, you will get a /build directory on root level of the project, and there will be a source map of code as well

> npm start

NOTE: not this command will run your code as production build, so everytime you change your code, you have to build your project with `npm run build` and the `npm start`

#Build Process

> npm install --save-dev electron-builder

> Resources

``
(Apple Package Name)[https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8]

``

NOTE:

``
The Hardened Runtime, along with System Integrity Protection (SIP),
protects the runtime integrity of your software by preventing certain classes of
exploits, like code injection, dynamically linked library (DLL) hijacking

It enforces code signing and verifies downloaded applications before allowing them to run, thereby reducing the likelihood of inadvertently executing malware.

``
> npm run make:win

##### OR (Recommended) [12.10.1 >= node version]

> npm install -g electron-packager
> electron-packager --help
> electron-packager --version
> electron-packager . --electron-version="13.1.2" --asar=true

>> Make sure you execute the above command while you are in the root level of the project

## Issues

> (Menu)[https://github.com/electron/electron/issues/2591]

> (Installer)[https://ourcodeworld.com/articles/read/927/how-to-create-a-msi-installer-in-windows-for-an-electron-framework-application]

*Finished (Thanku)*