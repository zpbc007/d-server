import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'
import { UserModule } from './module/user/user.module'
import { FrontendModule } from './module/frontend/frontend.module'

@Module({
    imports: [DingModule, UserModule, FrontendModule],
})
export class AppModule {}
