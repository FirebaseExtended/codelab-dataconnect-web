import { ConnectorConfig, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Emoji_Key {
  id: UUIDString;
  __typename?: 'Emoji_Key';
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface PriceHistory_Key {
  id: UUIDString;
  __typename?: 'PriceHistory_Key';
}

export interface StockOwnership_Key {
  userId: string;
  emojiId: UUIDString;
  __typename?: 'StockOwnership_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

