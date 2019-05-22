import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'
import { FrontendModule } from './module/frontend/frontend.module'
import { TypeormLogger } from '@logger/typeorm.logger'
import * as OrmConfig from '../ormconfig.json'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...OrmConfig,
            entities: ['./**/**-entity/**.entity.ts'],
            logger: new TypeormLogger('all'),
        } as any),
        DingModule,
        FrontendModule,
    ],
})
export class AppModule {}
