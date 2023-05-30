export type ApiType<T> = {
  code: number,
  data?: T,
  status: string,
}
