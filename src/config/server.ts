export const ServerConfig = {
    port: 3000,
    dd: {
        url: 'https://oapi.dingtalk.com',
        appkey: 'dinglsw7ka2aqfhpxpdj',
        appsecret: 'Lfah8-h_f0lLVsZsgegj7KFAj4Vtd6I7XXzkNNcRxfKDmZigw1vZe00n34fJRAxE',
        tokenExpireTime: 7200,
        agentId: 253844578,
    },
    backend: {
        // 丛
        // host: '172.16.0.3',
        // 高
        // host: '172.16.0.6',
        // 姜
        // host: '172.16.0.23',
        // port: 19090,
        // 医院
        host: '101.71.4.178',
        port: 24001,
        client_id: 'toptimus_client',
        client_secret: '123456',
    },
    auth: {
        secret: '123456',
        expiresIn: 60 * 60 * 12,
    },
}
