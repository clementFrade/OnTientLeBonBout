import { IReponse } from 'app/shared/model/reponse.model';
import { IQuestionnaire } from 'app/shared/model/questionnaire.model';

export interface IInvite {
  id?: number;
  nom?: string;
  prenom?: string;
  mail?: string;
  mdp?: string;
  login?: string;
  points?: number;
  reponses?: IReponse[];
  questionnaire?: IQuestionnaire;
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
    public reponses?: IReponse[],
    public questionnaire?: IQuestionnaire
  ) {}
}
