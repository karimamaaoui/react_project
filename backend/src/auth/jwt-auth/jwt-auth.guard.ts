import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // const authorizationHeader = request.headers.authorization;

    // if (!authorizationHeader) {
    //   throw new UnauthorizedException('Missing authorization header');
    // }

    // const token = authorizationHeader.split(' ')[1];

    // if (!token) {
    //   throw new UnauthorizedException('Invalid authorization header');
    // }
    // console.log("token",token)
    // try {
    //   const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); 
    //   request.user = decodedToken; // Store the decoded token in the request object
    //   console.log(decodedToken)
      
    // } catch (error) {
    //   console.log("error",error)
    //   throw new UnauthorizedException('Invalid token');
    // }

    // return true;
    // Retrieve the token from cookies
    const token = request.cookies.jwt;

    if (!token) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    try {
      const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); 
      request.user = decodedToken; // Store the decoded token in the request object
      console.log(decodedToken);
    } catch (error) {
      console.log("Error verifying token:", error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  }


