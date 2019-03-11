import {
    GET,
    route
} from 'awilix-koa';

@route('/user')
export default
class UserController {
    constructor({userService}) {
        this.userService = userService
    }

    @route('/:id')
    @GET()
    async userAction(ctx) {
        let result = await this.userService.getData()
        // ctx.body = await ctx.render('user/pages/user',{
        //     data: result
        // })
        ctx.body = {code:1,data:result}
    }
}
