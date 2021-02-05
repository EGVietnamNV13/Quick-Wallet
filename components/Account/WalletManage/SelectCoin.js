import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView, SafeAreaView, Alert} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles/'

import { withdrawStyleLight } from '../../../styles/light'
import {Header2} from '../../Header'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import { asyncExportPrivateKey } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../../Popup/Popup'
import PopupInputPassword from '../../Popup/PopupInputPassword'


import {  checkLanguage  } from '../../../helper'
// ------------------Icon---------------------
import kdgicon from '../../../assets/images/IconCoin/KDG.png'
import ethicon from '../../../assets/images/IconCoin/ETH.png'
import trxicon from '../../../assets/images/IconCoin/TRX.png'
import usdticon from '../../../assets/images/IconCoin/USDT.png'
import kncicon from '../../../assets/images/IconCoin/KNC.png'
import mchicon from '../../../assets/images/IconCoin/MCH.png'
import { storage } from '../../../helper'


// ------------------------------------------
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App({setOutScrollViewTop}){
    const dispatch = useDispatch();
    const [Width , setWidth] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleInput, setModalVisibleInput] = useState(false);
    const [Error, setError] = useState()

    const display = useSelector(state => state.display)

    const language = useSelector(state => state.language)
      
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
      };
    
  
    const [PasswordPrivate, setPasswordPrivate] = useState('');
    const [CoinSelected, setCoinSelected] = useState();


    const [list, setList] = useState([
        {short_name: 'KDG', text: 'KDG private key', icon: kdgicon, description: 'Kingdom Game 4.0', key: '1'},
        {short_name: 'ETH', text: 'ETH private key',icon: ethicon, description: 'Ethereum', key: '2'},
        {short_name: 'TRX', text: 'TRX private key', icon: trxicon, description: 'KTron', key: '3'},
        {short_name: 'USDT', text: 'USDT private key', icon: usdticon, description: 'Tether', key: '4'},
        {short_name: 'KNC', text: 'KNC private key', icon: kncicon, description: 'Kyber Network', key: '5'},
        {short_name: 'MCH', text: 'MCH private key', icon: mchicon, description: 'Meconcash', key: '6'},
    
      ]);

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={checkLanguage({vi: 'Chọn coin', en: `Select coin`},language)}/>)
    },[])

    // const submitPasswordHandler = (password, CoinSelected) => {
    //     console.log("Password is: " + password)
    //     console.log("Coin is: " + coin_name)
    // }


    const submitPasswordHandler = useCallback(async (pass_private, coin_name) => {
        setModalVisibleInput(false)
        var userinfo = await storage('userData').getItem();
        if(coin_name === 'USDT' || coin_name === 'ETH' || coin_name === 'KNC'|| coin_name === 'MCH'){
            var coinType = 'erc'
            var coinAdress = userinfo.balances[0].wallet.address
        }else{
            var coinType = 'trx'
            var coinAdress = userinfo.balances[5].wallet.address
        }


        dispatch(asyncExportPrivateKey({id: userinfo._id, password: pass_private, coin_type: coinType}))
        .then((res)=>{
            console.log(res)

            if(res.status === 1 && res.msg === 'wrong password'){
                setError(checkLanguage({vi: 'Mật khẩu không chính xác', en: `Password invalid`},language))
                toggleModal()
                setPasswordPrivate('')
                return
            }
            if(res.status === 0){
                setError(checkLanguage({vi: 'Đã có lỗi xảy ra', en: `An error occurred`},language))
                toggleModal()
                setPasswordPrivate('')
                return
            }
            if(res.status === 1){
                navigation.navigate('PrivateKey', {
                    coinAdress: coinAdress,
                    coinPrivate: res.privateKey,
                    coinName: coin_name
                })
            
                setPasswordPrivate('')
                return
            }
            
            setError(checkLanguage({vi: 'Đã có lỗi xảy ra', en: `An error occurred`},language))
            toggleModal()
            setPasswordPrivate('')
        })
        .catch(console.log)
        

    }, [PasswordPrivate, Error])



    const selectCoinHandler = (value) => {
        setModalVisibleInput(true)
        setCoinSelected(value)
    }

// -------------------style------------------------------

var WithdrawStyle = display === 1 ? withdrawStyleLight : withdrawStyle

