import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { IndexModule } from '@app/index/index.module';

@Module({
  imports: [CoreModule, IndexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
