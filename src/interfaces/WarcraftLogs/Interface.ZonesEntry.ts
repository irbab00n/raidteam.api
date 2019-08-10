import { ZoneBracket } from './Interface.ZoneBracket';
import { ZoneEncounter } from './Interface.ZoneEncounter';

export interface ZonesEntry {
  id: number;
  name: string;
  frozen: boolean;
  encounters: ZoneEncounter[];
  brackets: ZoneBracket;
  [key: string]: any;
}
