import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SmoothPinCodeInput  from 'react-native-smooth-pincode-input'
import Lock from '../../assets/images/lock-pin.png'
import { storage, waitFor } from '../../helper'

const comparePin = async inputPin=>{
    const storagePin = await storage('pin').getItem()
    if(inputPin === storagePin) return true
    else return false
}
const shakeTime = 50
export default function App () {
    const navigation = useNavigation()
    const PinBar1 = useRef()
    const Position = useRef(new Animated.Value(0)).current;
    const [Pin1, setPin1] = useState('')
    const [PinBar1Focus, setPinBar1Focus] = useState(false)
    const onBlurPinBar1 = useCallback(()=>{
        if((Pin1 + '').length === 0){
            setPinBar1Focus(false)
        }
    },[Pin1])

    useEffect(()=>{
        if((Pin1 + '').length === 6){
            comparePin(Pin1)
            .then(async res => {
                if(res) navigation.navigate('Main')
                else{
                    Animated.timing(Position, {
                        toValue: -10,
                        duration: shakeTime,
                        useNativeDriver: false
                    }).start();
                    await waitFor(shakeTime)
                    Animated.timing(Position, {
                        toValue: 10,
                        duration: shakeTime,
                        useNativeDriver: false
                    }).start();
                    
                    await waitFor(shakeTime)
                    Animated.timing(Position, {
                        toValue: -10,
                        duration: shakeTime,
                        useNativeDriver: false
                    }).start();
                    await waitFor(shakeTime)
                    Animated.timing(Position, {
                        toValue: 0,
                        duration: shakeTime,
                        useNativeDriver: false
                    }).start();
                    setPin1('')
                }
            })
        }
    },[Pin1])
    
    return (
        <>
            <View style={styles.textTop}>
                <Text style={styles.text1}>Kiểm tra bảo mật, kiểm tra an ninh</Text>
                <Text style={styles.text2}>Nhập mã PIN</Text>
            </View>
            <Animated.View
            style={[
                {left : Position}
            ]}>
                <TouchableOpacity 
                disabled={PinBar1Focus} 
                activeOpacity={false} 
                onPress={()=>{PinBar1.current.focus(); setPinBar1Focus(true)}} 
                style={styles.inputPinBlock}
                >
                    <Image style={{position: 'absolute', left: 19, top: 22}} source={Lock}/>
                    <TouchableOpacity 
                    onPress={()=>{
                        setPin1('')
                        setPinBar1Focus(false)
                    }}
                    style={{position : 'absolute', right: 19, padding: 10}}  >
                        <FontAwesomeIcon color='#fff' icon={faTimesCircle} />
                    </TouchableOpacity>
                    <Text style={{color: '#8a8c8e',fontSize: 16,opacity: PinBar1Focus ? 0 : 1}}>Nhập mã PIN</Text>

                    <View 
                    style={{
                        opacity: PinBar1Focus ? 1 : 0,
                        top: PinBar1Focus? 0 : -10000 ,
                        position: 'absolute', width: '60%' , height : '100%', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <SmoothPinCodeInput
                        placeholder={<View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 50,
                            backgroundColor: 'rgba(0,0,0,0)',
                        }}></View>}
                        mask={<View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 50,
                            backgroundColor: '#ddd9d8', 
                        }}></View>}
                        restrictToNumbers={true}
                        cellSize={12}
                        maskDelay={1000}
                        password={true}
                        cellStyle={null}
                        cellStyleFocused={null}
                        value={Pin1}
                        codeLength={6}
                        keyboardType="number-pad"
                        onTextChange={setPin1}
                        ref={value => PinBar1.current = value}
                        inputProps={{onBlur:onBlurPinBar1}}
                        />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    textTop : {
        marginTop : 75,
        flex: 1,
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    text1 : {
        fontSize : 14,
        color : '#8a8c8e'
    },
    text2 : {
        fontSize : 16,
        color : '#ffffff'
    },
    inputPinBlock : {
        position:'relative',
        backgroundColor: '#1d2536', 
        height: 55, 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        borderRadius: 40, 
        marginTop:32
    }
})