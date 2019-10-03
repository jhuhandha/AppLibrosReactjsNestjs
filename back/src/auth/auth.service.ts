import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private _userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this._userService.getUser(username)
        if (user && user.password === pass) {
            return user
        }
        return null
    }

    async login(user: any){
        const payload = { username: user.username, sub: user._id, rol: user.rol };
        return {
            acces_token: this.jwtService.sign(payload)
        }
    }
}
