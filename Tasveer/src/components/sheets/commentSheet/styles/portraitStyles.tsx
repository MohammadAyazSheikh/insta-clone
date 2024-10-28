
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';




type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        listContainer: {
            width: '100%',
            flex: 1,
            marginTop: 10,
            borderTopWidth: 0.5,
            borderTopColor: colors.grey1,
            flexDirection: 'row'
        },
        headerView: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 0.5,
            borderBottomColor:colors.grey1,
            marginBottom:10,
        },
        txtHeader: {
            color: colors.secondary1,
            fontSize: 16,
            alignSelf: 'center'
        },
        // ---------Footer-------
        footerView: {
            justifyContent:'center',
            alignItems: 'center',
            width: "100%",
            paddingVertical: 5, 
        },
        replyRow:{
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center',
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical:10,
            backgroundColor:colors?.primary4
        },
        inputRow:{
            flexDirection: 'row',
            alignItems: 'center',
            width: "100%",
            paddingHorizontal: 10, 
        },
        txtInput: {
            flex: 1,
            marginHorizontal: 5,
            paddingVertical: 5,
            color: colors.secondary1,
            fontSize: 14,
            fontFamily: fontFamily.regular
        },
        btnSend: {
            borderRadius: w(20),
         paddingHorizontal:12,
            paddingVertical: 3,
            backgroundColor: colors.ternary1
        },
        //------- comment ------- 
        commentContainer: {
            width: "100%",
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginVertical: 5,
        },
        col: {

        },
        row: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        rowComment: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        colComment: {
            flex: 1,
            paddingHorizontal: 5,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        txtName: {
            color: colors.secondary1,
            fontSize: 14,
        },
        txtTime: {
            color: colors.grey1,
            fontSize: 12,
            alignSelf: 'center'
        },
        txtComment: {
            color: colors.secondary1,
            fontSize: 14,
        },
        lineViewReply: {
            paddingVertical: 0.5,
            width: 20,
            backgroundColor: colors.grey1,
            opacity: 0.5
        }
    });
}

export default portraitStyles;



