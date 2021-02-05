import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({title,titleColor, tintColor, iconColor, borderTintWidth, borderTintColor, toPress}){
    return (
        <>
            <TouchableOpacity onPress={toPress}>
                <View style={{height: windowHeight/12, width: '100%',backgroundColor: '#283349', flexDirection: 'row'}}>
                    <View style={{flex: 3, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: titleColor, textAlign: 'center', fontSize: 14}}>{title}</Text>
                    </View>
                    <View style={{flex: 2, backgroundColor: tintColor, borderWidth: borderTintWidth, borderColor: borderTintColor}}>
                        <View style={{backgroundColor: '#283349', width: 8, height: 8, borderRadius: 50, position: 'absolute', top: '50%', left: -5}}>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <FontAwesomeIcon color={iconColor} icon={faLink}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}