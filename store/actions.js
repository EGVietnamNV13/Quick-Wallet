import AsyncStorage from "@react-native-community/async-storage";
import { ROUTERS } from "../routers";
import calAPI from "../axios";
import { storage } from "../helper";

export const GET_ROUTERS = "GET_ROUTERS";
export const CHANGE_ROUTER = "CHANGE_ROUTER";
export const CHANGE_NOTIFY = "CHANGE_NOTIFY";
export const CHANGE_SCREEN_WIDTH = "CHANGE_SCREEN_WIDTH";
export const CHANGE_SCREEN_HEIGHT = "CHANGE_SCREEN_HEIGHT";
export const CHANGE_USER_DATA = "CHANGE_USER_DATA";
export const CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS";
export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const CHANGE_DISPLAY = "CHANGE_DISPLAY";
export const CHANGE_PIN = "CHANGE_PIN";
export const CHANGE_COIN_NUMBERS = "CHANGE_COIN_NUMBERS";
export const GET_COIN_SOCKET = "GET_COIN_SOCKET";
export const CHANGE_SECURE_STATUS = "CHANGE_SECURE_STATUS";
export const CHANGE_CHANGE_WALLET_NAME = "CHANGE_CHANGE_WALLET_NAME";

export function actChangeRouters(routers) {
  return {
    type: CHANGE_ROUTER,
    payload: { routers },
  };
}

export function actChangeIsGetReward(isgetreward) {
  return {
    type: CHANGE_ROUTER,
    payload: { isgetreward },
  };
}

export function actChangeNotify(notify) {
  return {
    type: CHANGE_NOTIFY,
    payload: { notify },
  };
}

export function actChangeScreenWidth(width) {
  return {
    type: CHANGE_SCREEN_WIDTH,
    payload: { width },
  };
}

export function actChangeScreenHeight(height) {
  return {
    type: CHANGE_SCREEN_HEIGHT,
    payload: { height },
  };
}
export function actChangeUserData(loginData) {
  return {
    type: CHANGE_USER_DATA,
    payload: { loginData },
  };
}

export function actChangeLoginStatus(status) {
  return {
    type: CHANGE_LOGIN_STATUS,
    payload: { status },
  };
}

export function actChangeCoinSocket(coin) {
  return {
    type: GET_COIN_SOCKET,
    payload: { coin },
  };
}

export function actChangeSecureStatus(secstatus) {
  return {
    type: CHANGE_SECURE_STATUS,
    payload: { secstatus },
  };
}

export function actChangeCoinNumbers(coinNumbers) {
  return {
    type: CHANGE_COIN_NUMBERS,
    payload: { coinNumbers },
  };
}

export function actChangeWalletName(walletname) {
  return {
    type: CHANGE_CHANGE_WALLET_NAME,
    payload: { walletname },
  };
}

export function actChangeCurrency(currency) {
  return {
    type: CHANGE_CURRENCY,
    payload: { currency },
  };
}

export function actChangeLanguage(language) {
  return {
    type: CHANGE_LANGUAGE,
    payload: { language },
  };
}

export function actChangeDisplay(display) {
  return {
    type: CHANGE_DISPLAY,
    payload: { display },
  };
}

export function actChangePin(pin) {
  return {
    type: CHANGE_PIN,
    payload: { pin },
  };
}

