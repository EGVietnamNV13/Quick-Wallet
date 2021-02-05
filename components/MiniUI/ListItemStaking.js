import React, {useState} from 'react';
import {View,Text, Image} from 'react-native'
import { mainStyles, stakingStyle } from '../../styles/'
import coin from '../../assets/images/coin.png'
import {LinkBox} from '../MiniUI'

export default function App({tokenTitle, timeTitle, percentTitle}){
    const [typeLinkBox , setTypeLinkBox] = useState({
        colorTitle: '#d4ab17',
        colorIcon: '#fff',
        colorTint: '#fac800'
    });
    return(
        <>

                <View style={{flexDirection: 'row', paddingRight: 20, marginRight: 20, marginBottom: 5}}>
                    <View style={stakingStyle.firstTableContentContainerOnly}>
                        <View style={stakingStyle.tableContentTextContainer}>
                            <Image source={coin} style={{width: 30, height: 30, marginRight: 10}} />
                            <Text style={stakingStyle.tableContentText}>{tokenTitle}</Text>
                        </View>
                    </View> 
                    <View style={stakingStyle.tableContentContainer}>
                        <View style={stakingStyle.tableContentTextContainer}>
                            <Text style={stakingStyle.tableContentText}>{timeTitle}</Text>
                        </View>
                    </View> 
                    <View style={stakingStyle.tableContentContainer}>
                        <View style={stakingStyle.tableContentTextContainer}>
                            <Text style={stakingStyle.tableContentText}>{percentTitle}</Text>
                        </View>
                    </View> 
                    <View style={stakingStyle.tableContentContainer}>
                        <View style={stakingStyle.tableContentTextContainer, {alignItems: 'flex-end', paddingTop: 5}}>
                            <LinkBox title={`Tham\ngia\nngay`} colorTitle={typeLinkBox.colorTitle} colorIcon={typeLinkBox.colorIcon} colorTint={typeLinkBox.colorTint}/>
                        </View>
                    </View> 
                </View>
        </>
    )
}
