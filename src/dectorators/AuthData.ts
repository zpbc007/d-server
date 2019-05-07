import { createParamDecorator } from '@nestjs/common'

export const AuthData = createParamDecorator((data, req) => {
    return req.user
})
