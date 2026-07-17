import { StyleSheet } from "react-native";
import { hs, ms, ws } from "../designs/measurement.design";

export const createStyles = (theme: any) =>

  StyleSheet.create({
    container: {
      flex: ws(1),
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: ws(1),
      justifyContent: 'center',
      padding: ws(20),
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: ws(15),
      padding: ws(20),
      elevation: ws(5),
      shadowColor: theme.shadow,
      shadowOpacity: ws(0.15),
      shadowRadius: ws(10),
      shadowOffset: {
        width: ws(0),
        height: hs(4),
      },
    },
    title: {
      fontSize: ms(25),
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      color: theme.subText,
      marginTop: hs(5),
      marginBottom: hs(25),
      fontSize: ms(15),
    },
    input: {
      height: hs(45),
      borderWidth: ws(1),
      borderColor: theme.border,
      borderRadius: ws(10),
      paddingHorizontal: ws(15),
      fontSize: ms(15),
      marginBottom: hs(15),
      backgroundColor: theme.input,
      color: theme.text,
    },
    addressInput: {
      height: hs(90),
      textAlignVertical: 'top',
      paddingTop: hs(15),
    },
    button: {
      backgroundColor: theme.primary,
      height: hs(45),
      borderRadius: ws(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hs(10),
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: 'bold',
      fontSize: ms(15),
    },
    errorText: {
      color: '#DC2626',
      fontSize: ms(14),
      marginBottom: hs(15),
      marginTop: hs(-10),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: hs(22),
    },
    footerText: {
      fontSize: ms(14),
      color: theme.subText,
    },
    eyeIcon: {
      position: "absolute",
      right: ws(15),
      top: hs(0),
      bottom: hs(0),
      justifyContent: "center",
      alignItems: "center",
    },
    loginText: {
      color: theme.primary,
      fontWeight: 'bold',
      fontSize: ms(14),
    },
    passwordInput: {
      flex: ws(1),
      height: hs(40),
      color: theme.text,
    },
  });