import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IMediaStatique } from 'app/shared/model/media-statique.model';

type EntityResponseType = HttpResponse<IMediaStatique>;
type EntityArrayResponseType = HttpResponse<IMediaStatique[]>;

@Injectable({ providedIn: 'root' })
export class MediaStatiqueService {
  public resourceUrl = SERVER_API_URL + 'api/media-statiques';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/media-statiques';

  constructor(protected http: HttpClient) {}

  create(mediaStatique: IMediaStatique): Observable<EntityResponseType> {
    return this.http.post<IMediaStatique>(this.resourceUrl, mediaStatique, { observe: 'response' });
  }

  update(mediaStatique: IMediaStatique): Observable<EntityResponseType> {
    return this.http.put<IMediaStatique>(this.resourceUrl, mediaStatique, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMediaStatique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMediaStatique[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMediaStatique[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
