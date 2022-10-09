import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(111);

    return '<h1>Hello World!</h1>';
  }
}
