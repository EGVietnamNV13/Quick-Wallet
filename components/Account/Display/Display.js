import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {Header2} from '../../Header'
import { mainStyles } from '../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { asyncSetDisplay } from '../../../store/actions'
import { checkLanguage } from '../../../helper'
export default function App(){
    const dispatch = useDispatch()
    const type = useSelector(state => state.display)
    const language = useSelector(state => state.language)
    const display = useSelector(state => state.display)
    return (
        <>
            <Header2 title={checkLanguage({vi: 'Hiển thị', en: 'Display'},language)}/>
            <View style={[mainStyles.container,{paddingHorizontal: 15}]}>
                <TouchableOpacity onPress={()=>dispatch(asyncSetDisplay(0))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12}}>
                    <Text style={{fontSize: 14, color: type === 0 ? '#fac800' :  display === 1 ?  '#283349' : '#ddd9d8' }}>{checkLanguage({vi: 'Dark mode', en: 'Dark mode'},language)}</Text>
                    {type === 0 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(asyncSetDisplay(1))} style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 12, borderTopColor: display === 1 ? '#e8e8e8' : '#3b3f49', borderTopWidth: 1}}>
                    <Text style={{fontSize: 14, color: type === 1 ? '#fac800' :  display === 1 ?  '#283349' : '#ddd9d8' }}>{checkLanguage({vi: 'Light mode', en: 'Light mode'},language)}</Text>
                    {type === 1 && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                </TouchableOpacity>
            </View>
        </>
    )
}