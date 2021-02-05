import React, { useState, useEffect } from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import { mainStyles,notifyStyles } from '../../../styles'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
export default function Notification({status, title, content, datetime, toPress}){
    const [Width , setWidth] = useState(0)

    const display = useSelector(state => state.display)
    return (
        <>
        <TouchableOpacity onPress={toPress} style={notifyStyles.notify}>
            <Image source={logo} style={{width: 25,padding: 0, height: 18 ,alignSelf: 'flex-start',resizeMode: 'contain'}} />
            <View style={{marginLeft: 8, width: Width - 25 - 8 ,borderBottomWidth:  display === 1 ? 0.5 : 1, borderBottomColor: display === 1 ? '#b0b2b4'  : '#29303d', paddingBottom:12, width : '100%'}}>
                <Text style={{includeFontPadding: false, color: display === 1 ? '#283349' : '#fff', fontSize: 14,  paddingRight: 10}}>{title}</Text>
                <Text style={{color: '#8a8c8e', fontSize: 13, paddingRight: 40}}>{content}</Text>
                <Text style={{color: '#fac800', fontSize: 11, marginTop:7, paddingRight: 10}}>{datetime}</Text>
            </View>
                { status === true ? <FontAwesomeIcon  style={{position: 'absolute', right: 20, top: 20}} color='#FFF862' size={8} icon={faCircle}/> 
                : null
                }
        </TouchableOpacity>
        </>
    )
}