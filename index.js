#!/usr/bin/env node
let shell = require("shelljs");
let colors = require("colors");
let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;
let fs = require("fs-extra");

const emptyAndCopyDirectory = () => {
  fs.emptyDir(`${appDirectory}/src/`, function(err) {
    if (err) return console.error(err);
    console.log("deletedDirectory!");
  });
  fs.copy("./template/src", `${appDirectory}/src`, function(err) {
    if (err) return console.error(err);
    console.log("success!");
  });
  fs.copy(
    "./template/config-overrides.js",
    `${appDirectory}/config-overrides.js`,
    function(err) {
      if (err) return console.error(err);
      console.log("success!");
    }
  );
};
const createEntity = entityName => {
  const name = entityName.charAt(0).toLowerCase() + entityName.slice(1);
};
const run = async () => {
  switch (appName) {
    case "--add-store-item":
      let entityName = process.argv[3];

      createEntity(entityName);
      console.log(appName, entityName);
      break;
    default:
      let success = await createReactApp();
      if (!success) {
        console.log(
          "Something went wrong while trying to create a new React app using create-react-app"
            .red
        );
        return false;
      }
      emptyAndCopyDirectory();
      console.log("template copied successfully!!");
      updatePackageScripts();
      console.log("package.json updated successfully!!");
      console.log("installing all packages. This could be a while.");
      await installPackages();
      console.log("All done");
      break;
  }
};

const updatePackageScripts = async () => {
  let packagePath = `${appDirectory}/package.json`;
  let packageJson = require(packagePath);
  packageJson.scripts = {
    start: "react-app-rewired start",
    build: "react-app-rewired build",
    test: "react-app-rewired test",
    eject: "react-scripts eject"
  };
  fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2), function(
    err
  ) {
    if (err) return console.log(err);
    console.log("writing to " + packagePath);
  });
};

const createReactApp = () => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`create-react-app ${appName}`, code => {
        console.log("Exited with code ", code);
        console.log("Created react app");
        resolve(true);
      });
    } else {
      console.log("\nNo app name was provided.".red);
      console.log("\nProvide an app name in the following format: ");
      console.log("\ncreate-react-redux-router-app ", "app-name\n".cyan);
      resolve(false);
    }
  });
};

const installPackages = () => {
  return new Promise(resolve => {
    console.log(
      "\nInstalling redux, react-router, react-router-dom, react-redux, and redux-thunk\n"
        .cyan
    );
    shell.exec(
      `npm install -D redux react-router react-redux redux-thunk react-router-dom dw-app-wrapper babel-plugin-import react-app-rewire-less react-app-rewired`,
      () => {
        console.log("\nFinished installing packages\n".green);
        resolve();
      }
    );
  });
};
run();
