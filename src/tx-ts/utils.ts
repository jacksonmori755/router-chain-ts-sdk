import { Message } from 'google-protobuf';

export interface MessageGenerated {
  value: Message;
  type: string;
}
