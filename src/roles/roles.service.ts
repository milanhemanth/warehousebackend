import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createDefaultRoles() {
    const roles = ['Admin', 'Manager', 'Staff'];

    for (const roleName of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: roleName },
      });

      if (!existingRole) {
        const role = this.roleRepository.create({
          name: roleName,
        });

        await this.roleRepository.save(role);
      }
    }
  }

  async findByName(name: string) {
    return await this.roleRepository.findOne({
      where: { name },
    });
  }
}