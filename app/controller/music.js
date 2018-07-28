'use strict';

const Controller = require('egg').Controller;

class MusicController extends Controller {
    async index() {
        const {ctx} = this
        console.log('ctx.request.headers===>>>>', ctx.request.headers['cookie'])
        const result = await ctx.service.music.index({
            query: ctx.query,
            cookie: ctx.request.headers['cookie']
        })
        console.log(result)
        ctx.body = 'hi, egg';
    }
}

module.exports = MusicController;
