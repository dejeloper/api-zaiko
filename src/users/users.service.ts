import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserState } from 'src/user-states/entities/user-state.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (userFound) {
      throw new NotFoundException('El usuario ya existe');
    }

    const userStateFound = await this.validateUseState(createUserDto.state);

    const user = this.userRepository.create({
      ...createUserDto,
      state: userStateFound,
    });
    return await this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new NotFoundException('No hay usuarios');
    }
    return users;
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('El usuario no existe');
    }

    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.userRepository.update(
      { id },
      {
        ...updateUserDto,
        state: updateUserDto.state
          ? await this.validateUseState(updateUserDto.state)
          : undefined,
        updateAt: new Date(),
      },
    );
  }

  async remove(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('El usuario no existe');
    }

    return await this.userRepository.update(
      { id },
      {
        enable: false,
        userUpdateAt: updateUserDto.userUpdateAt,
        updateAt: new Date(),
      },
    );
  }

  private async validateUseState(state: number) {
    const userStateEntity = await this.userStateRepository.findOneBy({
      id: state,
    });

    if (!userStateEntity) {
      throw new NotFoundException('El estado del usuario no existe');
    }
    return userStateEntity;
  }
}
