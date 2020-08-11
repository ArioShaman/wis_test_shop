export interface IPhone {
  id: number;
  name: string;
  price: string;
  image: string;
}

export function createEmptyPhone(): IPhone {
  return{
    id: 0,
    name: '',
    price: '',
    image: '',
  }
}

