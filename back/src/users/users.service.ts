import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './model/user.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>
    ){}

    async getUser(username: string) : Promise<IUser> {
        return await this.userModel.findOne({ username }).exec()
    }
}
