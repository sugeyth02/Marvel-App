
export interface IBaseResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data<T>;
}

 interface Data<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}
