export type TPagedResponse<T> = {
  items: T[];
  more_available: boolean;
  end_cursor: string;
  status: string;
}
