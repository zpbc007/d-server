import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
    UnauthorizedException,
    HttpException,
    Logger,
} from '@nestjs/common'
import { catchError, map, concat, toArray } from 'rxjs/operators'
import { from, throwError } from 'rxjs'
import { OAuthApi } from '@module-back/oauth'
import { JwtPayload } from '@module-front/auth/jwt-payload.interface'
import { AuthService } from '@module-front/auth/auth.service'
import { OAuthDTO } from '@module-back/dto/OAuthDTO'

const ContextStr = 'OAuthInterceptor'

@Injectable()
export class OAuthInterceptor implements NestInterceptor {
    constructor(private readonly oAuthApi: OAuthApi, private readonly authService: AuthService) {}

    intercept(context: ExecutionContext, next: CallHandler) {
        const that = this
        return next.handle().pipe(
            catchError((err) => {
                // 1. 判断是否为401请求
                // 2. 通过refresh token 请求 access token
                // 3. 判断是否为401
                // 4. 直接返回401

                // 1. 如果不是401请求直接抛出异常
                if (!that.isUnauthorizedException(err)) {
                    return throwError(err)
                }

                // 2. 从 request 中获取 refresh_token
                const { refresh_token } = context.getArgByIndex(0).user as JwtPayload
                Logger.warn(`access_token is timeout, will refresh it`, ContextStr)

                return from(that.oAuthApi.createAccessTokenByRefreshToken(refresh_token)).pipe(
                    // 请求新的 access_token 时出现异常
                    catchError((fetchTokenErr) => {
                        if (!that.isUnauthorizedException(fetchTokenErr)) {
                            return throwError(fetchTokenErr)
                        }

                        Logger.error(`refresh_token is timeout, please relogin`, ContextStr)
                        return throwError(new UnauthorizedException())
                    }),
                    concat(next.handle()),
                    toArray(),
                    map(
                        async ([{ access_token, refresh_token: new_refresh_token }, data]: [
                            OAuthDTO,
                            any
                        ]) => {
                            Logger.warn(`refresh token success`, ContextStr)
                            const token = await that.authService.signIn({
                                access_token,
                                refresh_token: new_refresh_token,
                            })
                            return {
                                data,
                                action: {
                                    type: 'set_token',
                                    token,
                                },
                            }
                        },
                    ),
                )
            }),
        )
    }

    private isUnauthorizedException(exception) {
        return (
            exception instanceof UnauthorizedException ||
            (exception instanceof HttpException && exception.getStatus() === 401)
        )
    }
}
