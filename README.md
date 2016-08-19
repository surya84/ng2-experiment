# Building Associate Portal with Angular2

Steps for running Angular2 applciation

## Installation

You need to have Node.js, Bower and Git installed. Run the following command in the project directory to install the dependencies:

```sh
$ npm i && bower i
```
Note: Currently bower is used for Polymer elements (vaddin plugins) only

## Running the Application

Type the following command to start the development server and open the application in a browser:

```sh
$ npm start
```

## No more encyption code
```sh
in new Angular2 we are not using Cryptojs. Please make your changes in your webapi controller to handle plain password.
```

## Configuration

```sh
app/config folder contains all config files for respective environments
env.json - specify the environment (You need to have respective .json file to load the configuration)

Ex:

development.json - contains for developement
Contains all API and service locations.
```
## How do I integrate a external module into application?
Ex: ng2-pagination
Here we take ng2-pagination to integrate 
    Step1: Add package into package.json -> dependencies

            "ng2-pagination": "0.3.5"

    Step2: npm install; check whether node_modules has  ng2-pagination folder, if not something wrong!
    Step3: Navigate to systemjs.config.js
    add following line to map section

        'ng2-pagination': 'node_modules/ng2-pagination'

    add following line to packages section

        'ng2-pagination': { defaultExtension: 'js' }

    We have integrated the module to our app, consume it in your typescript files.

## Others
*We are targeting ES5 and added some features of ES6 (like promise). Makesure we have typings installed properly*

*Feel free to update this help file for more infromation*
~--Surya Pabbineedi~


