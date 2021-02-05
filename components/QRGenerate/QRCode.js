import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Dimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import qr from '../../assets/images/qr.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({value, logo}){
    return (
        <>
        <Image source={qr} style={{width: 255, height: 239}} />
        <View style={{position: 'absolute', top: 15, left: 30}}>
            <View style={{width: 200, height: 200, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                <QRCode
                    value={value}
                    size={170}
                    logo={logo}
                    logoSize={35}
                    logoBackgroundColor='transparent'
                />
              </View>
        </View>
        </>
    )
}