export interface Landing {
  logo: string;
  phone: string;
  whatsapp: string;
  hero: Hero;
  services: Service[];
  benefits: string[];
  coverage: Coverage;
  reviews: Review[];
  schedule: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  image: string;
}

export interface Service {
  icon: string;
  title: string;
}

export interface Coverage {
  title: string;
  subtitle: string;
  image: string;
}

export interface Review {
  name: string;
  score: number;
  comment: string;
}
