import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, FlatList} from 'react-native'

import {Header2} from '../../Header'
import { mainStyles,accountStyle } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import FollowList from '../FollowList'

const data = [
    {
        id: '1',
        title: 'Bất kỳ ai mời một người đăng ký tài khoản thành công, sau đó thực hiện xác minh danh tính (KYC) thành công sẽ nhận được 5 KDG reward.',
      },
      {
        id: '2',
        title: 'Không giới hạn lời mời, càng mời nhiều bạn, càng nhận được nhiều KDG reward.',
      },
      {
        id: '3',
        title: 'Bất kỳ ai người dùng cùng 1 thiết bị, cùng một số điện thoại sẽ được xem như một người dùng.',
      },
      {
        id: '4',
        title: 'Bất kỳ ai đăng nhập bất thường hoặc theo các hình thức gian lận sẽ không nhận được phần thưởng.',
      },

]

  
export default function App({setOutScrollViewTop}){
    const navigation = useNavigation()

    
    useEffect(()=>{
        setOutScrollViewTop(<Header2 title="Quy luật"/>)
    },[])
    
    return (
        <>
            <View style={[mainStyles.container,]}>
                <View style={{padding: 20}}>
                    <View>
                        <FlatList
                            data={data}
                            renderItem={({item}) => <View style={{paddingBottom: 10}}><Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 15}}>{item.id + '. ' + item.title}</Text></View>}
                        />
                    </View>
                    <View style={{paddingTop: 10}}>
                        <View>
                            <Text style={{color: '#fac800', textDecorationLine: 'underline', fontStyle: 'italic'}}>Lưu ý:</Text>
                        </View>
                        <View style={{paddingVertical: 10}}>
                            <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 15}}>Tài khoản đăng ký trước ngày 1/9 sẽ được đổi tối đa <Text style={{color: '#fff', fontWeight: 'bold', fontStyle: 'italic'}}>20 KDG Reward/ ngày, tối đa 1 lần/ ngày</Text></Text>
                            <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 15, paddingTop: 10}}>1 KDG Reward = 1 KDG</Text>
                            <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 15, paddingTop: 20}}>Tài khoản đăng ký sau ngày 1/9 sẽ được quy đổi thành KDG token khi bạn <Text style={{color: '#fff', fontWeight: 'bold', fontStyle: 'italic'}}>có đủ 25 KDG reward, tối đa 50 KDG reward </Text>, tối đa 1 lần/ ngày</Text>
                            <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 15, paddingTop: 10}}>1 KDG Reward = 1 KDG</Text>
                        </View>
                    </View>
                </View>
            </View>
            
        </>
    )
}