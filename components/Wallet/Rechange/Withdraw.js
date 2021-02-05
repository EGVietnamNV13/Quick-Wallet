import React, { useState, useEffect } from 'react'
import {View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native'
import { mainStyles, withdrawStyle } from '../../../styles'
import {Header2} from '../../Header'
import logo from '../../../assets/images/logo.png'
import coin from '../../../assets/images/coin.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
export default function App(){
    const [Width , setWidth] = useState(0);
    const [list, setList] = useState([
        {text: 'KDG', icon: coin, description: 'Kingdom Game 4.0', key: '1'},
        {text: 'BTC', icon: coin, description: 'Bitcoin', key: '2'},
        {text: 'ETH',icon: coin, description: 'Ethereum', key: '3'},
        {text: 'KNC', icon: coin, description: 'Kyber Network', key: '4'}
    
      ]);

    const [searchVal, setSearchVal] = useState();
    const navigation = useNavigation()

    return (
        
        <>
        <View style={mainStyles.container}>
            
            <View onLayout={e=>setWidth(e.nativeEvent.layout.width)} >
                <View >
                    {/* <Image source={logo} style={{width: 25,padding: 0, height: 18 ,alignSelf: 'flex-start',resizeMode: 'contain'}} /> */}
                    
                <View style={withdrawStyle.searchBoxContainer}>
                    <FontAwesomeIcon style={withdrawStyle.iconSearch} color="#8a8c8e" icon={faSearch}/>
                    <TextInput
                    placeholder="Tìm kiếm" 
                    placeholderTextColor = "#8a8c8e"
                    onFocus={()=>{}} 
                    onBlur={()=>{}} 
                    onChangeText={value=>setSearchVal(value)} 
                    value={searchVal} 
                    style={withdrawStyle.searchBox} />
                </View>
                {
                    searchVal ? (
                        <View style={{paddingLeft: 25, paddingTop: 10}}>
                        <Text style={{color: 'rgba(241,243,244, 0.5)', fontSize: 16}}>Kết quả</Text>
                    </View>
                    ) : null
                }

                <ScrollView>
                        <FlatList
                            data={list}
                            renderItem={({item}) => (
                                <View style={{marginLeft: 8, width: Width - 25 - 8 ,borderBottomWidth:1,borderBottomColor: '#29303d', paddingBottom:12}}>
                                    <TouchableOpacity 
                                        onPress={() => 
                                            navigation.navigate('WithdrawPage2', {
                                            coinID: item.key,
                                            coinName: item.text
                                        })} >
                                    <View style={withdrawStyle.listContainer}>
                                        <Image source={item.icon} style={{width: 30, height: 30, marginRight: 10}} />
                                        <View style={{width: '93%',flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <View>
                                                <Text style={withdrawStyle.textList}>{item.text}</Text>
                                                <Text style={withdrawStyle.description}>{item.description}</Text>
                                            </View>
                                            <View style={{paddingRight: 40}}>
                                                <Text style={withdrawStyle.exchangeRate}>1.324</Text>
                                                <Text style={withdrawStyle.nearExchangeRate}>≈ $1</Text>
                                            </View>
                                        </View>
                                    
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <View><Text>{searchVal}</Text></View>
                </ScrollView>  

                </View>
            </View>
        </View>
        </>
    )
}