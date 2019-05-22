import { RoleDto } from './RoleDto'

export interface OAuthDTO {
    access_token: string
    token_type: string
    refresh_token: string
    expires_in: number
    scope: string
    user_id: string
    roles: RoleDto[]
}
