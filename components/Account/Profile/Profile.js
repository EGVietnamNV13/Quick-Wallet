import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Header2, HeaderwithButton } from "../../Header";
import { mainStyles, accountStyle } from "../../../styles";
import defaultAvata from "../../../assets/images/default-avata.webp";
import defaultAvataPNG from "../../../assets/images/default-avata.png";
import { useRoute } from "@react-navigation/native";
import { asyncGetUserbyID, asyncLogout } from "../../../store/actions";
import { LinearGradient } from "expo-linear-gradient";
import { storage, checkLanguage } from "../../../helper";
import { asyncUpdateUser } from "../../../store/actions";
import { Popup } from "../../Popup";

function isValidDate(dateString) {
  var regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var [date, month, year] = dateString.split("/");
  var d = new Date(year, month - 1, 0);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return true;
}
export default function App() {
  const dispatch = useDispatch();
  const route = useRoute();
  const [Height, setHeight] = useState(0);
  const [ContentHeight, setContentHeight] = useState(0);
  const [ButtonHeight, setButtonHeight] = useState(0);
  const screenHeight = useSelector((state) => state.height);
  const [Loading, setLoading] = useState(false);

  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const [BlockWidth, setBlockWidth] = useState(0);
  const [ImageWidth, setImageWidth] = useState(0);
  const [image, setImage] = useState(
    Platform.OS === "ios" ? defaultAvataPNG : defaultAvata
  );

  const [SelectedGender, setSelectedGender] = useState(0);

  const [UserInfoInServer, setUserInfoInServer] = useState({});
  const [FirstName, setFirstName] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [IsUpadteSuccess, setIsUpadteSuccess] = useState(false);

  const { email } = route.params;

  useEffect(() => {
    async function getUserInfo() {
      var userid = await storage("userId").getItem();
      dispatch(asyncGetUserbyID(userid)).then((res) => {
        setUserInfoInServer({
          Name: res.data.first_name + " " + res.data.last_name,
          Gender: res.data.gioi_tinh_id,
          Birthday: res.data.birth_day,
        });
        setSelectedGender(res.data.gioi_tinh_id);
        setName(res.data.last_name);
        setAddress(res.data.address);
        setFirstName(res.data.first_name);
        setBirthday(
          new Date(res.data.birth_day).getDate().toString() +
            "/" +
            (new Date(res.data.birth_day).getMonth() + 1).toString() +
            "/" +
            new Date(res.data.birth_day).getFullYear().toString()
        );
      });
    }

    getUserInfo();
  }, [IsUpadteSuccess]);

  const getPermissionAsync = useCallback(async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          checkLanguage({ vi: "Tải hình", en: `Upload photo` }, language),
          checkLanguage(
            {
              vi: "Bạn cần cấp quyền để ứng dụng tải hình lên",
              en: `You need permission for the app to upload photo`,
            },
            language
          )
        );
      } else pickImage();
    } else pickImage();
  }, []);

  const pickImage = useCallback(async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    } catch (E) {
      console.log(E);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    dispatch(asyncLogout()).then(() => {});
  }, []);

  const updateUser = useCallback(
    async (first_name, name, gender, birthday, address) => {
      var [day, month, year] = birthday.split("/");

      var birth_day = `${month}/${day}/${year}`;

      toggleModal();

      var userid = await storage("userId").getItem();
      var submitInfo = {
        id: userid,
        gioi_tinh_id: SelectedGender,
        first_name: first_name,
        last_name: name,
        birth_day: birth_day,
        address: address,
      };

      dispatch(asyncUpdateUser(submitInfo))
        .then((res) => {
          console.log(res);
          if (res.data !== null && res.status === 1) {
            setIsUpadteSuccess(true);
            return;
          }

          setIsUpadteSuccess(false);
        })
        .catch(console.log);
    },
    [Name, SelectedGender, Address, FirstName]
  );

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTimeout(function () {
      setModalVisible(false);
    }, 1000);
  };

  return (
    <>
      <Header2
        type="logout"
        setHeight={setHeight}
        title={checkLanguage({ vi: "Hồ sơ cá nhân", en: `Profile` }, language)}
      />
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={[
          mainStyles.container,
          { paddingHorizontal: 36, paddingTop: 78 },
        ]}
      >
        <Popup
          type="success"
          title={checkLanguage(
            { vi: "Cập nhật thành công", en: `Update successful` },
            language
          )}
          isModalVisible={isModalVisible}
        />

        <View
          onLayout={(e) => setBlockWidth(e.nativeEvent.layout.width)}
          style={{
            paddingHorizontal: 19,
            paddingTop: 40,
            paddingBottom: 18,
            flexDirection: "row",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <TouchableOpacity
            disabled={true}
            onLayout={(e) => setImageWidth(e.nativeEvent.layout.width)}
            onPress={getPermissionAsync}
            style={{
              position: "absolute",
              top: -53,
              alignSelf: "center",
              left: BlockWidth / 2 - ImageWidth / 2,
              zIndex: 999,
            }}
          >
            <View
              style={{
                width: 66,
                height: 66,
                position: "relative",
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ width: 66, height: 66, resizeMode: "contain" }}
                source={image.uri ? { uri: image.uri } : image}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: -50 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor:
                display === 1 ? "#e8e8e8" : "rgba(255,255,255,0.2)",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 35,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: display === 1 ? "#283349" : "#fff", width: 110 }}
            >
              {checkLanguage({ vi: "Họ", en: `First name` }, language)}
            </Text>
            <TextInput
              onChangeText={(value) => setFirstName(value)}
              value={FirstName}
              placeholder="Nhập họ"
              placeholderTextColor="rgba(0,0,0,0,0.5)"
              style={{
                width: "100%",
                color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor:
                display === 1 ? "#e8e8e8" : "rgba(255,255,255,0.2)",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 35,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: display === 1 ? "#283349" : "#fff", width: 110 }}
            >
              {checkLanguage({ vi: "Tên", en: `Last name` }, language)}
            </Text>
            <TextInput
              onChangeText={(value) => setName(value)}
              value={Name}
              placeholder="Nhập tên"
              placeholderTextColor="rgba(0,0,0,0,0.5)"
              style={{
                width: "100%",
                color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor:
                display === 1 ? "#e8e8e8" : "rgba(255,255,255,0.2)",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 35,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: display === 1 ? "#283349" : "#fff", width: 110 }}
            >
              Email
            </Text>
            <TextInput
              editable={false}
              value={email}
              placeholder="Nhập họ và tên"
              placeholderTextColor="rgba(0,0,0,0,0.5)"
              style={{
                width: "100%",
                color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor:
                display === 1 ? "#e8e8e8" : "rgba(255,255,255,0.2)",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 35,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: display === 1 ? "#283349" : "#fff", width: 110 }}
            >
              {checkLanguage({ vi: "Giới tính", en: `Gender` }, language)}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setSelectedGender(0)}
                style={{
                  backgroundColor: "#ddd9d8",
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {SelectedGender === 0 ? (
                  <View
                    style={{
                      backgroundColor: "#642c83",
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                    }}
                  ></View>
                ) : null}
              </TouchableOpacity>
              <Text
                style={{
                  color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                  paddingLeft: 15,
                  paddingRight: 40,
                }}
              >
                {checkLanguage({ vi: "Nam", en: `Male` }, language)}
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedGender(1)}
                style={{
                  backgroundColor: "#ddd9d8",
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {SelectedGender === 1 ? (
                  <View
                    style={{
                      backgroundColor: "#642c83",
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                    }}
                  ></View>
                ) : null}
              </TouchableOpacity>
              <Text
                style={{
                  width: "100%",
                  color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                  paddingLeft: 15,
                }}
              >
                {checkLanguage({ vi: "Nữ", en: `Female` }, language)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor:
                display === 1 ? "#e8e8e8" : "rgba(255,255,255,0.2)",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 35,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: display === 1 ? "#283349" : "#fff", width: 110 }}
            >
              {checkLanguage(
                { vi: "Ngày sinh", en: `Date of birth` },
                language
              )}
            </Text>
            <TextInput
              onChangeText={(value) => setBirthday(value)}
              value={Birthday}
              placeholder={checkLanguage(
                { vi: "Ngày/Tháng/Năm", en: `DD/MM/YYYY` },
                language
              )}
              placeholderTextColor="rgba(0,0,0,0,0.5)"
              style={{
                width: "100%",
                color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor:
                display === 1 ? "#e8e8e8" : "rgba(255,255,255,0.2)",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 35,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: display === 1 ? "#283349" : "#fff", width: 110 }}
            >
              {checkLanguage({ vi: "Địa chỉ", en: `Address` }, language)}
            </Text>
            <TextInput
              onChangeText={(value) => setAddress(value)}
              value={Address}
              placeholder={checkLanguage(
                { vi: "Nhập địa chỉ", en: `Enter your address` },
                language
              )}
              placeholderTextColor="rgba(0,0,0,0,0.5)"
              style={{
                width: "100%",
                color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
              }}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() =>
          updateUser(FirstName, Name, SelectedGender, Birthday, Address)
        }
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#642c83", "#642c83"]}
            style={{
              width: "90%",
              padding: 12,
              alignItems: "center",
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {checkLanguage({ vi: "Cập nhật", en: `Update` }, language)}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 30 }} onPress={handleLogout}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#642c83", "#642c83"]}
            style={{
              width: "90%",
              padding: 12,
              alignItems: "center",
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {checkLanguage({ vi: "Đăng xuất", en: `Log out` }, language)}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </>
  );
}
