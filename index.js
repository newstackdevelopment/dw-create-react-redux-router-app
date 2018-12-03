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
  fs.copy(`${__dirname}/template/src`, `${appDirectory}/src`, function(err) {
    if (err) return console.error(err);
    console.log("success!");
  });
  fs.copy(
    `${__dirname}/template/config-overrides.js`,
    `${appDirectory}/config-overrides.js`,
    function(err) {
      if (err) return console.error(err);
      console.log("success!");
    }
  );
};
const createEntity = async entityName => {
  const name = entityName.charAt(0).toLowerCase() + entityName.slice(1);
  const uName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  fs.access("./src/store/", fs.constants.F_OK, err => {
    if (err) {
      console.log(
        "current directory does not have the src/store folder. Make sure the folder exists before continuing"
      );
      return;
    }
    fs.copy(`${__dirname}/NewModelTemplate`, `./src/store/${uName}`, err => {
      if (err) return console.error(err);
      fs.renameSync(
        `./src/store/${uName}/NewModelActions.js`,
        `./src/store/${uName}/${uName}Actions.js`,
        err => {}
      );
      fs.renameSync(
        `./src/store/${uName}/NewModelConsts.js`,
        `./src/store/${uName}/${uName}Consts.js`,
        err => {}
      );
      fs.renameSync(
        `./src/store/${uName}/NewModelModel.js`,
        `./src/store/${uName}/${uName}Model.js`,
        err => {}
      );
      fs.renameSync(
        `./src/store/${uName}/NewModelReducer.js`,
        `./src/store/${uName}/${uName}Reducer.js`,
        err => {}
      );
      prependFiles(name, `${uName}Reducer`);
      console.log("template copied successfully");
    });
  });
};

const prependFiles = (entityName, fileName) => {
  const uName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const allCapsName = entityName.toUpperCase();
  addToReducer(entityName);

  const data = fs.readFileSync(`./src/store/${uName}/${uName}Reducer.js`);
  const fd = fs.openSync(`./src/store/${uName}/${uName}Reducer.js`, "w+");
  const newData = data
    .toString()
    .replace(/SET_NewModel/g, `SET_${allCapsName}`)
    .replace(/NewModel/g, `${uName}`);
  fs.writeSync(fd, newData, 0, newData.length);

  const constData = fs.readFileSync(`./src/store/${uName}/${uName}Consts.js`);
  const constOpenSync = fs.openSync(
    `./src/store/${uName}/${uName}Consts.js`,
    "w+"
  );

  const newConstData = constData
    .toString()
    .replace(/NewModel/g, `${allCapsName}`);
  fs.writeSync(constOpenSync, newConstData, 0, newConstData.length);

  const actionData = fs.readFileSync(`./src/store/${uName}/${uName}Actions.js`);
  const actionOpenSync = fs.openSync(
    `./src/store/${uName}/${uName}Actions.js`,
    "w+"
  );

  const newActionData = actionData
    .toString()
    .replace(/SET_NewModel/g, `SET_${allCapsName}`)
    .replace(/NewModel/g, `${uName}`);
  fs.writeSync(actionOpenSync, newActionData, 0, newActionData.length);
};

const addToReducer = entityName => {
  const uName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const data = fs.readFileSync(`./src/store/reducers.js`);
  const fd = fs.openSync(`./src/store/reducers.js`, "w+");
  const insert = new Buffer(
    `import ${entityName} from './${uName}/${uName}Reducer';\r\n`
  );
  const newData = data.toString().replace(/}([^}]*)$/, `,${entityName}\r\n}`);
  fs.writeSync(fd, insert, 0, insert.length, 0);
  fs.writeSync(fd, newData, insert.length, newData.length, insert.length);

  fs.close(fd, err => {
    if (err) throw err;
  });
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
      cdIntoNewApp();
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
const cdIntoNewApp = () => {
  return new Promise(resolve => {
    shell.cd(appDirectory);
    resolve();
  });
};
run();
