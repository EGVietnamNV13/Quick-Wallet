import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {View, Image, Text, BackHandler } from 'react-native'
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

        

  
export default function App({title, subTitle}){

  const navigation = useNavigation()
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [handleBackButtonClick]);
    return(
        <>
        
        </>
    )
}