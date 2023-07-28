export type Callback = () => void;

export interface User {
  accessToken: string;
  idToken: string;
  uuid: string;
  username: string;
}

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  image: any;
}
