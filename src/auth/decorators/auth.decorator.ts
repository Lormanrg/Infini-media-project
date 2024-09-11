import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../enums/rol.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role: UserRole) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
