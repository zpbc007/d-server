import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'
import { FrontendModule } from './module/frontend/frontend.module'
import { ReligionModule } from './module/religion/religion.module'

@Module({
    imports: [DingModule, FrontendModule, ReligionModule],
})
export class AppModule {}
