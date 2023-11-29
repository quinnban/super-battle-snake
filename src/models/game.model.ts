export interface Game {
  id: string;
  ruleset: Ruleset;
  map: string;
  timeout: number;
  source: string;
}

interface Ruleset {
  name: string;
  version: string;
}

