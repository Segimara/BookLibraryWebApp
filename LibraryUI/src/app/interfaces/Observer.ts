export interface Observer {
  update(): void;
}

// Define the Subject interface
export interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}