import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMusique } from 'app/shared/model/musique.model';

type EntityResponseType = HttpResponse<IMusique>;
type EntityArrayResponseType = HttpResponse<IMusique[]>;

@Injectable({ providedIn: 'root' })
export class MusiqueService {
  public resourceUrl = SERVER_API_URL + 'api/musiques';

  constructor(protected http: HttpClient) {}

  create(musique: IMusique): Observable<EntityResponseType> {
    return this.http.post<IMusique>(this.resourceUrl, musique, { observe: 'response' });
  }

  update(musique: IMusique): Observable<EntityResponseType> {
    return this.http.put<IMusique>(this.resourceUrl, musique, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMusique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMusique[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
