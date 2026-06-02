import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class QueryNotificationsDto {
  @IsOptional()
  @IsString()
  @IsIn(['info', 'success', 'warning', 'error', ''])
  type?: string;

  @IsOptional()
  @IsString()
  @IsIn(['true', 'false', ''])
  isRead?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class CreateSystemNotificationDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsOptional()
  @IsString()
  @IsIn(['info', 'success', 'warning', 'error'])
  type?: string = 'info';

  @IsOptional()
  @IsString()
  link?: string;
}