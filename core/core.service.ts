import { Injectable } from '@nestjs/common';
import { environment } from '@core/commons/environment.enums';

@Injectable()
export class CoreService {
  /**
   * Configures The App Environment
   * @returns
   */
  static envConfiguration(): string {
    switch (process.env.NODE_ENV) {
      case environment.TEST:
        return `_${environment.TEST}.env`;

      default:
        return '.env';
    }
  }
}
