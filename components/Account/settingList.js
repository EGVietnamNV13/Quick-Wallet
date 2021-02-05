import currency from '../../assets/images/currency.png'
import language from '../../assets/images/language.png'
import display from '../../assets/images/display.png'
import lock from '../../assets/images/lock.png'
import info from '../../assets/images/info.png'
import follow from '../../assets/images/follow.png'
import FollowList from './FollowList'
import {View, TouchableOpacity} from 'react-native'
import  {checkCurrency,checkDisplay,checkLang, checkLanguage} from '../../helper'
import store from '../../store'

const List = [
    {
        name: (language) => {
            return checkLanguage({vi: 'Chung', en: 'General'}, language)
        },
        child:[
            {
                icon : currency,
                textLeft: (language) => {
                    return checkLanguage({vi: 'Loại tiền tệ', en: 'Currency'}, language)
                },
                textRight: 'currency_type',
                textRight: (state) => {
                    var type = state.currency
                    return () => {
                        return checkCurrency(type)
                    }
                },
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Currency'
            },
            {
                icon : language,
                textLeft: (language) => {
                    return checkLanguage({vi: 'Ngôn ngữ', en: 'Language'}, language)
                },
                textRight: (state) => {
                    var type = state.language
                    return () => {
                        return checkLang(type)
                    }
                },
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Language'
            },
            // {
            //     icon : display,
            //     textLeft: (language) => {
            //         return checkLanguage({vi: 'Hiển thị', en: 'Display'}, language)
            //     },
            //     textRight: (state) => {
            //         var type = state.display
            //         return () => {
            //             return checkDisplay(type)
            //         }
            //     },
            //     arrow : true,
            //     BlockComponent: TouchableOpacity,
            //     navigate: 'Display'
            // },
        ]
    },
    {
        name: (language) => {
            return checkLanguage({vi: 'Bảo mật', en: 'Security'}, language)
        },
        child:[
            {
                icon : lock,
                textLeft: (language) => {
                    return checkLanguage({vi: 'Cài đặt bảo mật', en: 'Security Settings'}, language)
                },
                textRight: '',
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Secure'
            },
        ]
    },
    {
        name: (language) => {
            return checkLanguage({vi: 'Khác', en: 'Others'}, language)
        },
        child:[
            {
                icon : info,
                textLeft: (language) => {
                    return checkLanguage({vi: 'Về chúng tôi', en: 'About King Wallet'}, language)
                },
                textRight: '',
                arrow : true,
                BlockComponent: TouchableOpacity,
                navigate: 'Invitation'
            },
            {
                icon : follow,
                textLeft: (language) => {
                    return checkLanguage({vi: 'Theo dõi', en: 'Follow us'}, language)
                },
                textRight: '',
                arrow : false,
                BlockComponent: View,
                extra: FollowList,
            },
        ]
    },
]

export default List