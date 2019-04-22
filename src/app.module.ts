import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'

@Module({
    imports: [DingModule],
})
export class AppModule {}
