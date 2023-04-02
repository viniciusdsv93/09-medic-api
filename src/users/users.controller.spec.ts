import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe('Users Controller', () => {

  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    usersController = new UsersController(usersService);
  })

  describe('Find users', () => {

    it('should return an array of users', async () => {
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
