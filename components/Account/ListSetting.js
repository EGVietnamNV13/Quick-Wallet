import React, { useCallback } from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faAngleRight } from '@fortawesome/free-solid-svg-icons';

import {accountStyle} from '../../styles'
import {accountStyleLight} from '../../styles/light'
import List from './settingList'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'

export default function App(){
    const state = useSelector(state => state)
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)
    const navigation = useNavigation()
    const handlePress = useCallback(route=>{
        navigation.navigate(route)
    },[navigation])

      // -------------------style------------------------------

var AccountStyle = display === 1 ? accountStyleLight : accountStyle


// ------------------------------------------------------
    
    return (
        <>
        {
        List.map((el,index) => {
        return (

        <View key={index+ 'a'} style={AccountStyle.blockSetting}>
            <Text style={AccountStyle.settingTitle}>{typeof el.name === 'function' ? el.name(language) : el.name.toUpperCase()}</Text>

            {
            el.child.map((Child, index)=>{
            
            return(
            <>
            <Child.BlockComponent onPress={Child.navigate && (()=>handlePress(Child.navigate))} key={index} style={[AccountStyle.setting, index !== 0 && AccountStyle.settingBorder]}>
                <View style={AccountStyle.maskOpacity}></View>
                <View style={AccountStyle.settingLeft}>
                    <View style={AccountStyle.iconBlock}>
                        <Image source={Child.icon} style={AccountStyle.icon}/>
                    </View>
                <Text style={AccountStyle.settingTextLeft}>{typeof Child.textLeft === 'function' ? Child.textLeft(language) : Child.textLeft }</Text>
                </View>
                <View style={AccountStyle.settingRight}>
                    <Text style={AccountStyle.settingTextRight}>{typeof Child.textRight === 'function' && Child.textRight(state)() } </Text>
                    {Child.arrow && <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight} />}
                </View>
            </Child.BlockComponent>
            {Child.extra && <Child.extra />}

            </>
            )
            })
            }
        </View>
        )
        })
        }
        </>
    )
}