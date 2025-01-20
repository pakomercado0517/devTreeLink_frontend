export type User = {
  name: string;
  email: string;
  handle: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

export type RegisterForm = Pick<User, "name" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type UserHandle = Pick<
  User,
  "handle" | "description" | "image" | "links" | "name"
>;

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type UpdateForm = Pick<User, "description" | "handle">;

export type SearchHandle = Pick<User, "handle">;

export type SocialNetworks = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetworks, "enabled" | "name" | "url">;
