import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayUnique,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Team, TeamMember, TeamMemberAccess, TeamMemberRole, TeamSection } from '../entities/team.entity';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
type RoleUnion = `${TeamMemberRole}`
type AccessUnion = `${TeamMemberAccess}`
type SectionUnion = `${TeamSection}`
@ValidatorConstraint({ name: 'AccessConditionalValidation', async: false })
class AccessConditionalValidation implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any; // Access the full object
    if (object.role === 'admin' && value) {
      return false; // Invalid if access is not null and role is 'admin'
    }
    return true; // Valid in other cases
  }

  defaultMessage(args: ValidationArguments) {
    return 'Access must be null when role is `admin`';
  }
}
export class TeamMemberDto {
  @ApiProperty({
    description: 'The email address of the team member.',
    example: 'user@example.com',
    required:true
  })
  @IsNotEmpty()
    @IsEmail()
  email: string
  @ApiProperty({
    description: `Role of the team member`,
    enum: Object.values(TeamMemberRole), // Shows enum values as options in Swagger
    example: 'admin',
    required:true// Example value
  })
  @IsNotEmpty()
  @IsString()
    @IsIn(Object.values(TeamMemberRole),{message:`Invalid Role, only ${Object.values(TeamMemberRole)} are allowed`})
  role: TeamMemberRole;
  @ApiProperty({
    description: `Access level for the team member, admin has all the access`,
    enum: Object.values(TeamMemberAccess),
    required: false, // Indicate optional in Swagger
    example: 'editor',
  })
  @IsOptional()
  @Validate(AccessConditionalValidation)
  @IsString()
  @IsIn(Object.values(TeamMemberAccess), { message: `Invalid Access, only ${Object.values(TeamMemberAccess)} are allowed` })
  access?:TeamMemberAccess;
  @ApiProperty({
    description: `Section of the team member`,
    enum: Object.values(TeamSection),
    required: false,
    example: 'marketing',
  })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(TeamSection),{message:`Invalid Section, only ${Object.values(TeamSection)} are allowed`})
  section?: TeamSection;
}
export class CreateTeamDto {
  @ApiProperty({
    minimum: 3,
    type: [TeamMemberDto],
    required: true,
    description: 'Members objects of the team,At least 3 members and admin in them required',
  })
  @IsNotEmpty()
  @ArrayMinSize(3, { message: 'At least 3 members required' })
  @ArrayUnique()
  @ValidateNested({ each: true, message: 'Each Member must be an object' }) 
    @Type(()=>TeamMemberDto)
  members:TeamMemberDto[];
}
export class CreateTeamResponseDto extends Team{

}