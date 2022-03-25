import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Forgot } from "./forgot.entity";
import { DeepPartial } from "@core/types/deep-partial.type";

@Injectable()
export class ForgotService {
  constructor(
      @InjectRepository(Forgot)
      private forgotRepository: Repository<Forgot>,
  ) {
  }

  async create(data: DeepPartial<Forgot>) {
    return this.forgotRepository.save(this.forgotRepository.create(data));
  }
}
