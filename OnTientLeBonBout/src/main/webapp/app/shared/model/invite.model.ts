import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { IReponse } from 'app/shared/model/reponse.model';

export interface IInvite {
  id?: number;
  nom?: string;
  prenom?: string;
  mail?: string;
  mdp?: string;
  login?: string;
  points?: number;
  questionnaire?: IQuestionnaire;
  reponses?: IReponse[];
}

export class Invite implements IInvite {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public mail?: string,
    public mdp?: string,
    public login?: string,
    public points?: number,
    public questionnaire?: IQuestionnaire,
    public reponses?: IReponse[]
  ) {}
}
