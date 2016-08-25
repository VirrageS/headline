export class Headline {
  title: string;
  path: string;
  data: any = [];
  loading: boolean = true;

  constructor(title, path) {
    this.title = title;
    this.path = path;
  }
};
