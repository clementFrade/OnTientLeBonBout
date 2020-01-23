import { IMedia } from 'app/shared/model/media.model';
import { IReponse } from 'app/shared/model/reponse.model';
import { ITheme } from 'app/shared/model/theme.model';
import { IQuestionnaire } from 'app/shared/model/questionnaire.model';

export interface IQuestion {
  id?: number;
  intitule?: string;
  media?: IMedia;
  reponses?: IReponse[];
  theme?: ITheme;
  questionnaire?: IQuestionnaire;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public intitule?: string,
    public media?: IMedia,
    public reponses?: IReponse[],
    public theme?: ITheme,
    public questionnaire?: IQuestionnaire
  ) {}
}
