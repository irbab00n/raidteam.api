import { EncounterQueryOptions } from './Interface.EncounterQueryOptions';

export interface EncounterQuery {
  encounterID: number;
  zoneID: number;
  options?: EncounterQueryOptions;
}
