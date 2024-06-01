import { IsNotEmpty, IsString, Length } from "class-validator";
import { Role } from "../../roles/enums/roles.enums";

export class SignInUsersDto {
    @IsNotEmpty({ message: "User should have a username" })
    @IsString()
    @Length(3, 255)
    username: string;

    @IsNotEmpty({ message: "User should have a password" })
    @IsString()
    @Length(3)
    password: string;
}
