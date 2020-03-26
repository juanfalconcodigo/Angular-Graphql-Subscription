interface PublicationI{
    _id:string;
    description:string;
    img:string;
    createAt:string;
    user?:any;
    votes:number;
}
export{
    PublicationI
}
