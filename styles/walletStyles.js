import React from 'react';

import {StyleSheet ,Dimensions} from 'react-native';

const styles = StyleSheet.create({
    bg: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
    },
    header : {
        paddingTop:29,
        paddingBottom: 23,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleHeader : {
        color: '#edca62',
        fontSize: 16,
    },
    groupIcon:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scanQRIcon : {
        width: 20,
        height: 20
    },
    notifyIcon: {
        marginLeft:15,
        position: 'relative',
        marginRight: 15
    },
    notifyCount : {
        position: 'absolute',
        top: -7,
        right: -7,
        borderRadius: 50,
        backgroundColor: '#ff0000',
        fontSize: 10,
        width: 15,
        height: 15,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Roboto_700Bold'
    },
    maskOpacity: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: .4,
        borderRadius :5,
        backgroundColor: '#283349'
    },

    maskOpacity2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: .4,
        borderRadius :5,
        backgroundColor: '#283349'
    },

    
    balance : {
        position: 'relative',
        paddingLeft: 11,
        paddingRight: 11,
        paddingTop: 25,
        paddingBottom: 25,
    },
    totalBalanceAndVisible : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalBalance:{
        fontSize: 24,
        color: '#edd073',
        fontFamily: 'Roboto_700Bold'
    },
    visibleButton : {
        color: '#8a8c8e'
    },
    totalKDG:{
        fontSize:15,
         color: '#ddd9d8',
         marginTop: 8,
    },
    availableAndLock:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    availableAndLockBlock: {
        width: '50%'
    },
    textAvailableAndLock : {
        fontSize: 12,
        color: '#8a8c8e',
    },
    quantityAvailableAndLock : {
        fontSize: 16,
        color: '#ddd9d8',
        marginTop: 8,
        fontFamily: 'Roboto_500Medium'
    },

    groupButton:{
        marginTop: 16,
        marginLeft: -7.5,
        marginRight: -7.5,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    buttonBlock: {
        width: '25%',
        paddingLeft: 7.5,
        paddingRight: 7.5
    },
    button: {
        paddingTop: 9,
        paddingBottom: 9,
        position:'relative',
        flexDirection:'column',
        flex: 1,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 12,
        color: '#ffffff',
    },
    listCoinHead:{
        marginTop: 25,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    listCoinHeadColor: {
        color: '#8a8c8e',
        fontSize: 14
    },
    listCoin:{
        marginTop: 18,
        position: 'relative',
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingTop: 5,
    },
    coin: {
        padding: 10,
        position:'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: 5,
    },
    coinLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    coinRight: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    coinName: {
        fontSize: 14,
        color: '#ffffff'
    },
    coinPirce:{
        color: '#8a8c8e',
        fontSize: 12,
    },
    quantity: {
        color: "#fac800",
    },
    coinSwipeRight: {
        backgroundColor: '#26a65b',
        marginTop: 5,
        marginRight: 7,
        width: 58,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    coinSwipeLeft: {
        backgroundColor: '#ff0000',
        marginTop: 5,
        marginLeft: 7,
        width: 58,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    listPostHead: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:20
    },
    listPostHeadText : {
        color:'#8a8c8e',
        fontSize: 14,
    },
    listPostHeadViewMore: {
        color: '#fac800',
        fontSize: 12,
        fontFamily: 'Roboto_400Regular_Italic'
    },
    listPost: {
        marginTop: 12,
        overflow : 'scroll',
    },
    listPostScroll: {
        marginHorizontal: -5,
        flex: 1,
        flexDirection: 'row'
    },
    post: {
        paddingHorizontal: 5,
        width: 243,
    },
    postImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        overflow: 'hidden',
        borderRadius :5
    },
    postTitle: {
        color: '#ddd9d8',
        fontSize: 13,
        marginTop: 10
    }
})

export default styles