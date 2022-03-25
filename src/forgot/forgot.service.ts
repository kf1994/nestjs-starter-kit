import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Forgot } from "./forgot.entity";
import { DeepPartial } from "@core/types/deep-partial.type";
import { FindOptions } from "@core/types/find-options.type";

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

  async findMany(options: FindOptions<Forgot>) {
    return this.forgotRepository.find({ where: options.where });
  }

  async findOne(options: FindOptions<Forgot>) {
    return this.forgotRepository.findOne({ where: options.where });
  }

  async softDelete(id: number): Promise<void> {
    await this.forgotRepository.softDelete(id);
  }
}
