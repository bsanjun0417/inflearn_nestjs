import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //앱모듈로 부터 모듈들을 확장해나갔음
  await app.listen(process.env.PORT ?? 3000);
}//nestjs를 실행하는 함수 시작점인듯
bootstrap();
