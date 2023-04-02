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
  })
})
