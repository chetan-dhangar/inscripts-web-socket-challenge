export type Item = {
  id: number;
  name: string;
};

export type ToastTypes = {
  message: string;
  description?: string;
  duration?: number | 1000;
};
