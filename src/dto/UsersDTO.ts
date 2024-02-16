export enum USERS_ACTION_TYPES {
    FETCH_USERS_START = 'category/FETCH_CATEGORIES_START',
    FETCH_USERS_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  }

interface UsersDTO {
    _id: string;
    avatar: string;
    birthdate: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number,
    gender: string;
    subscription: string;
    createdAt: string;
}

export default UsersDTO;