import { RoleDto } from '@module-back/dto/RoleDto'

export interface JwtPayload {
    refresh_token: string
    access_token: string
    user_id: string
    roles: RoleDto[]
}
