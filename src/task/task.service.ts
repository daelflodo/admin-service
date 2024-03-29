import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task/entities/task.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../user/users.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userRepository: UserRepository,
  ) {}
  async createTasks(Data: CreateTaskDto) {
    const { title, userId } = Data;
    const existingTask = await this.taskRepository.findOne({
      where: { title, user: { id: userId } },
    });
    console.log(existingTask);
    const userIdFound = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userIdFound) {
      throw new NotFoundException('userId no found');
    }
    if (existingTask) {
      throw new ConflictException('The title is already active for this user');
    }

    // Crea una nueva tarea y asigna el usuario
    const newTask = this.taskRepository.create(Data);
    newTask.user = await this.userRepository.findOne({ where: { id: userId } });

    // Ahora guarda la tarea en la base de datos
    const savedTask = await this.taskRepository.save(newTask);
    return savedTask;
  }

  async getTasks() {
    const tasks = await this.taskRepository.find();
    if (!tasks) {
      throw new NotFoundException('There are no tasks');
    }
    return tasks;
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task no found');
    }
    return task;
  }

  async updateTask(id: number, Data: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    console.log(task);
    if (!task) {
      throw new NotFoundException('Task no found');
    }
    if (!task.user.isEnabled) {
      throw new ConflictException('The user is already deactivated');
    }
    if (task.user.id !== Data.userId) {
      throw new NotFoundException('You can only modify your tasks');
    }
    Object.assign(task, Data);
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    console.log(task);

    if (!task.user.isEnabled) {
      throw new ConflictException('The user is already deactivated');
    }

    if (task.user.id !== userId) {
      throw new NotFoundException('You can only delete your tasks');
    }

    await this.taskRepository.delete(task); // Eliminar la tarea

    return { message: 'Task deleted successfully' };
  }
}
