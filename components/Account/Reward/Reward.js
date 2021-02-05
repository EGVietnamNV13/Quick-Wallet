import React, {useCallback, useEffect, useMemo, useState} from 'react'
import { View, Text, TouchableOpacity, Image, Clipboard, Share, StyleSheet} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles } from '../../../styles'
import { useNavigation } from '@react-navigation/native'
import {  checkLanguage, storage } from '../../../helper'
import {  useDispatch, useSelector } from 'react-redux'
import Popup from '../../Popup/Popup'
import { LinearGradient } from 'expo-linear-gradient'

import RewardBanneren from '../../../assets/images/rewardbanneren.png'
import RewardBannervi from '../../../assets/images/rewardbannervi.png'
import checking from '../../../assets/images/checking.png'
import spin from '../../../assets/images/spin.png'
import ref from '../../../assets/images/ref.png'
import calAPI from '../../../axios'
import { asyncGetUserbyID } from '../../../store/actions'
export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()
    const language = useSelector(state => state.language)
    const [IsRewardToday,setIsRewardToday] = useState(false)
    const [ModalStyle,setModalStyle] = useState('')
    const [ModalMess,setModalMess] = useState('')
    const dispatch = useDispatch()
    const [isModalVisible,setModalVisible] = useState(false)
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title={checkLanguage({vi: 'Phần thưởng', en: 'Reward'},language)}/>)
    },[])

    const userid = useSelector(state=> state.userInfo._id)

    const getTransaction = useCallback(async()=>{
        const res = (await (await calAPI()).get(`/api/get_transaction?id=${userid}&skip=0&take=7&type=lucky-spin-daily`)).data 
        if(res.data[0]){
            if(res.data[0].create_date){
                var lastd = new Date(res.data[0].create_date)
                var d = new Date()
                if(lastd.getFullYear() < d.getFullYear){
                    setIsRewardToday(false)
                }
                if(lastd.getFullYear() === d.getFullYear()){
                    if(lastd.getMonth() < d.getMonth()){
                        setIsRewardToday(false)
                    }
                    if(lastd.getMonth() === d.getMonth() && lastd.getDate() < d.getDate()){
                        setIsRewardToday(false)
                    }
                }
            }
        }else{  
            setIsRewardToday(false)
        }
    },[userid])

    useMemo(()=>{
        getTransaction()
    },[getTransaction])

    const message = useMemo(()=>{
        return {
            success : (msg) => {
                setModalMess(msg)
                setModalStyle('success')
                toggleModal()
            },
            error : (msg) => {
                setModalMess(msg)
                setModalStyle('error')
                toggleModal()
            }
        }
    },[])
    const handleGetRewardDaily = useCallback(async ()=>{
        const res = (await (await calAPI()).post('/api/create_transaction' , {from : 'admin' , to: userid, userId : userid, type : 'lucky-spin-daily'})).data
        if(res.status === 1){
            message.success(checkLanguage({vi: 'Chúc mừng bạn nhận được 2 KDG Reward', en: 'You receive 2 KDG Reward'},language))
            getTransaction()
            dispatch(asyncGetUserbyID(userid))
        }
        if(res.status === 0 ){
            message.error(checkLanguage({vi: 'Bạn đã nhận thưởng hôm nay rồi', en: 'Already got reward'},language))
        }
        
        if(res.status === 101 ){
            message.error(checkLanguage({vi: 'Bạn phải KYC để nhận thưởng', en: 'You have to KYC to get reward'},language))
        }
        setIsRewardToday(true)
    },[userid,language])

    const toggleModal = useCallback(() => {
        setModalVisible(!isModalVisible);
        setTimeout(function(){ 
          setModalVisible(false);
         }, 1000);
    },[isModalVisible])

    const kdg_reward = useSelector(state => state.userInfo.kdg_reward)
    return (
        <>
            <Popup type={ModalStyle} title={ModalMess} isModalVisible={isModalVisible}/>
            <View 
            style={[mainStyles.container]}>
                <View style={styles.blockImgText}>
                    <View style={styles.blockText}>
                        <Text style={styles.text}>{checkLanguage({vi : 'NHẬN NGAY KDG REWARD khi mời bạn bè tham gia', en : 'RECEIVE KDG REWARD IMMEDIATELY after invite friends joining successfully'}, language)}</Text>
                    </View>
                    <View style={styles.blockImg}>
                        <Image style={styles.img} source={checkLanguage({vi : RewardBannervi , en: RewardBanneren}, language)} />
                    </View>
                    <View>
                        <Text style={styles.text}>KDG Reward : {kdg_reward ? kdg_reward : 0} </Text>
                    </View>
                </View>
                <View
                style={styles.groupButton}
                >
                    <TouchableOpacity
                    disabled={IsRewardToday}
                    onPress={()=>handleGetRewardDaily()}
                    style={[styles.blockButton,{opacity : IsRewardToday ? .3 : 1}]}>
                        <LinearGradient
                        style={styles.iconButton}
                        start={[0,1]}
                        end={[1,0]}
                        colors={['#e3bb4c', '#edda8b']}
                        >
                            <Image style source={checking}/>
                        </LinearGradient>
                        <Text style={styles.textButtom}> {checkLanguage({vi : 'Điểm danh' ,en : 'Checkin'}, language)} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('Spin')
                    }}
                    style={styles.blockButton}>
                        <LinearGradient
                        style={styles.iconButton}
                        start={[0,1]}
                        end={[1,0]}
                        colors={['#e3bb4c', '#edda8b']}
                        >
                            <Image style source={spin}/>
                        </LinearGradient>
                        <Text style={styles.textButtom}>Lucky Spin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('Ref')}
                    style={styles.blockButton}>
                        <LinearGradient
                        style={styles.iconButton}
                        start={[0,1]}
                        end={[1,0]}
                        colors={['#e3bb4c', '#edda8b']}
                        >
                            <Image style source={ref}/>
                        </LinearGradient>
                        <Text style={styles.textButtom}> {checkLanguage({vi : 'Giới thiệu', en : 'Referral'}, language)} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    blockImgText : {
        width : '100%',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 9,
        marginHorizontal : 9,
        position : 'relative',
        backgroundColor : '#283349'
    },
    blockImg : {
        width: '100%',
    },
    img: {
        resizeMode: "contain",
        width: '100%'
    },
    blockText : {
        width: '100%',
        paddingHorizontal : 40,
        
    },
    text : {
        color: '#8a8c8e',
        fontSize : 20,
        textAlign : 'center',
        color : '#fff',
    },
    groupButton: {
        paddingTop : 20,
        marginHorizontal: 10, 
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        backgroundColor : 'rgba(40,51,73,.4)'
    },
    blockButton: {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    iconButton : {
        width : 54,
        height : 54,
        borderRadius : 25,
        position: 'relative',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    textButtom: {
        color : '#ffffff',
        fontSize : 16
    }
})