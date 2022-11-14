import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString
} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    profilePic?: string
}
