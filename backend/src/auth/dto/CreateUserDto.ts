import { ApiProperty } from "@nestjs/swagger";
import {IsArray, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class CreateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    password:string;

    
    @ApiProperty()
    @IsOptional()
    @IsString() 
    firstname:string;

    
    @ApiProperty()
    @IsOptional()
    @IsString() 
    lastname:string;

    @ApiProperty()
    @IsOptional()
    profilePicture: string;

    @ApiProperty()
    @IsOptional()
    bio: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    skills: string[];

    @ApiProperty()
    @IsOptional()
    projects: { title: string, description: string, link: string }[];

    @ApiProperty()
    @IsOptional()
    socialLinks: { github: string, linkedin: string, twitter: string };
}