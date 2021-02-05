import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { mainStyles, notifyStyles } from '../../../styles/'
import { Header2 } from '../../Header'
import logo from '../../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Notification from './Notification'
import { checkLanguage, storage } from '../../../helper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function App() {
    const [Width, setWidth] = useState(0)
    const [CreateDate, setCreateDate] = useState('')
    const route = useRoute();

    const navigation = useNavigation()



    const listnoti = [
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },
        { title: 'lorem ip sum', content: 'lorem ip sum ad mut su dfos mjxuaw sia', datetime: '20/5/2020' },

    ]
    const language = useSelector(state => state.language)

    return (
        <>
            <View style={mainStyles.container}>
                <Header2 title="Thông báo" />
                <View onLayout={e => setWidth(e.nativeEvent.layout.width)} style={notifyStyles.listNotify}>
                    {listnoti.map((item) => {
                        console.log(item);
                        return (
                            <Notification
                                title={item.title}
                                content={item.content}
                                datetime={item.datetime}
                            />

                        )
                    })}
                </View>
            </View>
        </>
    )
}