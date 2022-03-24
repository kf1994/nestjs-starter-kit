import { Module } from "@nestjs/common";

import { CoreModule } from "@core/core.module";
import { IndexModule } from "@app/index/index.module";
import { TasksModule } from "@app/tasks/tasks.module";
import { UsersModule } from "@app/users/users.module";

@Module({
	imports: [CoreModule, IndexModule, TasksModule, UsersModule],
	controllers: [],
	providers: [],
})
export class AppModule {
}
