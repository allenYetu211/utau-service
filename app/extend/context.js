module.exports = {
    /**
     * 处理response status code， 生成对应的response message
     * @param status
     * @return {*}
     */
    calcResultStatus(status) {
        if ((status >= 200 && status < 300 ) || status === 304) {
            return 'SUCCESS'
        }
        if (status >= 300 && status < 400) {
            return 'REDIRECTION'
        }
        if (status >= 400 && status < 500) {
            return 'CLIENT_ERROR'
        }
        if (status >= 500 && status < 600) {
            return 'SERVER_ERROR'
        }
        return 'UNKNOWN'
    },
    async curlData(url, data, method, extendQuery) {
        this.logger.info(`CURL PATH @@ server url @@--> : ${url} --<`)
        this.logger.info(`CURL QUERIES @@ queries    @@--> :  ${JSON.stringify(data)} --<`)
        let queries = {
            data: data || {},
            dataType: 'json',
            method: method || 'GET'
        }
        if (extendQuery) {
            queries = {
                ...queries,
                ...extendQuery
            }
        }

        const result = await this.curl(`${url}`, queries)

        const resultStatus = this.calcResultStatus(result.status)
        switch (resultStatus) {
            case 200:
            case 'SUCCESS':
            case 'REDIRECTION': { // TODO how to deal with 3xx
                return result.data
            }
            case 'CLIENT_ERROR': {
                throw  new Error(this.genErrMsg(40002, result.data, result.status, {
                    request: url,
                    data: data
                }))
            }
            default : {
                throw new Error(this.genErrMsg(50004, 'error when call server', result.status, {
                    request: url,
                    data: data
                }))
            }
        }
    },
}