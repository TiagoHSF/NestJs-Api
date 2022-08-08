import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {

   constructor(@InjectModel('Task') private readonly taskmodel: Model<Task>){

   }

    async getAll() {
        return await this.taskmodel.find().exec();
    }

    async getById(id: string) {
        return await this.taskmodel.findById(id).exec()
    }

    async create(task: Task) {
        const createdTask = new this.taskmodel(task);
        return await createdTask.save();
    }

    async update(id: string, task: Task){
        await this.taskmodel.updateOne({ _id: id}, task).exec()
        return this.getById(id);
    }

    async delete(id: string) {
        return await this.taskmodel.deleteOne({ _id: id }).exec();
    }
}
