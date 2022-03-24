import { ArgumentsHost, Catch, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { GenericException, InvalidCredentials, ModelNotFoundException, ValidationFailed } from ".";
import { Unauthorized } from "./Unauthorized";

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  doNotReport(): Array<any> {
    return [
      NotFoundException,
      ValidationFailed,
      InvalidCredentials,
      GenericException,
      ModelNotFoundException,
      Unauthorized,
      UnauthorizedException,
    ];
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();

    if (exception instanceof ValidationFailed) {
      return response.error(
          {
            message: exception.message,
            errors: exception.getErrors(),
          },
          exception.getStatus(),
      );
    }

    let message =
        exception.message || "Something went wrong. Please try again later";

    message = message.includes("index.html") ? "Route doesn't exists!" : message;

    const status = exception.status ? exception.status : 500;
    message = exception.status ? message : "Internal Server Error";

    return response.status(status).json({
      success: false,
      code: status,
      message,
    });
  }
}
