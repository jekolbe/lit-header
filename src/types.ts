export interface MenuItem {
  text: string;
  link: string;
}

export interface JwtPayload {
  partnerId: string;
  exp: number;
}

export interface GlobalEvent {
  type: string;
  payload: any;
}

export interface LanguageOption {
  code: string;
  name: string;
}
