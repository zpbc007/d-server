import { Module } from '@nestjs/common'
import { ReligionController } from './religion.controller'
import { ReligionService } from './religion.service'
import { AuthModule } from '@module-front/auth/auth.module'
import { AuthService } from '@module-front/auth/auth.service'

@Module({
    imports: [AuthModule],
    controllers: [ReligionController],
    providers: [AuthService, ReligionService],
})
export class ReligionModule {}
