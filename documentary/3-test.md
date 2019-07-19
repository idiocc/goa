## Tests

The tests were converted from Jest to be run by [Zoroaster context testing framework](https://contexttesting.com). A special context was created to easily start the app with the middleware needed to testing, and even allows to assert on the presence of errors.

%FORK node_modules/.bin/zoroaster test/spec -a -t 10000%

