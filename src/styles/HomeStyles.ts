import { StyleSheet } from 'react-native';
import { hs, ms, ws } from '../designs/measurement.design';

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: {
      fontSize: ms(13),
      color: theme.text,
      fontWeight: "bold",
      marginBottom: hs(10),
    },
    logoutButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: ws(12),
      paddingVertical: ms(8),
      borderRadius: ws(6),
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: 'center',
      paddingHorizontal: ws(15),
      paddingVertical: hs(12),
    },

    logoutButtonText: {
      color: theme.buttonText, fontSize: ms(13),
      fontWeight: "600"
    },
    listContainer: { flex: 1, width: '100%', paddingHorizontal: ws(14), paddingTop: hs(40) },
    userDetails: { marginBottom: hs(15), padding: ws(10), backgroundColor: theme.card, borderRadius: ws(10) },
    userDetailsText: { color: theme.text, fontSize: ms(13), marginBottom: hs(4) },
    inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: hs(10) },
    input: {
      flex: 1,
      height: ws(40),
      borderWidth: ws(1),
      borderColor: theme.border,
      borderRadius: ws(6),
      paddingHorizontal: ws(10),
      backgroundColor: theme.input,
      color: theme.text,
    },
    addButton: { marginLeft: ws(7), backgroundColor: theme.primary, paddingHorizontal: ws(10), paddingVertical: hs(10), borderRadius: ws(6) },
    addButtonText: { color: theme.buttonText },
    taskItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: hs(10), borderBottomWidth: ws(1), borderColor: theme.border },
    taskText: { flex: ws(1), fontSize: ms(16), color: theme.text },
    completedText: { textDecorationLine: 'line-through', color: theme.subText },
    actions: { flexDirection: 'row' },
    actionButton: { marginLeft: ws(8), paddingHorizontal: ws(10), paddingVertical: hs(6), borderRadius: ws(6), backgroundColor: theme.primary },
    actionText: { color: theme.buttonText },
    emptyText: { textAlign: 'center', marginTop: hs(15), color: theme.subText },
    checkedView: {
      backgroundColor: theme.primary,
      marginTop: hs(15),
      padding: ws(12),
      borderRadius: ws(6),
      alignItems: 'center'
    },
    itemText: {
      color: theme.buttonText,
      fontWeight: 'bold',
    },
    textWrapper: {
      fontSize: ms(18),
      fontWeight: "700",
      color: theme.text,
    },
    subtitle: {
      marginTop: hs(4),
      marginBottom: hs(12),
      fontSize: ms(13),
      color: theme.subText,
    },
    taskCard: {
      backgroundColor: theme.card,
      padding: ws(15),
      marginHorizontal: ws(15),
      marginTop: hs(15),
      marginBottom: hs(10),
      borderRadius: ws(10),
      elevation: ws(4),
      shadowColor: theme.subText,
      shadowOffset: {
        width: ws(0),
        height: hs(2),
      },
      shadowOpacity: ws(0.1),
      shadowRadius: ws(5),
    },

    editCard: {
      backgroundColor: theme.card,
      marginHorizontal: ws(15),
      marginBottom: hs(10),
      padding: ws(15),
      borderRadius: ws(15),
      elevation: ws(4),
      shadowColor: theme.subText,
      shadowOffset: {
        width: ws(0),
        height: hs(2),
      },
      shadowOpacity: ws(0.1),
      shadowRadius: ws(6)
      ,
    },
    editTitle: {
      fontSize: ms(20),
      fontWeight: "700",
      color: theme.text,
    },

    editSubtitle: {
      marginTop: hs(4),
      marginBottom: hs(15),
      fontSize: ms(14),
      color: theme.subText,
    },

    saveButton: {
      marginLeft: ws(10),
      backgroundColor: theme.primary,
      paddingHorizontal: ws(18),
      height: hs(50),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: ws(12),
    },
    saveButtonText: {
      color: theme.buttonText,
      fontSize: ms(15),
      fontWeight: "700",
    },

  });
