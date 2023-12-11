export enum Gender {
  Male = 'M',
  Female = 'F',
}

export class Person {
  id?: number;
  name: string;
  birth_date: string;
  cpf: string;
  sex: string;
  height: string;
  weight: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.birth_date = '';
    this.cpf = '';
    this.sex = Gender.Male;
    this.height = '';
    this.weight = '';
  }
}
