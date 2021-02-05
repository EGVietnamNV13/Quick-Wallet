import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { Header2 } from "../../../../../Header";
import { mainStyles } from "../../../../../../styles";

import font from "../../../../../../assets/images/fontID.png";
import selfy from "../../../../../../assets/images/selfy.png";
import selfyleft from "../../../../../../assets/images/selfyleft.png";
import selfyright from "../../../../../../assets/images/selfyright.png";
import selfyup from "../../../../../../assets/images/selfyup.png";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import calAPI from "../../../../../../axios";
import { storage, checkLanguage } from "../../../../../../helper";
import { asyncUpdateUser } from "../../../../../../store/actions";

import FormData from "form-data";
export default function App() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    SelectedID,
    SelectedCountry,
    SelectedSex,
    Name,
    IDNumber,
  } = useRoute().params;

  const screenHeight = useSelector((state) => state.height);
  const [Height, setHeight] = useState(0);
  const [ContentHeight, setContentHeight] = useState(0);
  const [ButtonHeight, setButtonHeight] = useState(0);

  const [Loading, setLoading] = useState(false);

  const [ImageFront, setImageFront] = useState(null);

  const [ImageSelfy, setImageSelfy] = useState(null);
  const [ImageSelfyLeft, setImageSelfyLeft] = useState(null);
  const [ImageSelfyRight, setImageSelfyRight] = useState(null);
  const [ImageSelfyUp, setImageSelfyUp] = useState(null);

  const language = useSelector((state) => state.language);

  const display = useSelector((state) => state.display);

  const pickImage = useCallback(async (type) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: false,
      });
      if (!result.cancelled) {
        if (type === "front") setImageFront(result);
        if (type === "self") setImageSelfy(result);
        if (type === "left") setImageSelfyLeft(result);
        if (type === "right") setImageSelfyRight(result);
        if (type === "up") setImageSelfyUp(result);
      }
    } catch (E) {
      console.log(E);
    }
  }, []);

  const getPermissionAsync = useCallback(async (type) => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert("Tải hình", "Bạn cần cấp quyền để ứng dụng tải hình lên");
      } else pickImage(type);
    } else pickImage(type);
  }, []);

  const handleNext = useCallback(async () => {
    var userid = await storage("userId").getItem();
    setLoading(true);
    if (ImageFront && ImageSelfy) {
      const arrayUpload = [];
      const uploadFront = new FormData();
      const extFront = ImageFront.uri.substr(
        ImageFront.uri.lastIndexOf(".") + 1
      );
      const fileFront = {
        uri:
          Platform.OS === "android"
            ? ImageFront.uri
            : ImageFront.uri.replace("file://", ""),
        type: "image/png",
        name: `photo.${extFront}`,
      };
      uploadFront.append("file", fileFront);
      uploadFront.append("userId", userid);
      arrayUpload.push(
        (await calAPI()).post("/api/upload_kyc_image", uploadFront)
      );

      const extSelf = ImageFront.uri.substr(
        ImageFront.uri.lastIndexOf(".") + 1
      );
      const fileSelf = {
        uri:
          Platform.OS === "android"
            ? ImageSelfy.uri
            : ImageSelfy.uri.replace("file://", ""),
        type: "image/png",
        name: `photo.${extSelf}`,
      };
      const uploadSelf = new FormData();
      uploadSelf.append("file", fileSelf);
      uploadSelf.append("userId", userid);
      arrayUpload.push(
        (await calAPI()).post("/api/upload_kyc_image", uploadSelf)
      );

      const extSelfyLeft = ImageSelfyLeft.uri.substr(
        ImageSelfyLeft.uri.lastIndexOf(".") + 1
      );
      const fileSelfyLeft = {
        uri:
          Platform.OS === "android"
            ? ImageSelfyLeft.uri
            : ImageSelfyLeft.uri.replace("file://", ""),
        type: "image/png",
        name: `photo.${extSelfyLeft}`,
      };
      const uploadSelfyLeft = new FormData();
      uploadSelfyLeft.append("file", fileSelfyLeft);
      uploadSelfyLeft.append("userId", userid);
      arrayUpload.push(
        (await calAPI()).post("/api/upload_kyc_image", uploadSelfyLeft)
      );

      const extSelfyRight = ImageSelfyRight.uri.substr(
        ImageSelfyRight.uri.lastIndexOf(".") + 1
      );
      const fileSelfyRight = {
        uri:
          Platform.OS === "android"
            ? ImageSelfyRight.uri
            : ImageSelfyRight.uri.replace("file://", ""),
        type: "image/png",
        name: `photo.${extSelfyRight}`,
      };
      const uploadSelfyRight = new FormData();
      uploadSelfyRight.append("file", fileSelfyRight);
      uploadSelfyRight.append("userId", userid);
      arrayUpload.push(
        (await calAPI()).post("/api/upload_kyc_image", uploadSelfyRight)
      );

      const extSelfyUp = ImageSelfyUp.uri.substr(
        ImageSelfyUp.uri.lastIndexOf(".") + 1
      );
      const fileSelfyUp = {
        uri:
          Platform.OS === "android"
            ? ImageSelfyUp.uri
            : ImageSelfyUp.uri.replace("file://", ""),
        type: "image/png",
        name: `photo.${extSelfyUp}`,
      };
      const uploadSelfyUp = new FormData();
      uploadSelfyUp.append("file", fileSelfyUp);
      uploadSelfyUp.append("userId", userid);
      arrayUpload.push(
        (await calAPI()).post("/api/upload_kyc_image", uploadSelfyUp)
      );

      try {
        var res = await Promise.all(arrayUpload);
        var isUploadOK = true;
        var isLarge = false;
        res.forEach((el) => {
          if (el.data.status !== 1) isUploadOK = false;
          if (el.data.status === 100) isLarge = true;
        });

        if (isLarge) {
          Alert.alert(
            checkLanguage({ vi: "Lỗi", en: `Error` }, language),
            checkLanguage(
              {
                vi: "Hình không được vượt quá 2 MB",
                en: `Image must smaller than 2MB`,
              },
              language
            )
          );
          setLoading(false);

          return;
        }

        if (isUploadOK === false) {
          Alert.alert("Lỗi", "Tải hình không thành công");
          setLoading(false);
          return;
        }
        if (isUploadOK === true) {
          var kycInfo = {
            kyc_country: SelectedCountry === 0 ? "VN" : "Others",
            kyc_number: IDNumber.toString(),
            kyc_name: Name,
            kyc: "2",
            id: userid,
          };
          dispatch(asyncUpdateUser(kycInfo)).then((res) => {
            console.log(res);
            if (res.status === 1) {
              Alert.alert(
                checkLanguage(
                  { vi: "Thông báo", en: `Notification` },
                  language
                ),
                checkLanguage(
                  {
                    vi: "Đã nộp KYC, vui lòng chờ duyệt",
                    en: `KYC is submitted, please wait for approval`,
                  },
                  language
                )
              );
              navigation.navigate("Secure");
              setLoading(false);
              return;
            }
            if (res.status === 100) {
              Alert.alert(
                checkLanguage({ vi: "Lỗi", en: `Error` }, language),
                checkLanguage(
                  {
                    vi:
                      "Số chứng minh / băng lái xe đã được sử dụng cho tài khoản khác",
                    en: `ID card / Driver's license has been used for another account`,
                  },
                  language
                )
              );
              setLoading(false);
              return;
            }
            Alert.alert(
              checkLanguage({ vi: "Lỗi", en: `Error` }, language),
              checkLanguage(
                { vi: "KYC không thành công", en: `KYC failed` },
                language
              )
            );
          });
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    }
    Alert.alert(
      checkLanguage({ vi: "Lỗi", en: `Error` }, language),
      checkLanguage(
        { vi: "Tải hình không thành công", en: `Upload photo failed` },
        language
      )
    );
    setLoading(false);
  }, [ImageFront, ImageSelfy]);

  return (
    <>
      <Header2
        setHeight={setHeight}
        title={checkLanguage(
          { vi: "Tải lên hình ảnh", en: `Upload photo` },
          language
        )}
      />
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={[
          mainStyles.container,
          { paddingHorizontal: 14, paddingVertical: 10 },
        ]}
      >
        <Text
          style={[
            mainStyles.color1,
            mainStyles.fontsize13,
            { color: display === 1 ? "#364155" : "#8a8c8e" },
          ]}
        >
          {checkLanguage(
            {
              vi:
                "Vui lòng sử dụng định dạng JPG., JPEG., PNG. Kích thước tệp tối đa = 2MB",
              en:
                "Please use the format JPG., JPEG., PNG. Maximum file size = 2MB",
            },
            language
          )}
        </Text>
        <Text style={[mainStyles.color1, mainStyles.fontsize13]}>
          {checkLanguage(
            {
              vi:
                "Để đảm bảo quá trình xác minh được thuận tiện, vui lòng không che hoặc làm nhoè ảnh",
              en:
                "To ensure the verification process most quickly, please do not hide or blur the image",
            },
            language
          )}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 33,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {ImageFront && (
            <TouchableOpacity
              onPress={() => setImageFront(null)}
              style={{
                position: "absolute",
                top: -7,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 25,
                backgroundColor: "#8a8c8e",
                zIndex: 99,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </TouchableOpacity>
          )}
          <Text
            style={[mainStyles.fontsize12, mainStyles.color3, { width: "60%" }]}
          >
            {checkLanguage(
              { vi: "1. Ảnh chụp hộ chiếu", en: `1. Passport image` },
              language
            )}
          </Text>
          <TouchableOpacity
            disabled={ImageFront}
            onPress={() => getPermissionAsync("front")}
            style={{
              width: 131,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={[
                { marginTop: 15 },
                ImageFront && {
                  width: 131,
                  height: 81,
                  marginTop: 0,
                  borderRadius: 8,
                },
              ]}
              source={ImageFront ? { uri: ImageFront.uri } : font}
            />
            {!ImageFront && (
              <Text
                style={{
                  marginTop: 8,
                  color: "#005cfc",
                  fontSize: 11,
                  paddingBottom: 4,
                  textDecorationLine: "underline",
                  textDecorationColor: "#005cfc",
                  textAlign: "center",
                }}
              >
                {checkLanguage(
                  { vi: "Nhấn vào đây để tải lên", en: `Click here to upload` },
                  language
                )}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 33,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {ImageSelfy && (
            <TouchableOpacity
              onPress={() => setImageSelfy(null)}
              style={{
                position: "absolute",
                top: -7,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 25,
                backgroundColor: "#8a8c8e",
                zIndex: 99,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </TouchableOpacity>
          )}
          <Text
            style={[mainStyles.fontsize12, mainStyles.color3, { width: "60%" }]}
          >
            {checkLanguage(
              {
                vi:
                  '2. Ảnh có mặt bạn chụp chung với Hộ chiếu và một tờ giấy ghi chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn.',
                en: `2. Image with your face taken with your Passport and a piece of paper which there is a written sentence "KINGDOM GAME 4.0", current date and your signature in that.`,
              },
              language
            )}
          </Text>
          <TouchableOpacity
            disabled={ImageSelfy}
            onPress={() => getPermissionAsync("self")}
            style={{
              width: 131,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={[
                { marginTop: 15 },
                ImageSelfy && {
                  width: 131,
                  height: 81,
                  marginTop: 0,
                  borderRadius: 8,
                },
              ]}
              source={ImageSelfy ? { uri: ImageSelfy.uri } : selfy}
            />
            {!ImageSelfy && (
              <Text
                style={{
                  marginTop: 8,
                  color: "#005cfc",
                  fontSize: 11,
                  paddingBottom: 4,
                  textDecorationLine: "underline",
                  textDecorationColor: "#005cfc",
                  textAlign: "center",
                }}
              >
                {checkLanguage(
                  { vi: "Nhấn vào đây để tải lên", en: `Click here to upload` },
                  language
                )}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 33,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {ImageSelfyLeft && (
            <TouchableOpacity
              onPress={() => setImageSelfyLeft(null)}
              style={{
                position: "absolute",
                top: -7,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 25,
                backgroundColor: "#8a8c8e",
                zIndex: 99,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </TouchableOpacity>
          )}
          <Text
            style={[mainStyles.fontsize12, mainStyles.color3, { width: "60%" }]}
          >
            {checkLanguage(
              {
                vi:
                  '3. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe và một tờ giấy ghi chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn.(Mặt phía bên trái)',
                en: `3. Image with your face taken with your ID / Driver's License and a piece of paper which there is a written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Turn left)`,
              },
              language
            )}
          </Text>
          <TouchableOpacity
            disabled={ImageSelfyLeft}
            onPress={() => getPermissionAsync("selfleft")}
            style={{
              width: 131,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={[
                { marginTop: 15 },
                ImageSelfyLeft && {
                  width: 131,
                  height: 81,
                  marginTop: 0,
                  borderRadius: 8,
                },
              ]}
              source={ImageSelfyLeft ? { uri: ImageSelfyLeft.uri } : selfyleft}
            />
            {!ImageSelfyLeft && (
              <Text
                style={{
                  marginTop: 8,
                  color: "#005cfc",
                  fontSize: 11,
                  paddingBottom: 4,
                  textDecorationLine: "underline",
                  textDecorationColor: "#005cfc",
                  textAlign: "center",
                }}
              >
                {checkLanguage(
                  { vi: "Nhấn vào đây để tải lên", en: `Click here to upload` },
                  language
                )}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 33,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {ImageSelfyRight && (
            <TouchableOpacity
              onPress={() => setImageSelfyRight(null)}
              style={{
                position: "absolute",
                top: -7,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 25,
                backgroundColor: "#8a8c8e",
                zIndex: 99,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </TouchableOpacity>
          )}
          <Text
            style={[mainStyles.fontsize12, mainStyles.color3, { width: "60%" }]}
          >
            {checkLanguage(
              {
                vi:
                  '4. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe và một tờ giấy ghi chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn.(Mặt phía bên phải)',
                en: `4. Image with your face taken with your ID / Driver's License and a piece of paper which there is a written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Turn right)`,
              },
              language
            )}
          </Text>
          <TouchableOpacity
            disabled={ImageSelfyRight}
            onPress={() => getPermissionAsync("selfleft")}
            style={{
              width: 131,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={[
                { marginTop: 15 },
                ImageSelfyRight && {
                  width: 131,
                  height: 81,
                  marginTop: 0,
                  borderRadius: 8,
                },
              ]}
              source={
                ImageSelfyRight ? { uri: ImageSelfyRight.uri } : selfyright
              }
            />
            {!ImageSelfyRight && (
              <Text
                style={{
                  marginTop: 8,
                  color: "#005cfc",
                  fontSize: 11,
                  paddingBottom: 4,
                  textDecorationLine: "underline",
                  textDecorationColor: "#005cfc",
                  textAlign: "center",
                }}
              >
                {checkLanguage(
                  { vi: "Nhấn vào đây để tải lên", en: `Click here to upload` },
                  language
                )}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 33,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {ImageSelfyUp && (
            <TouchableOpacity
              onPress={() => setImageSelfyUp(null)}
              style={{
                position: "absolute",
                top: -7,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 25,
                backgroundColor: "#8a8c8e",
                zIndex: 99,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </TouchableOpacity>
          )}
          <Text
            style={[mainStyles.fontsize12, mainStyles.color3, { width: "60%" }]}
          >
            {checkLanguage(
              {
                vi:
                  '5. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe và một tờ giấy ghi chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn.(Mặt ngước lên)',
                en: `5. Image with your face taken with your ID / Driver's License and a piece of paper which there is a written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Turn up)`,
              },
              language
            )}
          </Text>
          <TouchableOpacity
            disabled={ImageSelfyUp}
            onPress={() => getPermissionAsync("selfleft")}
            style={{
              width: 131,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={[
                { marginTop: 15 },
                ImageSelfyUp && {
                  width: 131,
                  height: 81,
                  marginTop: 0,
                  borderRadius: 8,
                },
              ]}
              source={ImageSelfyUp ? { uri: ImageSelfyUp.uri } : selfyup}
            />
            {!ImageSelfyUp && (
              <Text
                style={{
                  marginTop: 8,
                  color: "#005cfc",
                  fontSize: 11,
                  paddingBottom: 4,
                  textDecorationLine: "underline",
                  textDecorationColor: "#005cfc",
                  textAlign: "center",
                }}
              >
                {checkLanguage(
                  { vi: "Nhấn vào đây để tải lên", en: `Click here to upload` },
                  language
                )}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        disabled={Loading === false ? false : true}
        onLayout={(e) => setButtonHeight(e.nativeEvent.layout.height)}
        style={[
          {
            marginHorizontal: 11,
            flex: 1,
            height: 47,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            overflow: "hidden",
          },
          {
            marginTop:
              screenHeight - ContentHeight - Height - ButtonHeight - 22,
          },
        ]}
      >
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#a47b00", "#edda8b", "#d6b039", "#edda8b", "#a47b00"]}
          style={{
            width: "100%",
            height: 47,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Loading === true ? (
            <ActivityIndicator size="small" color="#0000" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {checkLanguage({ vi: "Tiếp theo", en: `Continue` }, language)}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}
