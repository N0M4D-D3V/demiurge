import { BehaviorSubject, Observable } from 'rxjs';

export interface DemiObservableInterface<T> {
  bs: BehaviorSubject<T>;
  $obs: Observable<T>;
  value?: T;

  emit(): void;
  update(value: T): void;
  $get(): Observable<T>;
  clear(): void;
}

export abstract class DemiObservableList<T extends Array<T>>
  implements DemiObservableInterface<T | undefined>
{
  public bs: BehaviorSubject<T | undefined> = new BehaviorSubject<
    T | undefined
  >(undefined);
  public $obs: Observable<T | undefined> = this.bs.asObservable();

  public value?: T;

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
  public update(value: T): void {
    this.value = value;
    this.bs.next(value);
  }

  /**
   * Returns the observable
   * @returns
   */
  public $get(): Observable<T | undefined> {
    return this.$obs;
  }

  /**
   * Clears the stored value and emits an empty array to clear the observable
   */
  public clear(): void {
    this.value = undefined;
    this.bs.next(undefined);
  }
}

export abstract class DemiObservable<T>
  implements DemiObservableInterface<T | undefined>
{
  public bs: BehaviorSubject<T | undefined> = new BehaviorSubject<
    T | undefined
  >(undefined);
  public $obs: Observable<T | undefined> = this.bs.asObservable();

  public value?: T;

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
  public update(value: T): void {
    this.value = value;
    this.bs.next(value);
  }

  /**
   * Returns the observable
   * @returns
   */
  public $get(): Observable<T | undefined> {
    return this.$obs;
  }

  /**
   * Clears the stored value and emits an empty array to clear the observable
   */
  public clear(): void {
    this.value = undefined;
    this.bs.next(undefined);
  }
}
