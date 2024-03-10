import React, { useState } from 'react';
import {
    View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import {TextRegular, TextSemiBold } from '../../general/text/text';
import UserAvatar from '../../general/avatar/avatar';
import IconIo from 'react-native-vector-icons/Ionicons';
import { commentType } from '../../../constants/types/sharedTypes';
import moment from 'moment';




export type menuProps = {
    comment?: commentType,
    totalReplies?: number,
    renderReplies?: React.ReactNode,
    isReply?:boolean,
}

const Comment = ({
    comment,
    totalReplies,
    renderReplies,
    isReply,
}: menuProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    const [numOfLine, setNumOfLines] = useState<number | undefined>(3);
    const [liked, setSetLiked] = useState<boolean>(false);
    const [viewReply, setViewReply] = useState<boolean>(false);

    return (
        <ButtonRipple
            style={[styles.commentContainer, isReply && { paddingHorizontal: 0 }]}
        >
            {/* avatar */}
            <View style={styles.col} >
                <UserAvatar
                    size={30}
                    name={comment?.user?.firstName}
                    showRing={comment && comment?.comment?.length % 2 == 0}
                />
            </View>
            <View style={styles.rowComment}>
                <View style={styles.colComment} >
                    {/* name and time */}
                    <View style={styles.row}>
                        <View style={{ paddingRight: 5 }}>
                            <TextSemiBold
                                style={styles.txtName}
                                numberOfLines={1}
                            >
                                {
                                    comment?.user?.userName
                                }
                            </TextSemiBold>
                        </View>
                        <TextRegular
                            style={styles.txtTime}
                            numberOfLines={1}
                        >
                            {
                                moment(comment?.createdAt).fromNow()
                            }
                        </TextRegular>
                    </View>
                    {/* comment */}
                    <TextRegular
                        // selectable
                        selectionColor={colors.ternary1}
                        style={styles.txtComment}
                        numberOfLines={numOfLine}
                        onPress={() => {
                            numOfLine ?
                                setNumOfLines(undefined)
                                :
                                setNumOfLines(3);
                        }}
                    >
                        {comment?.comment}
                    </TextRegular>
                    {/* comment button */}
                    <ButtonRipple onPress={() => { }}>
                        <TextSemiBold
                            style={[
                                styles.txtTime,
                                { alignSelf: 'flex-start' },
                            ]}
                        >
                            Reply
                        </TextSemiBold>
                    </ButtonRipple>
                    {/* View replies button */}
                    {
                        renderReplies ?
                            <ButtonRipple
                                style={[styles.row, { marginTop: 10, }]}
                                onPress={() => setViewReply(prev => !prev)}
                            >
                                <View style={styles.lineViewReply} />
                                <View>
                                    <TextSemiBold
                                        style={[
                                            styles.txtTime,
                                            { alignSelf: 'flex-start' },
                                        ]}
                                    >
                                        {
                                            viewReply ?
                                                `  Hide ${totalReplies} reply`
                                                :
                                                `  View ${totalReplies} reply`
                                        }
                                    </TextSemiBold>
                                </View>
                            </ButtonRipple>
                            :
                            null
                    }
                    {/* replies */}
                    {viewReply ? renderReplies : null}

                </View>
                {/* likes */}
                <View style={styles.col} >
                    <ButtonRipple style={{ borderRadius: 100 }}
                        onPress={() => setSetLiked(prev => !prev)}
                    >
                        <IconIo
                            name={liked ? 'heart' : 'heart-outline'}
                            color={liked ? 'tomato' : colors.secondary1}
                            size={20}
                        />
                    </ButtonRipple>
                    <TextRegular
                        style={styles.txtTime}
                        numberOfLines={1}
                    >
                        {comment?.likes}
                    </TextRegular>
                </View>
            </View>
        </ButtonRipple>
    );
}

export default Comment;

export const Replies = ({ comments }: { comments: commentType[] }) => (
    comments?.map(comment => (
        <Comment
            key={comment.id}
            comment={comment}
            isReply
        />
    ))
);