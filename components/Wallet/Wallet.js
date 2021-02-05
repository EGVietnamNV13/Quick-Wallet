import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  BackHandler,
  FlatList,
  Clipboard,
} from "react-native";
import { Camera } from "expo-camera";
import { mainStyles, walletStyles, scannerStyles } from "../../styles/";
import { walletStylesLight } from "../../styles/light/";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faTimes,
  faEye,
  faEyeSlash,
  faSortAmountDown,
  faPlusCircle,
  faAngleRight,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";

import openscaner from "../../assets/images/openscaner.png";
import openscanerLight from "../../assets/images/openscanerLight.png";

import GroupButton from "./GroupButton";
import ListCoin from "./ListCoin";
import { checkLanguage, storage } from "../../helper";
import socket from "../../socket";
import { asyncGetCoinSocket } from "../../store/actions";

const hiddenBalance = "******";

export default function App({ navigation }) {
  const coinDisplay = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  const typeCurrency = useSelector((state) => state.currency);
  const language = useSelector((state) => state.language);

  const display = useSelector((state) => state.display);
  const isgetreward = useSelector((state) => state.isgetreward);

  const [IsScannerOpen, setIsScannerOpen] = useState(false);
  const [VisibleBalance, setVisibleBalance] = useState(false);
  const [IsShortCoin, setIsShortCoin] = useState(false);
  const [IsTapShortCoin, setIsTapShortCoin] = useState(false);

  const handleBarCodeScanned = useCallback(({ type, data }) => {
    Clipboard.setString(data);
    Alert.alert(
      checkLanguage(
        {
          vi: "Bạn đã sao chép địa chỉ ví",
          en: "You have copied the wallet address to the clipboard",
        },
        language
      ),
      `${data}`
    );
    setIsScannerOpen(false);
  }, []);

  const openScanner = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setIsScannerOpen(true);
    } else {
      Alert.alert(
        checkLanguage({ vi: "Cấp quyền?", en: "Allowing access?" }, language),
        checkLanguage(
          {
            vi: "Bạn phải cấp quyền camera để sử dụng tính năng này",
            en:
              'You need to allow "Quick Wallet" to access your camera to use this feature',
          },
          language
        )
      );
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setIsScannerOpen(false);
      return true;
    });
  }, []);

  const sortHandler = (isSort, isTapSort) => {
    setIsShortCoin(!isSort);
    setIsTapShortCoin(true);
  };

  var WalletStyle = display === 1 ? walletStylesLight : walletStyles;

  const [dataSocket, setDataSocket] = useState([]);
  useEffect(() => {
    socket.on("SOCKET_COIN_CHANGE", (res) => {
      setDataSocket(res);
    });
  }, []);

  const [coinImg, setCoinImg] = useState([]);
  useEffect(() => {
    try {
      const formdata = {
        api_passer: {
          key_passer: "get_coi_lst",
        },
      };
      socket.emit("/socketVnaWallet", formdata);
      socket.on("get_coi_lst", async function (res) {
        setCoinImg(res);
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetCoinSocket({
        coinImg: coinImg,
        dataSocket: dataSocket,
      })
    );
  }, [coinImg, dataSocket]);

  return (
    <>
      {!IsScannerOpen && (
        <View
          style={[
            mainStyles.container,
            { paddingBottom: 20, paddingHorizontal: 15 },
          ]}
        >
          <View style={[WalletStyle.header]}>
            <View>
              <Text style={WalletStyle.titleHeader}>QUICK WALLET</Text>
            </View>
            <View style={WalletStyle.groupIcon}>
              <TouchableOpacity
                onPress={() => {
                  openScanner();
                }}
              >
                <Image
                  style={WalletStyle.scanQRIcon}
                  source={display === 1 ? openscanerLight : openscaner}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("Notify", {})}
                style={WalletStyle.notifyIcon}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ color: display === 1 ? "#283349" : "#ffff" }}
                />
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={WalletStyle.balance}>
            <View style={WalletStyle.maskOpacity}></View>
            <View style={WalletStyle.totalBalanceAndVisible}>
              <Text style={WalletStyle.totalBalance}>3.12 BTC</Text>
              <TouchableOpacity
                onPress={() => setVisibleBalance(!VisibleBalance)}
              >
                <View style={{ padding: 13 }}>
                  <FontAwesomeIcon
                    style={WalletStyle.visibleButton}
                    icon={VisibleBalance ? faEyeSlash : faEye}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={WalletStyle.availableAndLock}>
              <View style={WalletStyle.availableAndLockBlock}>
                <Text style={WalletStyle.textAvailableAndLock}>
                  {checkLanguage(
                    { vi: "Tài sản sẵn có", en: "Available Asset" },
                    language
                  )}
                </Text>
                <Text style={WalletStyle.quantityAvailableAndLock}>$1000</Text>
              </View>
              <View style={WalletStyle.availableAndLockBlock}>
                <Text style={WalletStyle.textAvailableAndLock}>
                  {checkLanguage(
                    { vi: "Tài sản bị khoá", en: "Locked Asset" },
                    language
                  )}
                </Text>
                <Text style={WalletStyle.quantityAvailableAndLock}>$10</Text>
              </View>
            </View>
          </View>

          <GroupButton dataSocket={dataSocket} coinImg={coinImg} />

          <View style={WalletStyle.listCoinHead}>
            <Text style={WalletStyle.listCoinHeadColor}>
              {checkLanguage(
                { vi: "Tổng tài sản!", en: "Total Asset!" },
                language
              )}
            </Text>
            <View
              style={[
                WalletStyle.listCoinHead,
                { justifyContent: "flex-end", marginTop: 0 },
              ]}
            >
              {/* <TouchableOpacity
                onPress={() => sortHandler(IsShortCoin, IsTapShortCoin)}
              >
                <FontAwesomeIcon
                  style={WalletStyle.listCoinHeadColor}
                  icon={IsShortCoin ? faSortAmountUp : faSortAmountDown}
                />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate("SetCoins")}>
                <FontAwesomeIcon
                  style={[WalletStyle.listCoinHeadColor, { marginLeft: 15 }]}
                  icon={faPlusCircle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ListCoin
            VisibleBalance={VisibleBalance}
            hiddenBalance={hiddenBalance}
            isShortCoin={IsShortCoin}
            isTapSort={IsTapShortCoin}
            dataSocket={dataSocket}
            coinImg={coinImg}
          />

          {/* <View style={WalletStyle.listPostHead}>
                        <Text style={WalletStyle.listPostHeadText}>{checkLanguage({ vi: 'Tin tức', en: 'News' }, language)}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={WalletStyle.listPostHeadViewMore}>{checkLanguage({ vi: 'Xem thêm', en: 'See more' }, language)}</Text>
                            <FontAwesomeIcon style={WalletStyle.listPostHeadViewMore} icon={faAngleRight} />
                        </TouchableOpacity>
                    </View> */}

          <View style={WalletStyle.listPostScroll}>
            {/* <View>
                    <Text style={{color: '#000'}}>Test Socket</Text>
                        <Text style={{color: '#000'}}>{dataSocket}</Text>
                </View> */}
            {/* {
                            checkLanguage({
                                vi: (
                                    <FlatList
                                        horizontal={true}
                                        data={NewsData}
                                        keyExtractor={(item, index) => index + '123'}
                                        renderItem={({ item, index }) => {

                                            if (item.content_vi !== undefined && item.thumbURL_vi !== undefined) {
                                                return <View key={index + 'aaaa'} style={WalletStyle.post}>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('News', {
                                                            NewsID: item._id
                                                        })}
                                                    >
                                                        <View style={{ width: '100%', borderRadius: 5, overflow: 'hidden', }}>
                                                            <Image style={WalletStyle.postImage} source={{ uri: item.thumbURL_vi }} /></View>
                                                        <Text style={WalletStyle.postTitle}>{item.title_vi}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            }
                                        }


                                        }
                                    />
                                ),
                                en: (
                                    <FlatList
                                        horizontal={true}
                                        data={NewsData}
                                        keyExtractor={(item, index) => index + '123'}
                                        renderItem={({ item, index }) => {
                                            if (item.content_en !== undefined && item.thumbURL_en !== undefined) {
                                                return <View key={index + 'aaaaa'} style={WalletStyle.post}>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('News', {
                                                            NewsID: item._id
                                                        })}
                                                    >
                                                        <View style={{ width: '100%', borderRadius: 5, overflow: 'hidden', }}>
                                                            <Image style={WalletStyle.postImage} source={{ uri: item.thumbURL_en }} /></View>
                                                        <Text style={WalletStyle.postTitle}>{item.title_en}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            }
                                        }


                                        }
                                    />
                                )
                            }, language)

                        } */}
          </View>
        </View>
      )}
      {IsScannerOpen && (
        <View
          style={[
            scannerStyles.container,
            {
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsScannerOpen(false)}
            style={[scannerStyles.closeButton]}
          >
            <FontAwesomeIcon
              style={{ color: "#fac800" }}
              size={30}
              icon={faTimes}
            />
          </TouchableOpacity>
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            ratio="1:1"
            style={[
              {
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").width,
                position: "absolute",
                top: "50%",
                transform: [
                  { translateY: -Dimensions.get("screen").width / 2 },
                ],
              },
            ]}
          />
        </View>
      )}
    </>
  );
}
