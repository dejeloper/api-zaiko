import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    const user = this.userRepository.create({
      ...createUserDto,
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
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('El usuario no existe');
    }

    return await this.userRepository.update({ id }, { ...updateUserDto });
  }

  async remove(id: number) {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('El usuario no existe');
    }

    return await this.userRepository.update(
      { id },
      {
        enable: false,
        userUpdateAt: userFound.username,
        updateAt: new Date(),
      },
    );
  }
}
