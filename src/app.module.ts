import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'
import { UserModule } from './module/user/user.module'
import { BackendModule } from './module/backend/backend.module'

@Module({
    imports: [DingModule, UserModule, BackendModule],
})
export class AppModule {}
