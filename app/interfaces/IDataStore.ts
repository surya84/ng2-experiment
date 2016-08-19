import { Observable } from 'rxjs/Observable';

export interface IDataStore<T> {
    getById(id: number): Observable<T>
    getByCode(code: string): Observable<T>
    list(options?: any): Observable<T[]>;
    create(obj: T): Observable<number>
    update(obj: T): Observable<T>
    delete(id: number): Observable<T>
}