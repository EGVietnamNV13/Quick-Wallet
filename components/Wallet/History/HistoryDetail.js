import React, { useState, useCallback, useEffect} from 'react';
import {  View, Text, Image, Dimensions, Clipboard} from 'react-native';
import {LineChart } from 'react-native-chart-kit'
import {mainStyles} from '../../../styles'
import {Header2} from '../../Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faCopy, faFilter } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Select from './Select'
import Popup from '../../Popup/Popup'
import { useSelector } from 'react-redux'
import {  checkLanguage } from '../../../helper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({coin = 'BTC', setOutScrollView, setOutScrollViewTop}){

    const navigation = useNavigation()
    const route = useRoute();
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)
    const [isModalVisible, setModalVisible] = useState(false);

    
    const [SelectType, setSelectType] = useState(null)
    const [SelectedHistory, setSelectedHistory] = useState('Tất cả')
    const [SelectedTime, setSelectedTime] = useState('1 ngày')

    // ------------content---------------
    const [Status, setStatus] = useState(                        
        <Text style={{color: '#fac800'}}>
          {checkLanguage({vi: 'Giao dịch đang chờ', en: `Transaction pending`},language)}
       </Text>
    )

    const [Icon, setIcon] = useState(                        
        <Image
            style={{
                width: 32.5,
                height: 37.7
            }}
            source={require('../../../assets/images/walletDeposit.png')}
        />
    )

    // ---------------------------------

    const { coin_name, type, status, fromAddress, toAddress, block, hash, amount, datetime } = route.params;

    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
      };

    useEffect(()=>{
       if(status === 'failed'){
            setStatus(
                <Text style={{color: '#c00e0f'}}>
                   {checkLanguage({vi: 'Giao dịch thất bại', en: `Transaction failed`},language)}
                </Text>
            )
       }
       if(status === 'success'){
            setStatus(
                <Text style={{color: '#259e58'}}>
                    {checkLanguage({vi: 'Giao dịch thành công', en: `Transaction successful`},language)}
                </Text>
            );
        }


        if(type === 'withdraw'){
            setIcon(
                <Image
                    style={{
                        width: 32.5,
                        height: 37.7
                    }}
                    source={require('../../../assets/images/walletWithdraw.png')}
                />
            )
        }
    },[])

    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={coin_name} />)
    },[])

    
    const copyHandler1 = () => {
        Clipboard.setString(fromAddress)
        toggleModal()
    }

    const copyHandler2 = () => {
        Clipboard.setString(toAddress)
        toggleModal()
    }

    
    const copyHandler3 = () => {
        Clipboard.setString(hash)
        toggleModal()
    }




    return (
        <>   
            <View style={[mainStyles.container]}>
            <Popup type='success' title={checkLanguage({vi: 'Đã copy', en: `Copied`},language)} isModalVisible={isModalVisible}/>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {Status}
                        <Text style={{color: display === 1 ? '#989a9c' : 'rgba(255,255,255,0.5)'}}>
                           {datetime}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {Icon}
                        <View style={{paddingTop: 5}}>
                            <Text style={{color: '#fac800', fontSize: 20, fontWeight: 'bold'}}>{type === 'deposit' ? `+ ${amount} ${coin_name}` : type === 'withdraw' ? `- ${amount} ${coin_name}` : '???'}</Text>
                        </View>
          
                    </View>
                </View>
            </View>     



            <View>

                <View style={{height: '100%', flexDirection: 'column', paddingTop:30}}>
                    <View style={{paddingHorizontal: 20, paddingBottom: 10, borderTopWidth: 1, paddingTop: 10, borderTopColor: 'rgba(255,255,255,0.1)'}}>
                        <Text style={{color: display === 1 ? '#283349' :  '#fff'}}>{checkLanguage({vi: 'Từ', en: `From`},language)}</Text>
                        <TouchableOpacity 
                            onPress={copyHandler1}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', padding: 10, borderRadius: 5}}>
                                <Text style={{color: display === 1 ? '#283349' : 'rgba(255,255,255, 0.7)'}}>{fromAddress}</Text>
                                <FontAwesomeIcon size={15} color={display === 1 ? '#283349' :"rgba(255,255,255, 0.7)"} icon={faCopy}/>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 20, paddingBottom: 10, borderTopWidth: 1, paddingTop: 10, borderTopColor: 'rgba(255,255,255,0.1)'}}>
                        <Text style={{color: display === 1 ? '#283349' : '#fff'}}>{checkLanguage({vi: 'Đến', en: `To`},language)}</Text>
                        <TouchableOpacity 
                            onPress={copyHandler2}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', padding: 10, borderRadius: 5}}>
                                <Text style={{color: display === 1 ? '#283349' : 'rgba(255,255,255, 0.7)', paddingRight: 10}}>{toAddress}</Text>
                                <FontAwesomeIcon size={15} color="rgba(255,255,255, 0.7)" icon={faCopy}/>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 20, paddingBottom: 10, borderTopWidth: 1, paddingTop: 10, borderTopColor: 'rgba(255,255,255,0.1)'}}>
                        <Text style={{color: display === 1 ? '#283349' : '#fff'}}>{checkLanguage({vi: 'Mã giao dịch', en: `Hash`},language)}</Text>
                        <TouchableOpacity 
                            onPress={copyHandler3}
                            disabled={true}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 5}}>
                                <Text style={{color: display === 1 ? '#283349' : 'rgba(255,255,255, 0.7)', paddingRight: 10}}>{hash}</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 20, paddingBottom: 10, borderTopWidth: 1, paddingTop: 10, borderTopColor: 'rgba(255,255,255,0.1)'}}>
                        <Text style={{color: display === 1 ? '#283349' : '#fff'}}>Block</Text>
                        <TouchableOpacity 
                            // onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            disabled={true}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 5}}>
                                <Text style={{color: display === 1 ? '#283349' : 'rgba(255,255,255, 0.7)'}}>{block}</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 20, paddingBottom: 10, borderTopWidth: 1, paddingTop: 10, borderTopColor: 'rgba(255,255,255,0.1)'}}>
                        <Text style={{color: display === 1 ? '#283349' : '#fff'}}>{checkLanguage({vi: 'Ghi chú', en: `Note`},language)}</Text>
                        <TouchableOpacity 
                            // onPress={() => Clipboard.setString('TS8jRFiS3sjnwwJMAydZifV9Bas3rKgFFu')}
                            disabled={true}
                            style={{paddingTop: 5}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 5}}>
                                <Text style={{color: display === 1 ? '#283349' : 'rgba(255,255,255, 0.7)'}}>N/A</Text>
                            </View>
                    </TouchableOpacity>
                    </View>
                </View>
        </View>
        </>
    )
}