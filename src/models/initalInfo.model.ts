export class InitalInfo {
  apiversion: number;
  author: string;
  color: string;
  head: string;
  tail: string;
  version: string;

  constructor() {
    this.apiversion = 1;
    this.author = 'Quinn and Jeff';
    this.color = '#3d5e94';
    this.head = 'pixel-round';
    this.tail = 'rocket';
    this.version = '0.0.1';
  }
}
