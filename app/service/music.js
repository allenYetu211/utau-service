const Service = require('egg').Service

class MusicService extends Service {
    async index(query, cookie) {
        const {ctx, config} = this
        const cookie = cookie || '';
        const keywords = query.keywords;
        const type = query.type || 1;
        const limit = query.imit || 30;
        const offset = query.offset || 0;
        console.log('cookie', cookie)
        return await ctx.curlData(`${config.apiUrl.search}`, {
            csrf_token: "",
            limit,
            type,
            s: keywords,
            offset
        }, 'POST', cookie)
    }
}

module.exports = MusicService