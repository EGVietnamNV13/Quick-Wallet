import React, { useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
export default function App({ title, setHeight }) {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  return (
    <>
      {/* <LinearGradient 
        start={[0,1]}
        end={[1,0]}
        colors={['#e5be50', '#ecda8b', '#a47b00']}
        onLayout={e => {
            setHeaderHeight(e.nativeEvent.layout.height);
            if(setHeight)setHeight(e.nativeEvent.layout.height)
        }}
        style={{width: '100%', height: 68, position: 'relative', backgroundColor: '#2e394f', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16}}>{title}</Text>
            <TouchableOpacity onLayout={e => setArrowHeight(e.nativeEvent.layout.height)}  
            style={{position: 'absolute', left: 15, top: (HeaderHeight / 2) - (ArrowHeight / 2)}} 
            onPress={()=>{navigation.goBack()}}>
                <FontAwesomeIcon size={20} style={{color: '#fff',fontSize: 40}} icon={faAngleLeft}/>
            </TouchableOpacity>
        </LinearGradient> */}
      <View>
        <Image
          style={{ width: "100%", height: windowHeight / 5.5 }}
          source={require("../../assets/images/header-start-staking.png")}
        />
        <View style={{ position: "absolute", top: 55, left: 20 }}>
          <Text style={{ fontSize: 24, color: "rgba(250,200,0,0.8)" }}>
            Kingdom Staking
          </Text>
          <Text style={{ fontSize: 15, color: "rgba(250,255,255,0.8)" }}>
            Mô hình kinh doanh trong thời đại số
          </Text>
        </View>
      </View>
    </>
  );
}
