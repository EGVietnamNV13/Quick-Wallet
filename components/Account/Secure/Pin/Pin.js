import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { View, Text, TouchableOpacity,Switch } from 'react-native'

import {Header2} from '../../../Header'
import { mainStyles } from '../../../../styles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { checkLanguage } from '../../../../helper'
export default function App(){
    const navigation = useNavigation()

    const PIN = useSelector(state => state.pin)

    const [ActivePin, setActivePin] = useState(PIN ? true : false)
    const [ThumbSwitchColor, setThumbSwitchColor] = useState('')
    useEffect(()=>{
        if(ActivePin) setThumbSwitchColor('#ebd889')
        else setThumbSwitchColor('#ddd9d8')
    },[ActivePin])

    useEffect(()=>{
            if(PIN && !ActivePin){
                setActivePin(true)
            }else if(!PIN && ActivePin){
                setActivePin(false)
            }
    },[PIN,ActivePin])

    const handleSwitch = useCallback(value =>{
        if(value) navigation.navigate('SetPin')
        if(!value) navigation.navigate('RemovePin')
    },[] )

    const language = useSelector(state => state.language)
    return (
        <>
            <Header2 title={checkLanguage({vi : 'Cài đặt Unlock PIN', en : 'Unlock PIN Setting'},language)}/>
            <View style={[mainStyles.container,{padding: 14}]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingVertical: 10}}>
                    <Text style={{color: '#ddd9d8', fontSize: 14}}> {checkLanguage({vi : 'Cài đặt Unlock PIN', en : 'Unlock PIN Setting'},language)} </Text>
                    <Switch 
                    value={ActivePin}
                    onValueChange={handleSwitch}
                    thumbColor={ThumbSwitchColor}
                    trackColor={{true: '#fff8da', false: '#8a8c8e'}}
                    />
                </View>
                <View style={{marginTop: 17, borderTopColor: '#2a2e3a', borderTopWidth: 1,paddingTop: 15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePin')} disabled={!ActivePin}><Text style={{color: ActivePin ? '#ddd9d8' : '#4c4d54'}}>{checkLanguage({vi : 'Đổi mã PIN', en : 'Change PIN'},language)} </Text></TouchableOpacity>
                    <Text style={{color: '#8a8c8e', marginTop:22}}>{checkLanguage({vi : 'Trong trường hợp quên mã PIN ứng dụng bạn phải gỡ bỏ và cài đặt lại ứng dụng để xóa mã PIN cũ.', en : 'In case you forget your PIN code please remove and reinstall app'},language)} </Text>
                </View>
            </View>
        </>
    )
}