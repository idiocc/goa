The application is the instance created by the Goa class. It can provide the callback listener via the `callback` method, as well as start listening for connections itself. _Application_ extends the _EventEmitter_ class, so it's possible to listen on events, e.g.,

```js
app.on('error', (err) => {
  // handle error
})
```

<typedef narrow flatten slimFunctions>types/Application.xml</typedef>