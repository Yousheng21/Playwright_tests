export interface IUser {
  name: string
  email: string
  phone: string
  password: string
  tempConfirmationCode: string
}

export const users: IUser[] = [
  {
    phone: '9995437632',
    password: 'Qqaa3',
    tempConfirmationCode: '4444',
    name: 'Test 0',
    email: 'test0@test.com',
  },
]
