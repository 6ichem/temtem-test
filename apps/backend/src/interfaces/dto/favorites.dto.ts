import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsIn,
  IsNumber,
} from "class-validator";

export class createFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  public contentId: number;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public bannerUrl: string;
}

export class deleteFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  public contentId: number;
}
