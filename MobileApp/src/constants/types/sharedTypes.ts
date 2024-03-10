export type userType = {
    id?: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    phone?: string,
    gender?: 'male' | 'female',
    dob?: Date,
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


