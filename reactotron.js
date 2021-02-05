/* Download Reactotron via Brew:
brew cask install reactotron
*/
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    /* if we run on REAL Android devices, add wifi IP
    configure({host:'192.168.1.1}) */
    .useReactNative()
    .connect();
const consoleLog = console.log;
console.log = (...args) => {
    Reactotron.log(...args);
};

/*
if we run on Android, enter this terminal command:
adb reverse tcp:9090 tcp:9090
*/

/* Log using:
console.log
*/