import React, { useState, useCallback, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { ROUTERS } from "../../routers";
import {
  actChangeUserData,
  actChangeLoginStatus,
  asyncLogin,
  actChangeRouters,
  asyncSetLoginData,
} from "../../store/actions";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { mainStyles as styles } from "../../styles/";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { transition, checkLanguage, storage } from "../../helper";
import * as Device from "expo-device";

import bg from "../../assets/images/bg.jpg";
import bg2 from "../../assets/images/bg2.jpg";

// var mobile_device_id = (Device.modelName + Device.osBuildId).replace(/ /g, "");

export default function App({ navigation, setBackGround }) {
  const dispatch = useDispatch();
  const [Error, setError] = useState(<Text></Text>);
  const [Email, setEmail] = useState("");
  const [EmailValidate, setEmailValidate] = useState(<Text></Text>);
  const [EmailFocus, setEmailFocus] = useState(false);
  const [EmailTextPosition, setEmailTextPosition] = useState(11);
  const [EmailTextSize, setEmailTextSize] = useState(15);

  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const [Password, setPassword] = useState("");
  const [PasswordValidate, setPasswordValidate] = useState(<Text></Text>);
  const [PasswordFocus, setPasswordFocus] = useState(false);
  const [PasswordTextPosition, setPasswordTextPosition] = useState(11);
  const [PasswordTextSize, setPasswordTextSize] = useState(15);

  const [IsShowPassword, setIsShowPassword] = useState(false);
  const [InputPasswordHeight, setInputPasswordHeight] = useState(0);
  const [InputPasswordEyeHeight, setInputPasswordEyeHeight] = useState(0);

  const [Loading, setLoading] = useState(false);

  const route = useRoute();
  const { email_params } = route.params ?? {};

  const isFocus = useIsFocused();

  useMemo(() => {
    if (display === 1) {
      setBackGround(bg2);
    } else {
      setBackGround(bg);
    }
  }, [isFocus]);

  useEffect(() => {
    if (email_params) {
      setEmailFocus(true);
      setEmailValidate(null);
      setEmail(email_params);
    }
  }, []);
  useEffect(() => {
    if (EmailFocus) {
      transition(300, 11, 36, setEmailTextPosition);
      transition(300, 15, 12, setEmailTextSize);
    } else {
      transition(300, 36, 11, setEmailTextPosition);
      transition(300, 12, 15, setEmailTextSize);
    }
  }, [EmailFocus]);

  useEffect(() => {
    if (PasswordFocus) {
      transition(300, 11, 36, setPasswordTextPosition);
      transition(300, 15, 12, setPasswordTextSize);
    } else {
      transition(300, 36, 11, setPasswordTextPosition);
      transition(300, 12, 15, setPasswordTextSize);
    }
  }, [PasswordFocus]);

  // --------------------Validation------------------------
  const validateEmail = (val) => {
    setEmail(val);
    setError(null);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val.match(mailformat)) {
      setEmailValidate(null);
    } else {
      setEmailValidate(
        <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
          {checkLanguage(
            { vi: "Email không hợp lệ", en: "Invalid email" },
            language
          )}
        </Text>
      );
    }
  };

  const validatePassword = (val) => {
    setPassword(val);
    setError(null);
    setPasswordValidate(null);
    // var passwordFormat = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/;
    // if (val.match(passwordFormat)) {
    //   setPasswordValidate(null);
    // } else {
    //   setPasswordValidate(
    //     <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
    //       {checkLanguage(
    //         {
    //           vi: "Ít nhất 8 ký tự, bao gồm chữ và số",
    //           en: `At least 8 digits, include word and number`,
    //         },
    //         language
    //       )}
    //     </Text>       //        <View style={AccountStyle.itemHeader}>
    //     <Image source={support}/>
    //     <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
    // </View>
    //   );
    // }
  };
  // ------------------------------------------------------

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const formdata = {
        api_passer: {
          key_passer: "cus_log_in",
          email: email,
          password: password,
        },
      };
      socket.emit("/socketVnaWallet", formdata);
      socket.on("cus_log_in", async function (res) {
        console.log(res);
        if (res.status === true) {
          setLoading(false);
          storage("token", res.token).setItem();
          var newRouters = [];
          ROUTERS.forEach((router) => {
            if (router.reqLogin) {
              newRouters.push(router);
            }
          });
          await storage("userInfo", res.data.user_info).setItem();
          await storage("userId", res.data.user_info.id).setItem();
          await storage("isLogin", true).setItem();
          dispatch(asyncSetLoginData(res));
          var newRouters = [];
          ROUTERS.forEach((router) => {
            if (router.reqLogin) {
              newRouters.push(router);
            }
          });
          // console.log(newRouters);
          await dispatch(actChangeRouters(newRouters));
        } else {
          setLoading(false);
          setError(
            <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
              {checkLanguage(
                {
                  vi: "Email và mật khẩu không đúng",
                  en: `Email or password incorrect`,
                },
                language
              )}
            </Text>
          );
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  // const login = async (email, password) => {
  //   navigation.replace('Main');
  // };

  // const login = useCallback(() => {
  //   setLoading(false);

  //   navigation.replace("Main");
  //   // setLoading(true);
  //   // if (EmailValidate === null && PasswordValidate === null) {
  //   //   dispatch(
  //   //     asyncLogin({
  //   //       email: Email,
  //   //       password: Password,
  //   //       mobile_device_id: mobile_device_id ? mobile_device_id : null,
  //   //     })
  //   //   ).then((res) => {
  //   //     console.log(res);
  //   //     if (res.status === 103) {
  //   //       setLoading(false);
  //   //       setError(
  //   //         <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
  //   //           {checkLanguage(
  //   //             {
  //   //               vi: "Email và mật khẩu không đúng",
  //   //               en: `Email or password incorrect`,
  //   //             },
  //   //             language
  //   //           )}
  //   //         </Text>
  //   //       );
  //   //       return;
  //   //     }
  //   //     if (res.status === 104) {
  //   //       setLoading(false);
  //   //       setError(
  //   //         <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
  //   //           {checkLanguage(
  //   //             {
  //   //               vi: "Email và mật khẩu không đúng",
  //   //               en: `Email or password incorrect`,
  //   //             },
  //   //             language
  //   //           )}
  //   //         </Text>
  //   //       );
  //   //       return;
  //   //     }
  //   //     if (res.status === 1) {
  //   //       setLoading(false);

  //   //       navigation.replace("Main");

  //   //       return;
  //   //     }
  //   //     console.log(res);
  //   //     setLoading(false);
  //   //     setError(
  //   //       <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
  //   //         {checkLanguage(
  //   //           { vi: "Đã có lỗi xảy ra", en: `An error has occurred` },
  //   //           language
  //   //         )}
  //   //       </Text>
  //   //     );
  //   //   });
  //   // }
  // });

  const ToggleShowPassword = useCallback(() => {
    setIsShowPassword(!IsShowPassword);
  }, [IsShowPassword]);

  return (
    <View
      style={[styles.container, { paddingHorizontal: 30, paddingTop: 110 }]}
    >
      {/* <TouchableOpacity onPress={login}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity> */}
      <Text style={styles.title}>
        {checkLanguage({ vi: "Xin chào", en: `Hello` }, language)}
      </Text>
      <Text
        style={[styles.subTitle, display === 1 ? { color: "#283349" } : null]}
      >
        {checkLanguage(
          { vi: "Đăng nhập để tiếp tục", en: `Log in to continue` },
          language
        )}
      </Text>
      <View style={[styles.formBlock, { marginTop: 42 }]}>
        <View style={styles.inputBlock}>
          <Text
            style={[
              styles.placeHolderText,
              { bottom: EmailTextPosition, fontSize: EmailTextSize },
              EmailFocus && { color: display === 1 ? "#283349" : "#8a8c8e" },
            ]}
          >
            Email
          </Text>
          <TextInput
            autoCapitalize="none"
            onFocus={() => {
              Email !== "" || (!EmailFocus && setEmailFocus(true));
            }}
            onBlur={() => {
              Email === "" && setEmailFocus(false);
            }}
            // onChangeText={value => setEmail(value)}
            onChangeText={(value) => validateEmail(value)}
            value={Email}
            style={[
              styles.input,
              display === 1
                ? { borderColor: "#e8e8e8", color: "#283349" }
                : null,
            ]}
          />
        </View>
        <View style={{ padding: 5 }}>
          {EmailValidate ? EmailValidate : Error}
        </View>
        <View style={styles.inputBlock}>
          <Text
            style={[
              styles.placeHolderText,
              { bottom: PasswordTextPosition, fontSize: PasswordTextSize },
              PasswordFocus && { color: display === 1 ? "#283349" : "#8a8c8e" },
            ]}
          >
            {checkLanguage({ vi: "Mật khẩu", en: `Password` }, language)}
          </Text>
          <TextInput
            onFocus={() => {
              Password !== "" || (!PasswordFocus && setPasswordFocus(true));
            }}
            onBlur={() => {
              Password === "" && setPasswordFocus(false);
            }}
            onLayout={(e) =>
              setInputPasswordHeight(e.nativeEvent.layout.height)
            }
            onChangeText={(value) => validatePassword(value)}
            value={Password}
            style={[
              styles.input,
              display === 1
                ? { borderColor: "#e8e8e8", color: "#283349" }
                : null,
            ]}
            secureTextEntry={!IsShowPassword}
          />
          <TouchableOpacity
            onLayout={(e) =>
              setInputPasswordEyeHeight(e.nativeEvent.layout.height)
            }
            onPress={ToggleShowPassword}
            style={[
              styles.showPasswordButton,
              {
                top: InputPasswordHeight / 2 - InputPasswordEyeHeight / 2,
                padding: 15,
              },
            ]}
          >
            <FontAwesomeIcon
              style={styles.eyeStyle}
              icon={IsShowPassword ? faEye : faEyeSlash}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5 }}>{PasswordValidate}</View>
        <View style={{ padding: 5 }}>{PasswordValidate}</View>
        <TouchableOpacity
          disabled={
            EmailValidate === null &&
            PasswordValidate === null &&
            Loading === false
              ? false
              : true
          }
          onPress={() => login(Email, Password)}
          style={{
            ...styles.button,
            ...{
              opacity:
                EmailValidate === null &&
                PasswordValidate === null &&
                Loading === false
                  ? 1
                  : 0.5,
            },
          }}
        >
          {Loading === true ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {checkLanguage({ vi: "Đăng nhập", en: `Login` }, language)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.groupText,
          { justifyContent: "space-between", marginTop: 24 },
        ]}
      >
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={[styles.linkText, { color: "#642c83" }]}>
            {checkLanguage(
              { vi: "Quên mật khẩu?", en: `Forgot password?` },
              language
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => navigation.navigate("Reg")}
        >
          <Text style={([styles.linkText], { color: "#642c83" })}>
            {checkLanguage({ vi: "Đăng ký", en: `Register` }, language)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