export function asyncGetRouters() {
  return async (dispatch) => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("loginData"));
      const isNotFirstTime = JSON.parse(
        await AsyncStorage.getItem("isNotFirstTime")
      );
      // const PIN = JSON.parse(await AsyncStorage.getItem("pin"));

      const currency = JSON.parse(await AsyncStorage.getItem("currency"));
      const language = JSON.parse(await AsyncStorage.getItem("language"));
      const display = JSON.parse(await AsyncStorage.getItem("display"));
      // if (PIN) {
      //   dispatch(actChangePin(PIN));
      // }

      if (!currency && currency !== 0) {
        await AsyncStorage.setItem("currency", JSON.stringify(0));
        dispatch(actChangeCurrency(0));
      } else {
        dispatch(actChangeCurrency(currency));
      }

      if (!language && language !== 0) {
        await AsyncStorage.setItem("language", JSON.stringify(0));
        dispatch(actChangeLanguage(0));
      } else {
        dispatch(actChangeLanguage(language));
      }

      if (!display) {
        await AsyncStorage.setItem("display", JSON.stringify(0));
        dispatch(actChangeDisplay(1));
      } else {
        dispatch(actChangeDisplay(display));
      }

      const newRouters = [];

      if (userData) {
        ROUTERS.forEach((router) => {
          if (router.reqLogin) {
            newRouters.push(router);
          }
        });
        dispatch(actChangeUserData(userData));
        dispatch(actChangeLoginStatus(true));
      } else {
        ROUTERS.forEach((router) => {
          if (!router.reqLogin) {
            newRouters.push(router);
          }
        });
        dispatch(actChangeLoginStatus(false));
      }

      if (isNotFirstTime) {
        newRouters.forEach((el, index) => {
          if (el.needFirstTime) {
            newRouters.splice(index, 1);
          }
        });
      }

      // if(!PIN){
      //     newRouters.forEach((el,index)=>{
      //         if(el.isNeedPin){
      //             newRouters.splice(index, 1)
      //         }
      //     })
      // }

      dispatch(actChangeRouters(newRouters));

      return null;
    } catch (err) {
      dispatch(actChangeRouters(ROUTERS));
      dispatch(actChangeLoginStatus(false));
    }
  };
}

export function asyncConvertKDGReward(value) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).post("/api/convert_kdg_reward", value)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncConvertKDG(value) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/convert_kdg", value)).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncGetCoinList() {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).get(`/getCoinList`)).data;
      dispatch(actChangeUserInfo(res.data));
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncUpdateUser(UserInfo) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).put("/api/user", UserInfo)).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncReg(regInfo) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/register_user", regInfo))
        .data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncRegisterCode(Email) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).post("/api/create_register_code", Email)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncForgotPassword(userInfo) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).post("/api/forgot_password", userInfo)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asynForgotPasswordCode(Email) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).post("/api/create_forgot_password_code", Email)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncChangePassword(userInfo) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).post("/api/change_password", userInfo)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncWithdraw(submiteData) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/deposit", submiteData))
        .data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncStaking(submiteData) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).post("/api/create_staking", submiteData)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}
// --------------------------2FA------------------------

export function async2FA(userId) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/create_2fa", userId)).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncVerify2FA(verifyInfo) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/verify_2fa", verifyInfo))
        .data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncDisable2FA(verifyInfo) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/disable_2fa", verifyInfo))
        .data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

// ----------------------------------------------------

export function asyncGetUserbyID(userId) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).get(`/api/user/${userId}`)).data;
      dispatch(actChangeUserInfo(res.data));
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncGetNews(skip, take) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).get(`/api/news?skip=${skip}&take=${take}`)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncGetBalance(type, address) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).get(`/api/${type}/balance/${address}`)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncGetBalanceDouble(address1, address2) {
  return async () => {
    var callAPI = await calAPI();
    // const res = (await (await calAPI()).get(`/api/${type}/balance/${address}`)).data
    // const res2 = (await (await calAPI()).get('/api/news?skip=0&take=10')).data
    return Promise.all([
      callAPI.get(`/api/eth_usdt/balance/${address1}`),
      callAPI.get(`/api/tron_kdg/balance/${address2}`),
    ])
      .then(([resETH, resTRX]) => {
        return { resETH, resTRX };
      })
      .catch((error) => {
        return { ok: false, status: error.response.status };
      });
  };
}

