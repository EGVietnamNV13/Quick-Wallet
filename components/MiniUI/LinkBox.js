import React from 'react';

import {View,Text, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export default function App({title, colorTint, colorTitle, colorIcon}){

    return(
        <>
        <TouchableOpacity>
        <View style={{flexDirection: 'row', width: 75, backgroundColor: 'rgba(40,51,73, 0.8)'}}>
            <Text style={{textAlign: 'center', paddingRight: 15, paddingLeft: 15, color: colorTitle, fontWeight: 'bold'}}>{title}</Text>
                <View style={{width: 30, height: 60, backgroundColor: colorTint, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                    <View  style={{width: 10, height: 10, backgroundColor: 'rgba(40,51,73, 0.8)', borderRadius: 10, position: 'absolute', top: 25, left: -7}}>
                        <FontAwesomeIcon style={{paddingRight: 40}} icon={faLink} color={colorIcon}/>
                    </View>
                </View>
        </View>
        </TouchableOpacity>
        </>
    )
}
