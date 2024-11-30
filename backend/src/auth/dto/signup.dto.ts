import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignUpDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message: "please enter correct email"})
    email: string;
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    @MinLength(6)
    password:string;
    
    @ApiProperty()
    role:string;
}