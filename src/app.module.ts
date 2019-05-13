import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'
import { FrontendModule } from './module/frontend/frontend.module'

@Module({
    imports: [DingModule, FrontendModule],
})
export class AppModule {}
