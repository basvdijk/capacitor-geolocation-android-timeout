## Created with Capacitor Create App

This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app),
and comes with a very minimal shell for building an app.

### Running this example

To run the provided example, you can use `npm start` command.

```bash
npm start
```


# Run on Android
```
npm run build && npx cap sync android
```

```
npx cap open android
```

Run on device

Press "start live GPS" button

```
eoLocationWatchId = await Geolocation.watchPosition(
    { enableHighAccuracy: true, timeout: 2000, maximumAge: 2500 },
    (currentPosition: Position | null) => {
```

Although the code says 2000ms the delay between 2 measurements is way longer

![image](https://user-images.githubusercontent.com/644550/223717435-0dc8aeba-c537-4c9f-8019-9b86e8170312.png)
