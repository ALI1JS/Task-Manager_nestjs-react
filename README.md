# Task Manager

Task Manager is a full-stack web application built with Nest.js, TypeScript, React, PostgreSQL, and JWT authentication.

## Features

- User authentication: Sign up and log in securely using JWT tokens.
- Task Management: Create, update, getall, delete, and mark tasks as complete.
- Category Filtering: Filter tasks based on their category.


## Technologies:

   nestjs: 10.0.0

   typescript:  5.1.3

   typeorm: 0.3.17

   selenium-webdriver :  4.16.0

   jwt:  10.2.0

   bcrypt:  5.1.1

   class-validator:  0.14.0

   axios:  1.6.2

  react:  18.2.0

  react-hot-toast:  2.4.1
  react-router-dom:  6.21.0

  tailwindcss: 3.3.7



## Database Configuration

1. Create a database named `tasks`.
2. Set up your database connection in the backend's `ormconfig.ts` file in the
/src/ormconfig.ts

example:

     import { TypeOrmModuleOptions } from '@nestjs/typeorm';

     export const config: TypeOrmModuleOptions = {
       host: '127.0.0.1',
       port: 5432, the port that postgres run on it
       username: 'your_username',
       password: ''your_password',
       database: 'database_name',
       type: 'postgres',
       synchronize: true,
       entities: ['dist/**/*.entity{.ts,.js}'],
      };

     after that import this object in the rootMoudle like 

       
    @Module({ imports: [TypeOrmModule.forRoot(config), AuthModule, UsersMdules] })
    export class AppModule {}



## Installation
    1. Clone the repository:

   ```bash
   git clone https://github.com/ALI1JS/Task-Manager_nestjs-react
    
## Run the application
  
  ### To run the the client
 cd Task-manager/server-nest
 npm i
 npm run start:dev
   

To run the the client
cd Task-manager/client-react-typescript
npm i
npm run start



