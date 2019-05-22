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
import { BackOAuthApi } from '@module-back/back-oauth'
import { JwtPayload } from '@module-front/front-auth/jwt-payload.interface'
import { FrontAuthService } from '@module-front/front-auth/auth.service'
import { OAuthDTO } from '@module-back/back-dto/OAuthDTO'

const ContextStr = 'OAuthInterceptor'

@Injectable()
export class OAuthInterceptor implements NestInterceptor {
    constructor(
        private readonly oAuthApi: BackOAuthApi,
        private readonly authService: FrontAuthService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler) {
        const that = this
        return next.handle().pipe(
            catchError((err) => {
                // 1. 如果不是401请求直接抛出异常
                if (!that.isUnauthorizedException(err)) {
                    return throwError(err)
                }

                const user = context.getArgByIndex(0).user as JwtPayload

                // 2. 请求未携带token信息
                if (!user || !user.refresh_token) {
                    return throwError(err)
                }

                // 3. 从 request 中获取 refresh_token
                const { refresh_token } = user
                Logger.warn(`access_token is timeout, will refresh it`, ContextStr)

                // 4. 请求新的token
                const refreshOb = from(
                    that.oAuthApi.createAccessTokenByRefreshToken(refresh_token),
                ).pipe(
                    // 请求新的 access_token 时出现异常
                    catchError((fetchTokenErr) => {
                        if (!that.isUnauthorizedException(fetchTokenErr)) {
                            return throwError(fetchTokenErr)
                        }

                        Logger.error(`refresh_token is timeout, please relogin`, ContextStr)
                        return throwError(new UnauthorizedException())
                    }),
                )

                // 5. 请求成功,替换 context
                refreshOb.subscribe(({ refresh_token: new_refresh_token, access_token }) => {
                    context.getArgByIndex(0).user = {
                        refresh_token: new_refresh_token,
                        access_token,
                    }
                })

                return refreshOb.pipe(
                    concat(next.handle()),
                    catchError((nextExecError) => {
                        if (!that.isUnauthorizedException(nextExecError)) {
                            return throwError(nextExecError)
                        }

                        Logger.error(
                            `allready refresh token but still get 401 error, please contact admin`,
                            ContextStr,
                        )
                        return throwError(new UnauthorizedException())
                    }),
                    toArray(),
                    map(
                        async ([
                            { access_token, refresh_token: new_refresh_token, user_id, roles },
                            data,
                        ]: [OAuthDTO, any]) => {
                            Logger.warn(`refresh token success`, ContextStr)
                            const token = await that.authService.signIn({
                                access_token,
                                refresh_token: new_refresh_token,
                                user_id,
                                roles,
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