// ------------------------------------------------------
    return (
        
        <>

<View style={mainStyles.container}>
        
    <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
     <Popup type='failed' title={Error} isModalVisible={isModalVisible}/>
     { isModalVisibleInput === true ?
         <PopupInputPassword 
         title={checkLanguage({vi: 'Vui lòng nhập mật khẩu', en: `Please enter your password`},language)}
        content={checkLanguage({vi: 'Mật khẩu', en: `Password`},language)}
         toCancel={() => setModalVisibleInput(false)} 
         toSubmit={() => submitPasswordHandler(PasswordPrivate, CoinSelected)}
         toChangeText={(value) => setPasswordPrivate(value)} 
         isModalVisible={isModalVisibleInput}/> : null
     }
     <PopupInputPassword 
        title={checkLanguage({vi: 'Vui lòng nhập mật khẩu', en: `Please enter your password`},language)}
        content={checkLanguage({vi: 'Mật khẩu', en: `Password`},language)}
        toCancel={() => setModalVisibleInput(false)} 
        toSubmit={() => submitPasswordHandler(PasswordPrivate, CoinSelected)}
        toChangeText={(value) => setPasswordPrivate(value)} 
        isModalVisible={isModalVisibleInput}/>
        <View style={{padding: (windowWidth*windowHeight)/29376}}>
            <View style={[WithdrawStyle.searchBoxContainer, {alignItems: 'center'}]}>
                <FontAwesomeIcon color="#8a8c8e" icon={faSearch}/>
                <TextInput
                placeholder={checkLanguage({vi: 'Tìm kiếm', en: `Search`},language)}
                placeholderTextColor = "#8a8c8e"
                onFocus={()=>{}} 
                onBlur={()=>{}} 
                onChangeText={value=>setSearchVal(value)} 
                value={searchVal} 
                style={[WithdrawStyle.searchBox, {paddingLeft: 5}]} />
            </View>
            

            {
            searchVal ? (
            <View>
                <Text style={{color: display === 1 ? '#989a9c' : 'rgba(241,243,244, 0.5)', fontSize: 12, padding: 10}}>{checkLanguage({vi: 'Kết quả', en: `Result`},language)}</Text>

                <FlatList
                data={list}
                renderItem={({item}) => 
                    { 
                        if(((item.text).toLowerCase()).startsWith(searchVal.toLowerCase()) || ((item.description).toLowerCase()).startsWith(searchVal.toLowerCase())){
                            return <View style={WithdrawStyle.listContainer}>
                                <TouchableOpacity 
                                // onPress={() => 
                                // navigation.navigate('PrivateKey', {
                                // coinID: item.key,
                                // coinName: item.text
                                // })} 
                                onPress={() => selectCoinHandler(item.short_name)}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={item.icon} style={{width: 35, height: 35}} />
                                        <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251, alignItems: 'center'}}>
                                            <View>
                                                <Text style={{color: display === 1 ? '#283349'  :'#fff'}}>{item.text}</Text>
                                            </View>
                                            <View style={{paddingRight: (windowWidth*windowHeight)/29376}}>
                                                <FontAwesomeIcon color="rgba(0,0,0,0)" size={12} icon={faChevronDown}/>
                                            </View>
                                        </View>
                                    </View>   
                                </TouchableOpacity>
                            </View>
                        }
                
                    }
                }
                />
            </View>
            ) :  <FlatList
            data={list}
            renderItem={({item}) => (
                <View style={WithdrawStyle.listContainer}>
                    <TouchableOpacity 
                      // onPress={() => 
                                // navigation.navigate('PrivateKey', {
                                // coinID: item.key,
                                // coinName: item.text
                                // })} 
                                onPress={() => selectCoinHandler(item.short_name)}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Image source={item.icon} style={{width: 35, height: 35}} />
                            <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: (windowWidth*windowHeight)/35251, alignItems: 'center'}}>
                                <View>
                                    <Text style={{color: display === 1 ? '#283349'  : '#fff'}}>{item.text}</Text>
                                </View>
                                <View style={{paddingRight: (windowWidth*windowHeight)/29376}}>
                                    <FontAwesomeIcon color="rgba(0,0,0,0)" size={12} icon={faChevronDown}/>
                                </View>
                            </View>
                        </View>   
                    </TouchableOpacity>
                </View>
            )}
            />
            }
               
        </View>
    </View>
</View>
        </>
    )
}