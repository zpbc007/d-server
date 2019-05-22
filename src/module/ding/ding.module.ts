import { Module } from '@nestjs/common'
import { DingUserModule } from './ding-user/ding-user.module'

@Module({
    imports: [DingUserModule],
})
export class DingModule {}