export function asyncGetCoinPrice(coinType) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).get(
          `/api/markets/coin_price?coin_type=${coinType}`
        )
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncExportPrivateKey(userInfo) {
  return async (dispatch) => {
    try {
      const res = (await (await calAPI()).post("/api/private_key", userInfo))
        .data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

// export function asyncGetCoinPrice(coinType){
//     return async () =>{
//         var callAPI = await calAPI()

//         return Promise.all([
//             (await (callAPI.get(`/api/markets/coin_price?coin_type=${coinType}`))).data,
//             (await (callAPI.get('api/global/convert_money/USDVND'))).data,
//         ])
//         .then(([resVND, resUSDVND]) =>{
//             return {resVND, resUSDVND};
//         })
//         .catch(error =>{
//             return {ok: false, status: error.response.status}

//         })
//     }
// }

export function asyncGetTransaction(userid, coinType, skip, limit) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).get(
          `/api/transactions?userid=${userid}&coin=${coinType}&skip=${skip}&limit=${limit}`
        )
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

// export function asyncGetBlockchainTransaction(type, address, take, begin_date){
//     return async (dispatch) =>{
//         try {
//             const res = (await (await calAPI()).get(`/api/blockchain_transaction?coin_type=${type}&address=${address}&skip=1&take=${take}&begin_date=${begin_date}`)).data
//             return res
//         } catch (error) {
//             return {ok: false, status: error.response.status}
//         }
//     }
// }

export function asyncGetStakingTransaction(userID) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).get(`/api/get_staking_transaction/${userID}`)
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncGetTransactionRef(userID) {
  return async (dispatch) => {
    try {
      const res = (
        await (await calAPI()).get(
          `/api/get_transaction?id=${userID}&skip=0&take=9999999&type=kyc-success`
        )
      ).data;
      return res;
    } catch (error) {
      return { ok: false, status: error.response.status };
    }
  };
}

export function asyncLogout() {
  return async (dispatch) => {
    try {
      dispatch(actChangeLoginStatus(false));
      const newRouters = [];

      await AsyncStorage.clear();
      await storage("isNotFirstTime", true).setItem();

      ROUTERS.forEach((router) => {
        if (!router.reqLogin && !router.needFirstTime && !router.isNeedPin) {
          newRouters.push(router);
        }
      });
      dispatch(actChangeRouters(newRouters));

      return null;
    } catch (error) {}
  };
}

export function asyncSecureStatus(secstatus) {
  return async (dispatch) => {
    try {
      dispatch(actChangeSecureStatus(secstatus));
      await AsyncStorage.setItem("secstatus", JSON.stringify(secstatus));
    } catch (error) {}
  };
}

export function asyncSetWalletName(walletname) {
  return async (dispatch) => {
    try {
      dispatch(actChangeWalletName(walletname));
      await AsyncStorage.setItem("walletname", JSON.stringify(walletname));
    } catch (error) {}
  };
}

export function asyncSetCoin(coin) {
  return async (dispatch) => {
    try {
      dispatch(actChangeCoin(coin));
      await AsyncStorage.setItem("coin", JSON.stringify(coin));
    } catch (error) {}
  };
}

export function asyncSetCoinNumbers(coinNumbers) {
  return async (dispatch) => {
    try {
      dispatch(actChangeCoinNumbers(coinNumbers));
      await AsyncStorage.setItem("coinNumbers", JSON.stringify(coinNumbers));
    } catch (error) {}
  };
}

export function asyncGetCoinSocket(coin) {
  return async (dispatch) => {
    try {
      dispatch(actChangeCoinSocket(coin));
      await AsyncStorage.setItem("coin", JSON.stringify(coin));
    } catch (error) {}
  };
}

export function asyncSetCurrency(currency) {
  return async (dispatch) => {
    try {
      dispatch(actChangeCurrency(currency));
      await AsyncStorage.setItem("currency", JSON.stringify(currency));
    } catch (error) {}
  };
}

export function asyncSetLanguage(language) {
  return async (dispatch) => {
    try {
      dispatch(actChangeLanguage(language));
      await AsyncStorage.setItem("language", JSON.stringify(language));
    } catch (error) {}
  };
}

export function asyncSetDisplay(display) {
  return async (dispatch) => {
    try {
      dispatch(actChangeDisplay(display));
      await AsyncStorage.setItem("display", JSON.stringify(display));
    } catch (error) {}
  };
}

export function asyncSetLoginData(loginData) {
  return async (dispatch) => {
    try {
      dispatch(actChangeUserData(loginData));
      await AsyncStorage.setItem("loginData", JSON.stringify(loginData));
    } catch (error) {}
  };
}

export function asyncSetPin(pin) {
  return async (dispatch) => {
    try {
      dispatch(actChangePin(pin));
      await AsyncStorage.setItem("pin", JSON.stringify(pin));
    } catch (error) {}
  };
}
