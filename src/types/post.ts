export interface Comment
{
    _id: string,
    uid: string,
    commentedOn: Date,
    commentedBy: {
        uid: string,
        nickname: string,
        email: string,
        profileImage: string,
    },
    text: string,
    valid: boolean,
    modified: boolean,
    recomments: Array<Recomment>,
}

export interface Recomment
{
    _id: string,
    uid: string,
    recommentedOn: Date,
    text: string,
    valid: boolean,
    modified: boolean,
}

export interface Post
{
    id: number,
    type: string,
    title: string,
    postedOn: string,
    likes: string[],
    comments: Array<Comment>,
    image: string,
    video: string,
}
