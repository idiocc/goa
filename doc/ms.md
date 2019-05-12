Can you make this work it's making all the efforts of writing documentation worthless look it happens everywhere after 1 level of require:

1. git clone `https://github.com/rqt/test2.git`  (https://github.com/rqt/test2.git)
2. cd test2
3. npm i / yarn
4. open `src/index.js` so that it's always open (no italic)
5. add `.create` to `gh.repos` -> there will be no suggestions!!! This is the bug!!! Also try clicking though on `import @rqt/github` then on `./api/repos` on top at `let repos = require('./api/repos');` then you won't be able to click through to `./create`!
![screen shot 2018-10-01 at 16 48 43](https://user-images.githubusercontent.com/21156791/46292986-ed335580-c59a-11e8-9f57-c5218dcc03b5.png)

6. navigate to `node_modules/rqt/github/build/api/repos/` and double click on it to always open (no italic)
7. go back to `src/index` and there will be suggestions! But this is only because the file is open in the workspace.
![screen shot 2018-10-01 at 16 48 27](https://user-images.githubusercontent.com/21156791/46292994-f290a000-c59a-11e8-829c-0366bd2b416a.png)

I believe Microsoft should show respect to people who write in JS and choose JSDoc as their types engine without TypeScript. This is a really important bug but nobody's noticed it because everyone around choose to write types definitions. Well I don't want to do that it's not fair to treat me like an outcast and force to convert to TS!