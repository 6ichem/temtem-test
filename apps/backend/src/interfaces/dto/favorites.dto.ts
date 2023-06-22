import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsIn,
  IsNumber,
} from "class-validator";
import { MEDIA_TYPES } from "../../utils/constants";

export class createFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  public moviedbId: number;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public bannerUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([MEDIA_TYPES.TV, MEDIA_TYPES.MOVIE])
  public mediaType: string;
}

export class deleteFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  public contentId: number;
}
