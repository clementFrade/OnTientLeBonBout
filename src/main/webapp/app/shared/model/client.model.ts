import { IQuestionnaire } from 'app/shared/model/questionnaire.model';

export interface IClient {
  id?: number;
  prenom?: string;
  nom?: string;
  mail?: string;
  mdp?: string;
  login?: string;
  questionnaires?: IQuestionnaire[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public prenom?: string,
    public nom?: string,
    public mail?: string,
    public mdp?: string,
    public login?: string,
    public questionnaires?: IQuestionnaire[]
  ) {}
}
