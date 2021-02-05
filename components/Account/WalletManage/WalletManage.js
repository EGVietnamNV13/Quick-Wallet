import React, { useState, version } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { accountStyleLight } from '../../../styles/light'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import PopupInput from '../../Popup/PopupInput'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeWalletName } from '../../../store/actions'

import {  checkLanguage  } from '../../../helper'
// import Dialog from "react-native-dialog"
export default function App(){
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)
    const walletname = useSelector(state => state.walletname)
    const [WalletNames, setWalletNames] = useState('Kingdome game 4.0')
    const [isModalVisibleInput, setModalVisibleInput] = useState(false);

    const submitHandler = (value) => {
        setModalVisibleInput(false)
        dispatch(actChangeWalletName(value))
    }

  // -------------------style------------------------------

  var AccountStyle = display === 1 ? accountStyleLight : accountStyle

  // ------------------------------------------------------
    return (
        <>
            <Header2 title={checkLanguage({vi: 'Quản lý ví', en: `Wallet Manage`},language)}/>
            <View style={[mainStyles.container,]}>
            <PopupInput 
                title={checkLanguage({vi: 'Tên ví', en: `Wallet name`},language)}
                content={checkLanguage({vi: 'Nhập tên ví bạn muốn đổi', en: `Enter wallet name to change`},language)}
                toCancel={() => setModalVisibleInput(false)} 
                toSubmit={() => submitHandler(WalletNames)}
                toChangeText={(value) => setWalletNames(value)} 
                isModalVisible={isModalVisibleInput}/>
                <View>
                    <TouchableOpacity 
                    onPress={() => setModalVisibleInput(true)}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                        <View style={AccountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: display === 1? '#283349'  : '#ddd9d8'}}>{checkLanguage({vi: 'Tên ví', en: `Wallet name`},language)}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, color: display === 1? '#283349'  : '#ddd9d8', paddingRight: 10}}>{walletname ? walletname : 'Kingdom game 4.0'}</Text>
                            <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('SelectCoin')}
                    style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: display === 1 ? '#e8e8e8'  : '#3b3f49', borderTopWidth: 1}}>
                        <View style={AccountStyle.maskOpacity} ></View>
                        <Text style={{fontSize: 14, color: display === 1? '#283349'  : '#ddd9d8'}}>{checkLanguage({vi: 'Xuất Private Key', en: `Export Private Key`},language)}</Text>
                        <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}