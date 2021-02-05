import React, { useEffect, useMemo, useState } from 'react'
import {ImageBackground, ScrollView, } from 'react-native'

import bg from '../assets/images/bg.jpg'
import bg2 from '../assets/images/bg2.jpg'
import bg3 from '../assets/images/bg3.jpg'
import { mainStyles } from '../styles/'
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { asyncGetSettings } from '../store/actions';
import checkDisplays from '../helper/checkDisplays';
export default function Maincontainer({Component,route ,reqLogin, ...restProps}){
    const {bottom} = useSafeAreaInsets()
    
    const display = useSelector(state => state.display)
    const [OutScrollView, setOutScrollView] = useState(null)
    const [OutScrollViewTop, setOutScrollViewTop] = useState(null)
    const [BackGround, setBackGround] = useState(null)


    return (
      <ImageBackground source={BackGround ? BackGround : display === 1 ? bg3 : bg} style={[mainStyles.bg,{width: '100%', height: '100%',position: 'relative'}]}>
        {OutScrollViewTop && OutScrollViewTop}
        <ScrollView 
        >
          <Component setOutScrollViewTop={setOutScrollViewTop} setOutScrollView={setOutScrollView} setBackGround={setBackGround} {...restProps}/>
        </ScrollView>
        {OutScrollView && OutScrollView}
      </ImageBackground>
    )
}