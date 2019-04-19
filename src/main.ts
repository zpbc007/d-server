import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConfig } from '@config/server';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(ServerConfig.port);

    Logger.log(
        `init finished, listen on port ${ServerConfig.port}`,
        'bootstrap',
    );
}
bootstrap();
