import React, { useState, useCallback, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
  Button,
} from "react-native";
import { mainStyles as styles } from "../../styles/";
import { useDispatch, useSelector } from "react-redux";
import calAPI from "../../axios";
import ticker from "../../assets/images/ticker.png";
import { transition, checkLanguage } from "../../helper";
import { asyncReg, asyncRegisterCode } from "../../store/actions";
import socket from "../../socket";
import Popup from "../Popup/Popup";
import bg from "../../assets/images/bg.jpg";
import bg2 from "../../assets/images/bg2.jpg";

export default function App({ navigation, setBackGround }) {
  const [PopupStatus, setPopupStatus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTimeout(function () {
      setModalVisible(false);
    }, 1000);
  };
  useMemo(() => {
    if (display === 1) {
      setBackGround(bg2);
    } else {
      setBackGround(bg);
    }
  }, []);

  const dispatch = useDispatch();
  const [ToggleCheckBox, setToggleCheckBox] = useState(false);

  const [Email, setEmail] = useState("");
  const [EmailValidate, setEmailValidate] = useState(<Text></Text>);
  const [EmailFocus, setEmailFocus] = useState(false);
  const [EmailTextPosition, setEmailTextPosition] = useState(11);
  const [EmailTextSize, setEmailTextSize] = useState(15);

  const [EmailCode, setEmailCode] = useState("");
  const [EmailCodeValidate, setEmailCodeValidate] = useState(<Text></Text>);
  const [EmailCodeFocus, setEmailCodeFocus] = useState(false);
  const [EmailCodeTextPosition, setEmailCodeTextPosition] = useState(11);
  const [EmailCodeTextSize, setEmailCodeTextSize] = useState(15);

  const [Password, setPassword] = useState("");
  const [PasswordValidate, setPasswordValidate] = useState(<Text></Text>);
  const [PasswordFocus, setPasswordFocus] = useState(false);
  const [PasswordTextPosition, setPasswordTextPosition] = useState(11);
  const [PasswordTextSize, setPasswordTextSize] = useState(15);

  const [RePassword, setRePassword] = useState("");
  const [RePasswordValidate, setRePasswordValidate] = useState(<Text></Text>);
  const [RePasswordFocus, setRePasswordFocus] = useState(false);
  const [RePasswordTextPosition, setRePasswordTextPosition] = useState(11);
  const [RePasswordTextSize, setRePasswordTextSize] = useState(15);

  const [RefCode, setRefCode] = useState("");
  const [RefCodeFocus, setRefCodeFocus] = useState(false);
  const [RefCodeTextPosition, setRefCodeTextPosition] = useState(11);
  const [RefCodeTextSize, setRefCodeTextSize] = useState(15);

  const [IsShowPassword, setIsShowPassword] = useState(false);
  const [InputPasswordHeight, setInputPasswordHeight] = useState(0);
  const [InputPasswordEyeHeight, setInputPasswordEyeHeight] = useState(0);

  const [CheckValidate, setCheckValidate] = useState(false);

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
    if (EmailCodeFocus) {
      transition(300, 11, 36, setEmailCodeTextPosition);
      transition(300, 15, 12, setEmailCodeTextSize);
    } else {
      transition(300, 36, 11, setEmailCodeTextPosition);
      transition(300, 12, 15, setEmailCodeTextSize);
    }
  }, [EmailCodeFocus]);

  useEffect(() => {
    if (PasswordFocus) {
      transition(300, 11, 36, setPasswordTextPosition);
      transition(300, 15, 12, setPasswordTextSize);
    } else {
      transition(300, 36, 11, setPasswordTextPosition);
      transition(300, 12, 15, setPasswordTextSize);
    }
  }, [PasswordFocus]);

  useEffect(() => {
    if (RePasswordFocus) {
      transition(300, 11, 36, setRePasswordTextPosition);
      transition(300, 15, 12, setRePasswordTextSize);
    } else {
      transition(300, 36, 11, setRePasswordTextPosition);
      transition(300, 12, 15, setRePasswordTextSize);
    }
  }, [RePasswordFocus]);

  useEffect(() => {
    if (RefCodeFocus) {
      transition(300, 11, 36, setRefCodeTextPosition);
      transition(300, 15, 12, setRefCodeTextSize);
    } else {
      transition(300, 36, 11, setRefCodeTextPosition);
      transition(300, 12, 15, setRefCodeTextSize);
    }
  }, [RefCodeFocus]);

  // --------------------Validation------------------------
  const validateEmail = (val) => {
    setSeconds(0);
    setEmail(val);
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
    var passwordFormat = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/;
    if (val.match(passwordFormat)) {
      setPasswordValidate(null);
    } else {
      setPasswordValidate(
        <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
          {checkLanguage(
            {
              vi: "Ít nhất 8 ký tự, bao gồm chữ và số",
              en: `At least 8 digits, include word and number`,
            },
            language
          )}
        </Text>
      );
    }
  };
  const validateRePassword = (val) => {
    setRePassword(val);
    if (val === Password) {
      setRePasswordValidate(null);
    } else {
      setRePasswordValidate(
        <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
          {checkLanguage(
            {
              vi: "Mật khẩu không khớp. Hãy thử lại.",
              en: `Not match. Please try again.`,
            },
            language
          )}
        </Text>
      );
    }
  };
  const validateEmailCode = (val) => {
    setEmailCode(val);
    var EmailCodeFormat = /^\d{6}$/;
    if (val.match(EmailCodeFormat)) {
      setEmailCodeValidate(null);
    } else {
      setEmailCodeValidate(
        <Text style={{ color: "#C00F10", fontStyle: "italic" }}>
          {checkLanguage(
            { vi: "Mã xác minh không hợp lệ", en: `Verify code invalid` },
            language
          )}
        </Text>
      );
    }
  };
  useEffect(() => {
    if (
      EmailValidate === null &&
      EmailCodeValidate === null &&
      PasswordValidate === null &&
      RePasswordValidate === null
    ) {
      setCheckValidate(true);
    } else {
      setCheckValidate(false);
    }
  }, [EmailValidate, EmailCodeValidate, PasswordValidate, RePasswordValidate]);
  // ------------------------------------------------------
  // const reg = useCallback(() => {
  //     console.log(Email);
  //     if(!ToggleCheckBox){
  //         Alert.alert(
  //             checkLanguage({vi: 'Thông báo', en: `Notification`},language),
  //             checkLanguage({vi: 'Bạn chưa đồng ý điều khoản', en: `You don't agree to the terms`},language),
  //         )
  //         return;
  //     }
  //     dispatch(asyncReg({email: Email, password: Password, parent_ref_code: RefCode, register_code : EmailCode}))
  //     .then((res)=>{
  //         console.log(res)
  //         if(res.status === 0){
  //             setEmailCodeValidate(<Text style={{color: '#C00F10' ,fontStyle: 'italic'}}>{checkLanguage({vi: 'Mã xác minh không đúng', en: `Verify code incorrect`},language)}</Text>)
  //             return
  //         }
  //         if(res.status === 1){
  //             navigation.replace('Login', {
  //                 email_params: Email
  //             })
  //         }
  //     })
  //     .catch(console.log)

  // }, [ToggleCheckBox, Email, EmailCode, Password, RePassword, RefCode])
  const reg = useCallback(async (email, pass, code) => {
    console.log(email + ".." + "pass" + code);
    var arry = email.split("@");
    var user_name = arry[0];
    try {
      const formdata = {
        api_passer: {
          key_passer: "cus_sig_up",
          user_name: user_name,
          password: pass,
          email: email,
          active_code: code,
        },
      };
      socket.emit("/socketVnaWallet", formdata);
      socket.on("cus_sig_up", async function (response) {
        console.log(response);
        if (response.status === true) {
          console.log("Log: Dang ky thanh cong");
          Alert.alert(
            checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
            checkLanguage(
              {
                vi: "Đăng ký tài khoản thành công",
                en: "Account registration is successful",
              },
              language
            ),
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.replace("Login", {
                    email_params: email,
                  }),
              },
            ],
            { cancelable: false }
          );
        } else {
          console.log("Log: Dang ky false");
          Alert.alert(
            checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
            checkLanguage(
              {
                vi: "Thông tin đăng ký không hợp lệ. Vui lòng thử lại",
                en: "Invalid registration information. Please try again",
              },
              language
            ),
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
        }
      });
    } catch (error) {}
  }, []);

  const reqMailCode = useCallback(async (email) => {
    try {
      const formdata = {
        api_passer: {
          key_passer: "chk_eml",
          email: email,
        },
      };
      socket.emit("/socketVnaWallet", formdata);
      socket.on("chk_eml", async function (response) {
        console.log(response);
        if (response.status === true) {
          setPopupStatus(true);
          toggleModal();
          setSeconds(120);
          console.log("Req mail true");
        } else {
          setPopupStatus(false);
          console.log("Req mail false");
        }
      });
    } catch (error) {}
  }, []);

  const ToggleShowPassword = useCallback(() => {
    setIsShowPassword(!IsShowPassword);
  }, [IsShowPassword]);

  const [seconds, setSeconds] = useState(0);

  function updateTime() {
    if (seconds == 0) {
      console.log("xong");
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  }

  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return function cleanUp() {
      clearTimeout(token);
    };
  }, [seconds]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: 50, paddingHorizontal: 30, paddingBottom: 20 },
      ]}
    >
      <Text style={styles.title}>
        {checkLanguage({ vi: "Đăng ký", en: "Register" }, language)}
      </Text>
      <Text
        style={[styles.subTitle, display === 1 ? { color: "#283349" } : null]}
      >
        {checkLanguage(
          { vi: "Tạo tài khoản mới", en: `Create a new account` },
          language
        )}
      </Text>
      <View style={styles.formBlock}>
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
            onFocus={() => {
              Email !== "" || (!EmailFocus && setEmailFocus(true));
            }}
            onBlur={() => {
              Email === "" && setEmailFocus(false);
            }}
            onChangeText={(value) => validateEmail(value)}
            value={Email}
            autoCapitalize="none"
            style={[
              styles.input,
              display === 1
                ? { borderColor: "#e8e8e8", color: "#283349" }
                : null,
            ]}
          />
        </View>
        <View style={{ padding: 2 }}>{EmailValidate}</View>
        <Popup
          type={PopupStatus === true ? "success" : "failed"}
          title={
            PopupStatus === true
              ? checkLanguage(
                  { vi: "Lấy mã thành công", en: `Succesful` },
                  language
                )
              : checkLanguage(
                  {
                    vi: "Vui lòng chờ 2 phút để gửi lại",
                    en: `Please wait 2 minutes to resend`,
                  },
                  language
                )
          }
          isModalVisible={isModalVisible}
        />
        <View style={[styles.inputBlock]}>
          <Text
            style={[
              styles.placeHolderText,
              { bottom: EmailCodeTextPosition, fontSize: EmailCodeTextSize },
              EmailCodeFocus && {
                color: display === 1 ? "#283349" : "#8a8c8e",
              },
            ]}
          >
            {checkLanguage(
              { vi: "Mã xác minh email", en: `Vertification code` },
              language
            )}
          </Text>
          <TextInput
            keyboardType="decimal-pad"
            onFocus={() => {
              EmailCode !== "" || (!EmailCodeFocus && setEmailCodeFocus(true));
            }}
            onBlur={() => {
              EmailCode === "" && setEmailCodeFocus(false);
            }}
            onChangeText={(value) => validateEmailCode(value)}
            value={EmailCode}
            style={[
              [
                styles.input,
                display === 1
                  ? { borderColor: "#e8e8e8", color: "#283349" }
                  : null,
              ],
              { width: "84%" },
            ]}
          />
          <TouchableOpacity
            style={{ width: 78 }}
            disabled={EmailValidate === null && seconds === 0 ? false : true}
            onPress={() => reqMailCode(Email)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                opacity: EmailValidate === null && seconds === 0 ? 1 : 0.5,
                backgroundColor: "#642c83",
                borderRadius: 10,
                alignItems: "center",
                padding: 3,
              }}
            >
              <Text style={{ color: "rgba(255,255,255,0.8)", paddingLeft: 5 }}>
                {checkLanguage({ vi: "Lấy mã", en: `Get code` }, language)}
              </Text>
              <Text
                style={{ color: "rgba(255,255,255,0.8)", paddingHorizontal: 5 }}
              >
                {seconds === 0 ? null : seconds}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 2 }}>{EmailCodeValidate}</View>
        <View style={[styles.inputBlock, { flexDirection: "column" }]}>
          <View style={[styles.inputBlock, { marginTop: 0 }]}>
            <Text
              style={[
                styles.placeHolderText,
                { bottom: PasswordTextPosition, fontSize: PasswordTextSize },
                PasswordFocus && {
                  color: display === 1 ? "#283349" : "#8a8c8e",
                },
              ]}
            >
              {checkLanguage({ vi: "Mật khẩu", en: `Mật khẩu` }, language)}
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
              // secureTextEntry={!IsShowPassword}
            />
            <TouchableOpacity
              onPress={ToggleShowPassword}
              style={[
                styles.showPasswordButton,
                {
                  top: InputPasswordHeight / 2.5 - InputPasswordEyeHeight / 2,
                  padding: 10,
                },
              ]}
            >
              <FontAwesomeIcon
                style={styles.eyeStyle}
                icon={IsShowPassword ? faEye : faEyeSlash}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: 2 }}>{PasswordValidate}</View>
        <View style={styles.inputBlock}>
          <Text
            style={[
              styles.placeHolderText,
              { bottom: RePasswordTextPosition, fontSize: RePasswordTextSize },
              RePasswordFocus && {
                color: display === 1 ? "#283349" : "#8a8c8e",
              },
            ]}
          >
            {checkLanguage(
              { vi: "Xác nhận mật khẩu", en: `Confirm password` },
              language
            )}
          </Text>
          <TextInput
            onFocus={() => {
              RePassword !== "" ||
                (!RePasswordFocus && setRePasswordFocus(true));
            }}
            onBlur={() => {
              RePassword === "" && setRePasswordFocus(false);
            }}
            onChangeText={(value) => validateRePassword(value)}
            value={RePassword}
            style={[
              styles.input,
              display === 1
                ? { borderColor: "#e8e8e8", color: "#283349" }
                : null,
            ]}
            // secureTextEntry={!IsShowPassword}
          />
          <TouchableOpacity
            onLayout={(e) =>
              setInputPasswordEyeHeight(e.nativeEvent.layout.height)
            }
            onPress={ToggleShowPassword}
            style={[
              styles.showPasswordButton,
              {
                top: InputPasswordHeight / 2.5 - InputPasswordEyeHeight / 2,
                padding: 10,
              },
            ]}
          >
            <FontAwesomeIcon
              style={styles.eyeStyle}
              icon={IsShowPassword ? faEye : faEyeSlash}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 2 }}>{RePasswordValidate}</View>
        <View style={styles.inputBlock}>
          <Text
            style={[
              styles.placeHolderText,
              { bottom: RefCodeTextPosition, fontSize: RefCodeTextSize },
              RefCodeFocus && { color: display === 1 ? "#283349" : "#8a8c8e" },
            ]}
          >
            {checkLanguage(
              { vi: "Mã mời (tuỳ chọn)", en: `Referral code (optional)` },
              language
            )}
          </Text>
          <TextInput
            onFocus={() => {
              RefCode !== "" || (!RefCodeFocus && setRefCodeFocus(true));
            }}
            onBlur={() => {
              RefCode === "" && setRefCodeFocus(false);
            }}
            onChangeText={(value) => setRefCode(value)}
            value={RefCode}
            style={[
              [
                styles.input,
                display === 1
                  ? { borderColor: "#e8e8e8", color: "#283349" }
                  : null,
              ],
            ]}
          />
        </View>

        <View style={[styles.inputBlock]}>
          <TouchableOpacity onPress={() => setToggleCheckBox(!ToggleCheckBox)}>
            <View
              style={[
                styles.checkBox,
                ToggleCheckBox && { backgroundColor: "#642c83" },
              ]}
            >
              <Image
                style={[styles.checkBoxTick, !ToggleCheckBox && { opacity: 0 }]}
                source={ticker}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: display === 1 ? "#283349" : "#8a8c8e",
              marginLeft: 6,
            }}
          >
            {checkLanguage(
              { vi: "Tôi đồng ý với", en: `I agree with` },
              language
            )}
            <Text
              // onPress={() => navigation.navigate("Terms2")}
              style={{ color: "#005cfc" }}
            >
              {" "}
              {checkLanguage(
                {
                  vi: "Thoả thuận người dùng/ Chính sách bảo mật",
                  en: `User Agreement | Privacy Policy of Quick Wallet`,
                },
                language
              )}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={CheckValidate ? false : true}
          style={[styles.button, { opacity: CheckValidate ? 1 : 0.5 }]}
          onPress={() => reg(Email, Password, EmailCode)}
        >
          <Text style={styles.buttonText}>
            {checkLanguage({ vi: "Đăng ký", en: `Register` }, language)}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.groupText, { justifyContent: "center", marginTop: 24 }]}
      >
        <Text style={{ color: "#8a8c8e" }}>
          {checkLanguage(
            {
              vi: "Bạn đã có tài khoản?",
              en: `Do you already have an account?`,
            },
            language
          )}
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={([styles.linkText], { color: "#642c83" })}>
            {checkLanguage({ vi: "  Đăng nhập", en: `  Login` }, language)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}></View>
    </View>
  );
}
