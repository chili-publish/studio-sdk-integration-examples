# Basic Studio Connector example of SDK usage
This is a preview of how connectors will work on the GraFx platform. 

In this example we show how to setup and use a very simple media connector. 

If you want to know more about Connectors, and how to create your own, check [our documentation](https://github.com/chili-publish/grafx-connector-template/tree/main/docs)
 

## How to run
### Install dependencies

First of all install the SDK with the packagemanager of your preference. Both NPM and Yarn are supported.
```bash
npm install
```

or

```bash
yarn install
```
These commands will install all necessary dependencies (in this case only SDK is needed) as well as the necessary dev-dependencies to build the example.


### Build the project

After all necessary dependencies are installed, the project can be built using webpack (installed as devdependency).

```bash
npm run build
```

or

```bash
yarn build
```

### Checkout the build

The same goes for this example as for the vanilla JS example. The application is best run in a local webserver such as Apache, NGINX or MAMP/LAMP/XAMP/...
This way we ensure all functionalities are available that the application needs to load in the document and connect to the editor-engine.
The index.html file loads in the builded and transpiled index.js file in the /build folder.