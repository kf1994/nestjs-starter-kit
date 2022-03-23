import { Module } from "@nestjs/common";

import { CoreModule } from "@core/core.module";
import { IndexModule } from "@app/index/index.module";
import { TasksModule } from "@app/tasks/tasks.module";

@Module({
	imports: [CoreModule, IndexModule, TasksModule],
	controllers: [],
	providers: [],
})
export class AppModule {
}
