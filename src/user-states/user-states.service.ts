import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserStateDto } from './dto/create-user-state.dto';
import { UpdateUserStateDto } from './dto/update-user-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserState } from './entities/user-state.entity';

@Injectable()
export class UserStatesService {
  constructor(
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
  ) {}

  async create(createUserStateDto: CreateUserStateDto) {
    const userStateFound = await this.userStateRepository.findOne({
      where: { name: createUserStateDto.name },
    });

    if (userStateFound) {
      throw new NotFoundException('El estado de usuario ya existe');
    }

    const userState = this.userStateRepository.create({
      ...createUserStateDto,
    });
    return await this.userStateRepository.save(userState);
  }

  async findAll() {
    const userState = await this.userStateRepository.find();

    if (userState.length === 0) {
      throw new NotFoundException('No hay estados de usuario');
    }
    return userState;
  }

  async findOne(id: number) {
    const userStateFound = await this.userStateRepository.findOneBy({ id });

    if (!userStateFound) {
      throw new NotFoundException('El estado de usuario no existe');
    }

    return userStateFound;
  }

  async update(id: number, updateUserStateDto: UpdateUserStateDto) {
    const userStateFound = await this.userStateRepository.findOneBy({ id });

    if (!userStateFound) {
      throw new NotFoundException('El estado de usuario no existe');
    }

    return await this.userStateRepository.update(
      { id },
      { ...updateUserStateDto },
    );
  }

  async remove(id: number, updateUserStateDto: UpdateUserStateDto) {
    const userStateFound = await this.userStateRepository.findOneBy({ id });

    if (!userStateFound) {
      throw new NotFoundException('El estado de usuario no existe');
    }

    return await this.userStateRepository.update(
      { id },
      {
        enable: false,
        userUpdateAt: updateUserStateDto.userUpdateAt,
        updateAt: new Date(),
      },
    );
  }
}
