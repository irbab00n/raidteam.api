import { ClassesEntrySpec } from './Interface.ClassesEntrySpec';

export interface ClassesEntry {
  id: number;
  name: string;
  specs: ClassesEntrySpec[];
  [propName: string]: any;
}
