export interface ISubscruber<T> {
  getUpdate(obj: T) : void;
}
