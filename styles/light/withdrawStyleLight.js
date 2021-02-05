import {StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log("Width: " + windowWidth + " --- " + "Height: " + windowHeight);
const styles = StyleSheet.create({
        searchBoxContainer: {
        borderRadius: 25,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        padding: 13


    },
    searchBox: {
        color: '#8a8c8e', 
        width: '100%'
    },
    iconSearch: {
        padding: (windowWidth*windowHeight)/28000
    },

    // ------------ List style -----------------
        textList: {
            fontSize: (windowWidth*windowHeight)/22032,
            color: '#283349',

        },
        description: {
            fontSize: (windowWidth*windowHeight)/27116,
            color: '#74767a',
        },
        exchangeRate: {
            fontSize: (windowWidth*windowHeight)/22032,
            color: 'rgba(241,243,244, 0.7)',

        },
        nearExchangeRate: {
            fontSize: (windowWidth*windowHeight)/27116,
            color: '#74767a',
        },

        listContainer : {
            padding: (windowWidth*windowHeight)/23040,
            borderBottomWidth: 1,
            borderBottomColor: '#eae8e8', 
        },

// ---------WithdrawPage2----------

    // ------ Số dư ------------
        balanceContainer: {
            borderRadius: 10,
            borderColor: '#cc9e00',
            borderWidth: 2,
            margin: (windowWidth*windowHeight)/23040,
            padding: (windowWidth*windowHeight)/23040,
        },
        coinName: {
            fontWeight: 'bold',
            color: '#283349',
            fontSize:  15

        },
        balance: {
            color: '#74767a',
            fontSize: 14
        },
    // ------ Số tiền gửi ------------
        numberSendContainer: {
            borderRadius: 10,
            margin: (windowWidth*windowHeight)/23040,
            padding: (windowWidth*windowHeight)/23040,
            backgroundColor: '#fff',
        },
        nearSymbol: {
            color: '#8a8c8e',
            fontSize: 40
        },
        inputNumContainer: {
            borderRadius: 10,
            backgroundColor: '#f1f3f4',
            flexDirection: 'row',   
            width: windowWidth/3,
        },
        inputNumContainer2: {
            borderRadius: 10,
            backgroundColor: '#f1f3f4',
            width: '100%'
    
        },
        inputNum: {
            color: '#8a8c8e',
            fontSize: 14,
        }


})

export default styles