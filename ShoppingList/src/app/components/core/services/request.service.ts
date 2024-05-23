import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get<TResponse>(endpoint: string, id?: string): Promise<TResponse> {
    return firstValueFrom(this.http.get<TResponse>(this.createUrl(endpoint, id)));
  }

  public post<TRequest, TResponse>(endpoint: string, payload: TRequest): Promise<TResponse> {
    return firstValueFrom(this.http.post<TResponse>(this.createUrl(endpoint), payload));
  }

  public put<TRequest, TResponse>(endpoint: string, id: string, payload: TRequest): Promise<TResponse> {
    return firstValueFrom(this.http.put<TResponse>(this.createUrl(endpoint, id), payload));
  }

  public delete<TResponse>(endpoint: string, id: string): Promise<TResponse> {
    return firstValueFrom(this.http.delete<TResponse>(this.createUrl(endpoint, id)));
  }

  private createUrl(endpoint: string, id?: string) {
    return `${this.baseUrl}/${endpoint}${id ? `/${id}` : ''}`;
  }
}
