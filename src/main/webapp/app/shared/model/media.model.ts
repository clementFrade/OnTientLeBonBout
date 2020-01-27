export interface IMedia {
  id?: number;
  adresse?: string;
  type?: string;
  nom?: string;
}

export class Media implements IMedia {
  constructor(public id?: number, public adresse?: string, public type?: string, public nom?: string) {}
}
