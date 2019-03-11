export default class UserService {
    constructor(app) {}
    getData(){
        return new Promise((resolve)=>{
            // setTimeout(function(){
            //     resolve("user info ");
            // },1000);
            resolve([{'name':'王猛'},{'name':'王小猛'}])
        })
    }
}