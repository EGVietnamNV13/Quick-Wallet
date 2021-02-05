import AsyncStorage from '@react-native-community/async-storage';

const storage = (key,value) =>{
    return {
        setItem : async () => {
            await AsyncStorage.setItem(key , JSON.stringify(value))
        } ,
        getItem : async () => JSON.parse(await AsyncStorage.getItem(key))
    }
}

export default storage