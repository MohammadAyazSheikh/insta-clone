import { Image as ImageType } from 'react-native-image-crop-picker';

export type userType = {
    id?: string | number,
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    phone?: string,
    gender?: 'male' | 'female',
    dob?: Date,
    profileImage?:string
}


export type postType = {
    id?: number | null,
    title?: string,
    body?: string,
}


export type commentType = {
    id?: number | string,
    repliedId?: number | string,
    comment: string,
    createdAt: Date,
    user: userType,
    replies?: commentType[],
    likes?: number,
}



export type messageType = 'image' | 'video' | 'location' | 'document' | 'voice' | 'text';
export type messageStatus = 'sending' | 'sent' | 'delivered' | 'seen';

export type coordType = {
    latitude: number,
    longitude: number,
    address?: string
}

export type reactionType = { values: string, user: userType }
type msgType = {
    id: string | number,
    type?: messageType,
    imageList?: ImageType[],
    voice?: string,
    video?: string,
    document?: string,
    text?: string,
    location?: coordType,
    createdAt: Date,
    receivedAt?: Date,
    seenAt?: Date,
    user: userType,
    status: messageStatus,
    starred?: boolean,
    reacts: reactionType[],
}
export type messageObjType = {
    replyMessage?: msgType,
} & msgType


export type conversationType = {
    id: string | number
    name?: string,
    admins: userType[],
    members: userType[],
    pastMembers: userType[],
    permissions: [
        //allowed permissions for members 
    ]
}

export type starredMessageType = {
    messageObjType: messageObjType,
    conversationId: number | string,
    //if conversation has  more than 2 users
    //then it will be a group conversation
    //then send group info as well 
    //with each starred message,
    //if it has only 2 users it will be null
    conversationInfo?: conversationType,
}
