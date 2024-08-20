export type Token = {
  id: string;
  issuer: string;
  price: number;
}

export type Project = {
  name: string;
  token: Token;
  categories: string[];
  company: {
    logo: string;
    name: string;
  };
  image: string;
  country: string;
}

export type ProjectDTO = {
  data: {
    name: string;
    categories: string[];
    image: string;
    country: string;
  };
  company: {
    logo: string;
    name: string;
  };
  token: {
    id: string;
    price: number;
    issuer: string;
  }
}

export type ProjectsDTO = {
  data: {
    projects: ProjectDTO[];
  };
}


export type Mascot = {
  name: string;
  type: string;
  tokenId: string;
  level: number;
}
