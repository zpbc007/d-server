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
        port: 9090,
        // 丛
        // host: '172.16.0.3',
        // 高
        host: '172.16.0.6',
        client_id: 'toptimus_client',
        client_secret: '123456',
    },
    auth: {
        secret: '123456',
        expiresIn: 60 * 60 * 12,
    },
}
