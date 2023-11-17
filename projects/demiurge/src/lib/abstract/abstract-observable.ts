import { BehaviorSubject, Observable } from 'rxjs';

export abstract class AbstractObservable<T> {
  protected bs: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  protected $obs: Observable<T[]> = this.bs.asObservable();

  public value: T[] = [];

  /**
   * Emits the stored value if it exists
   */
  public emit(): void {
    this.bs.next(this.value);
  }

  /**
   * Updates the stored value and emits the updated value
   * @param value
   */
  public updateObservable(value: T[]): void {
    this.value = value;
    this.bs.next(value);
  }

  /**
   * Returns the observable
   * @returns
   */
  public getObservable(): Observable<T[]> {
    return this.$obs;
  }

  /**
   * Clears the stored value and emits an empty array to clear the observable
   */
  public clearObservable(): void {
    this.value = [];
    this.bs.next([]);
  }
}
