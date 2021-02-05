import React, { useState, useCallback,useEffect } from 'react';
import Modal from 'react-native-modal'
import {View,Text, Platform, TextInput, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'

export default function App({toChangeText, isModalVisible, toCancel, toSubmit, value, content, title}){
    const dimen = Dimensions.get('window');
    const [Width , setWidth] = useState(0);
    const isIphoneTaiTho =  Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    return(
        <>
        <Modal animationIn='fadeIn'animationOut='fadeOut' animationInTiming={50} isVisible={isModalVisible}>
            <View style={{justifyContent: 'center', width: '100%', alignItems: 'center', position: 'absolute', top: isIphoneTaiTho ? 40 : 10,  position: 'absolute', alignSelf: 'center', bottom: 0}}>
                <View style={{backgroundColor: '#283349', borderRadius: 10}}>
                    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)}  style={{ width: '70%', alignItems: 'center'}}>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', paddingBottom: 15, width: '100%'}}>{title}</Text>
                            <View style={{backgroundColor: '#fff', width: 220, paddingLeft: 15, borderRadius: 20, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput style={{width: '100%'}} value={value} onChangeText={toChangeText}  placeholder={content}/> 
                                </View>

                            </View>
                            </View>
                        <View style={{width: Width-10, borderTopColor: 'rgba(255,255,255,0.5)', borderTopWidth: 1, marginTop: 10, flexDirection: 'row'}}>
                            <TouchableOpacity onPress={toCancel} style={{borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.5)', alignItems: 'center', flex: 1, paddingVertical: 15}}>
                                <Text style={{color: '#fff'}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toSubmit} style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                                <Text style={{color: '#fac800'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
          
                </View>
                
            </View>
        </Modal>
        </>
    )
}   