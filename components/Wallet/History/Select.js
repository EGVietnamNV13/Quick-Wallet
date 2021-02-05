import React, { useState, useCallback } from 'react'

import { View,Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const checkSelect = function (type,selected){
    if(type === 0) return {title: 'LỌC LỊCH SỬ', list: ['Tất cả','Nhận', 'Gửi']}
    if(type === 1) return {title: 'LỌC THƠI GIAN', list: ['1 ngày','7 ngày','30 ngày', '60 ngày']}


    return null
}

export default function App({
    SelectType,
    setSelectType,
    SelectValue,
    setSelectValue
}){
    const screenHeight = useSelector(state=>state.height)
    const screenWidth = useSelector(state=>state.width)

    const [Select, setSelect] = useState({...checkSelect(SelectType),selected: SelectValue})

    const handleSelect = useCallback((select)=>{
        setSelect({...Select, selected:select});
        setSelectType(null)
        setSelectValue(select)
    },[Select,setSelectType])
    return(
        <>
            <View
            style={[{flex: 1,flexDirection: 'column',justifyContent: 'flex-end',position:'absolute',pointerEvent: 'none',width:screenWidth,height: screenHeight, zIndex: 99, backgroundColor: ''}]}
            >
                <TouchableOpacity onPress={()=>setSelectType(null)} style={{backgroundColor: '#000', opacity: .6,flex: 1}}></TouchableOpacity>
                <View style={{backgroundColor: '#283349'}}>
                    <Text style={{backgroundColor: '#202b3f', color: '#8a8c8e', fontSize: 13, paddingVertical: 13, paddingHorizontal: 15}}>{Select.title} </Text>
                    {
                    Select.list.map(select=>{
                        return(
                            <>
                            <TouchableOpacity onPress={()=>handleSelect(select)} style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',paddingVertical: 13, paddingHorizontal: 15,}}>
                                <Text style={Select.selected === select ? {color:'#fac800'} :{ color: '#ddd9d8'}}> {select} </Text>
                                {Select.selected === select && <FontAwesomeIcon color="#fac800" icon={faCheck}/>}
                            </TouchableOpacity>
                            </>
                        )
                    })
                    }
                </View>
            </View>
        </>
    )
}