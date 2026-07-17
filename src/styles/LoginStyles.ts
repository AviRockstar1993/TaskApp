import { StyleSheet } from 'react-native';
import { hs, ms, ws } from '../designs/measurement.design';

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: ws(1),
      backgroundColor: theme.background,
      justifyContent: 'center',
      paddingHorizontal: ws(20),
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: ws(10),
      padding: ws(20),
      elevation: ws(5),
      shadowColor: theme.text,
      shadowOffset: {
        width: ws(0),
        height: hs(2),
      },
      shadowOpacity: ws(0.2),
      shadowRadius: ws(4),
    },
    title: {
      fontSize: ms(25),
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.text,
    },
    subtitle: {
      fontSize: ms(15),
      color: theme.subText,
      textAlign: 'center',
      marginTop: hs(5),
      marginBottom: hs(25),
    },
    input: {
      height: hs(50),
      borderWidth: ws(1),
      borderColor: theme.border,
      backgroundColor: theme.input,
      color: theme.text,
      borderRadius: ws(5),
      paddingHorizontal: ws(10),
      marginBottom: hs(18),
      fontSize: ms(15),
    },
    button: {
      backgroundColor: theme.primary,
      height: hs(50),
      borderRadius: ws(5),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hs(10),
    },
    buttonDisabled: {
      opacity: ws(0.6),
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: ms(15),
      fontWeight: '600',
    },
    errorText: {
      color: '#DC2626',
      fontSize: ms(14),
      marginBottom: hs(15),
      marginTop: hs(-10),
    },
    forgotPassword: {
      textAlign: 'center',
      marginTop: hs(15),
      color: theme.primary,
      fontWeight: '500',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: hs(25),
    },
    footerText: {
      color: theme.subText,
    },
    signup: {
      color: theme.primary,
      fontWeight: 'bold',
    },
    passwordContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor:theme.border,
  borderRadius: ws(5),
  paddingHorizontal: ws(10),
  marginBottom: hs(12),
},

passwordInput: {
  flex: ws(1),
  height: hs(50),
   color: theme.text,
},

eyeIcon: {
  position: "absolute",
  right: ws(15),
  top: hs(0),
  bottom: hs(0),
  justifyContent: "center",
  alignItems: "center",
},
  });