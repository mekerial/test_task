import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const eventRepository = app.get(getRepositoryToken(Event));
  
  // Создаем тестовые события
  const events = [
    { name: 'Конференция по разработке', total_seats: 100 },
    { name: 'Воркшоп по TypeScript', total_seats: 50 },
    { name: 'Митап по NestJS', total_seats: 30 },
  ];
  
  for (const eventData of events) {
    const existingEvent = await eventRepository.findOne({
      where: { name: eventData.name }
    });
    
    if (!existingEvent) {
      const event = eventRepository.create(eventData);
      await eventRepository.save(event);
      console.log(`Создано событие: ${eventData.name}`);
    }
  }
  
  console.log('Инициализация тестовых данных завершена');
  await app.close();
}

bootstrap().catch(console.error);

