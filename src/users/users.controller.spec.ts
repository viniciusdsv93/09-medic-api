import { NotFoundException } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe('Users Controller', () => {

  type sutTypes = {
    usersController: UsersController;
    usersService: UsersService;
  }

  const makeSut = (): sutTypes => {
    let usersService = new UsersService();
    let usersController = new UsersController(usersService);

    return {
      usersService, usersController
    }
  }

  describe('Find users', () => {
    it('should return an array of users', async () => {
      const { usersController } = makeSut();
      const mockedResult = [
        {
          id: '1',
          email: 'john',
        },
        {
          id: '2',
          email: 'jorge@mail.com',
        },
      ]
      const result = await usersController.getUsers();
      expect(result).toEqual(mockedResult);
    })


    it('should return an user\'s data', async () => {
      const { usersController } = makeSut();
      const result = await usersController.getUserById('2');
      expect(result).toEqual({ "email": "jorge@mail.com", "id": "2" });
    })


    it('should throw an error if user not exists', async () => {
      const { usersController } = makeSut();
      const promise = usersController.getUserById('5');
      await expect(promise).rejects.toThrow();
    })
  })
})
