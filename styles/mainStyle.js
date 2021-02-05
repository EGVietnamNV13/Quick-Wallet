import React from "react";

import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    fontFamily: "Roboto_400Regular",
  },
  color1: {
    color: "#8a8c8e",
  },
  color2: {
    color: "#ddd9d8",
  },
  color3: {
    color: "#fac800",
  },
  fontsize12: {
    fontSize: 12,
  },
  fontsize13: {
    fontSize: 13,
  },

  fontsize14: {
    fontSize: 14,
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: 10,
    right: 32,
  },
  title: {
    color: "#642c83",
    fontSize: 30,
  },
  subTitle: {
    color: "#ddd9d8",
    fontSize: 17,
    marginTop: 13,
  },
  formBlock: {},
  inputBlock: {
    position: "relative",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  placeHolderText: {
    position: "absolute",
    left: 5,
    fontSize: 15,
    color: "#ddd9d8",
  },
  input: {
    borderColor: "#72747d",
    borderStyle: "solid",
    borderBottomWidth: 1,
    width: "100%",
    padding: 5,
    color: "#ddd9d8",
    fontSize: 16,
  },
  inputWithButton: {
    borderColor: "#72747d",
    borderStyle: "solid",
    borderBottomWidth: 1,
    width: "80%",
    padding: 5,
  },
  buttonWithInput: {
    width: "20%",
  },
  showPasswordButton: {
    position: "absolute",
    top: "50%",
    right: 5,
  },
  eyeStyle: {
    color: "#8a8c8e",
  },
  checkBox: {
    backgroundColor: "#ddd9d8",
    width: 15,
    height: 15,
    borderRadius: 2,
    position: "relative",
  },
  checkBoxTick: {
    position: "absolute",
    top: 3,
    left: 2,
    width: 11,
    height: 9,
  },
  button: {
    backgroundColor: "#642c83",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    marginTop: 45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  groupText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 13,
  },
  pagiSlide: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: "#6f611c",
    marginLeft: 8,
  },
  pagiSlideActive: {
    backgroundColor: "#fac800",
  },
});
export default styles;
