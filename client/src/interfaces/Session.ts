import { Device } from "./Device";

export interface Session {
  id: number;
  startTime: string;
  timeZone: string;
  device: Device;
}
