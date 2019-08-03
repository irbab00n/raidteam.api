import { BlizzardAuthClient } from './Interface.BlizzardAuthClient';
import { BlizzardAuthHost } from './Interface.BlizzardAuthHost';

export interface BlizzardAuthCredentials {
  client: BlizzardAuthClient;
  auth: BlizzardAuthHost;
}