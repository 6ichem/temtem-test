import { IsNotEmpty, IsString, IsEmail, Length, IsIn } from "class-validator";

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: "Username has to be between 3 and 20 chars" })
  public username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: "Passowrd has to be between 6 and 20 chars" })
  public password: string;
}
