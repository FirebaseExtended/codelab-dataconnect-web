# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `friendly-exchange`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetDashboardData*](#getdashboarddata)
  - [*GetUserProfile*](#getuserprofile)
  - [*GetPriceHistory*](#getpricehistory)
  - [*GetEmojiWhaleStats*](#getemojiwhalestats)
  - [*GetEmojiHistoryStats*](#getemojihistorystats)
  - [*GetChronologicalTicker*](#getchronologicalticker)
  - [*GetEmojiSparklines*](#getemojisparklines)
  - [*GetTopTraders*](#gettoptraders)
  - [*SearchEmojis*](#searchemojis)
  - [*GetTopEmojisByCity*](#gettopemojisbycity)
  - [*GetTrendingEmojisNearMe*](#gettrendingemojisnearme)
  - [*VectorSearchEmojis*](#vectorsearchemojis)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*UpdateUserRole*](#updateuserrole)
  - [*UpdateUserLocation*](#updateuserlocation)
  - [*TriggerEvent*](#triggerevent)
  - [*MarketMakerTrade*](#marketmakertrade)
  - [*BuyStock*](#buystock)
  - [*SellStock*](#sellstock)
  - [*GenerateTradeHeadline*](#generatetradeheadline)
  - [*ExecuteReadXPostTransaction*](#executereadxposttransaction)
  - [*TriggerSocialBoost*](#triggersocialboost)
  - [*PanicSellPortfolio*](#panicsellportfolio)
  - [*TriggerMarketCrash*](#triggermarketcrash)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `friendly-exchange`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `friendly-exchange` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetDashboardData
You can execute the `GetDashboardData` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDashboardData(options?: ExecuteQueryOptions): QueryPromise<GetDashboardDataData, undefined>;

interface GetDashboardDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDashboardDataData, undefined>;
}
export const getDashboardDataRef: GetDashboardDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDashboardData(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDashboardDataData, undefined>;

interface GetDashboardDataRef {
  ...
  (dc: DataConnect): QueryRef<GetDashboardDataData, undefined>;
}
export const getDashboardDataRef: GetDashboardDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDashboardDataRef:
```typescript
const name = getDashboardDataRef.operationName;
console.log(name);
```

### Variables
The `GetDashboardData` query has no variables.
### Return Type
Recall that executing the `GetDashboardData` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDashboardDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDashboardDataData {
  emojis: ({
    id: UUIDString;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    trend: number;
  } & Emoji_Key)[];
    events: ({
      id: UUIDString;
      description: string;
      impact: number;
      createdAt: TimestampString;
      user: {
        username: string;
        profileImage?: string | null;
      };
        emoji: {
          symbol: string;
        };
    } & Event_Key)[];
}
```
### Using `GetDashboardData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDashboardData } from '@dataconnect/generated';


// Call the `getDashboardData()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDashboardData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDashboardData(dataConnect);

console.log(data.emojis);
console.log(data.events);

// Or, you can use the `Promise` API.
getDashboardData().then((response) => {
  const data = response.data;
  console.log(data.emojis);
  console.log(data.events);
});
```

### Using `GetDashboardData`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDashboardDataRef } from '@dataconnect/generated';


// Call the `getDashboardDataRef()` function to get a reference to the query.
const ref = getDashboardDataRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDashboardDataRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.emojis);
console.log(data.events);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.emojis);
  console.log(data.events);
});
```

## GetUserProfile
You can execute the `GetUserProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetUserProfileData, undefined>;

interface GetUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProfileData, undefined>;
}
export const getUserProfileRef: GetUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserProfileData, undefined>;

interface GetUserProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetUserProfileData, undefined>;
}
export const getUserProfileRef: GetUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserProfileRef:
```typescript
const name = getUserProfileRef.operationName;
console.log(name);
```

### Variables
The `GetUserProfile` query has no variables.
### Return Type
Recall that executing the `GetUserProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserProfileData {
  user?: {
    points: number;
    username: string;
    profileImage?: string | null;
    role: string;
    stockOwnerships_on_user: ({
      shares: number;
      emoji: {
        id: UUIDString;
        symbol: string;
        currentPrice: number;
        name: string;
      } & Emoji_Key;
    })[];
      city?: string | null;
      latitude?: number | null;
      longitude?: number | null;
  };
}
```
### Using `GetUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserProfile } from '@dataconnect/generated';


// Call the `getUserProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserProfile(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserProfile().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserProfileRef } from '@dataconnect/generated';


// Call the `getUserProfileRef()` function to get a reference to the query.
const ref = getUserProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetPriceHistory
You can execute the `GetPriceHistory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPriceHistory(vars: GetPriceHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetPriceHistoryData, GetPriceHistoryVariables>;

interface GetPriceHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPriceHistoryVariables): QueryRef<GetPriceHistoryData, GetPriceHistoryVariables>;
}
export const getPriceHistoryRef: GetPriceHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPriceHistory(dc: DataConnect, vars: GetPriceHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetPriceHistoryData, GetPriceHistoryVariables>;

interface GetPriceHistoryRef {
  ...
  (dc: DataConnect, vars: GetPriceHistoryVariables): QueryRef<GetPriceHistoryData, GetPriceHistoryVariables>;
}
export const getPriceHistoryRef: GetPriceHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPriceHistoryRef:
```typescript
const name = getPriceHistoryRef.operationName;
console.log(name);
```

### Variables
The `GetPriceHistory` query requires an argument of type `GetPriceHistoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPriceHistoryVariables {
  emojiId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetPriceHistory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPriceHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPriceHistoryData {
  priceHistories: ({
    price: number;
    recordedAt: TimestampString;
  })[];
}
```
### Using `GetPriceHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPriceHistory, GetPriceHistoryVariables } from '@dataconnect/generated';

// The `GetPriceHistory` query requires an argument of type `GetPriceHistoryVariables`:
const getPriceHistoryVars: GetPriceHistoryVariables = {
  emojiId: ..., 
  limit: ..., // optional
};

// Call the `getPriceHistory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPriceHistory(getPriceHistoryVars);
// Variables can be defined inline as well.
const { data } = await getPriceHistory({ emojiId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPriceHistory(dataConnect, getPriceHistoryVars);

console.log(data.priceHistories);

// Or, you can use the `Promise` API.
getPriceHistory(getPriceHistoryVars).then((response) => {
  const data = response.data;
  console.log(data.priceHistories);
});
```

### Using `GetPriceHistory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPriceHistoryRef, GetPriceHistoryVariables } from '@dataconnect/generated';

// The `GetPriceHistory` query requires an argument of type `GetPriceHistoryVariables`:
const getPriceHistoryVars: GetPriceHistoryVariables = {
  emojiId: ..., 
  limit: ..., // optional
};

// Call the `getPriceHistoryRef()` function to get a reference to the query.
const ref = getPriceHistoryRef(getPriceHistoryVars);
// Variables can be defined inline as well.
const ref = getPriceHistoryRef({ emojiId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPriceHistoryRef(dataConnect, getPriceHistoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.priceHistories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.priceHistories);
});
```

## GetEmojiWhaleStats
You can execute the `GetEmojiWhaleStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmojiWhaleStats(options?: ExecuteQueryOptions): QueryPromise<GetEmojiWhaleStatsData, undefined>;

interface GetEmojiWhaleStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetEmojiWhaleStatsData, undefined>;
}
export const getEmojiWhaleStatsRef: GetEmojiWhaleStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmojiWhaleStats(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetEmojiWhaleStatsData, undefined>;

interface GetEmojiWhaleStatsRef {
  ...
  (dc: DataConnect): QueryRef<GetEmojiWhaleStatsData, undefined>;
}
export const getEmojiWhaleStatsRef: GetEmojiWhaleStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmojiWhaleStatsRef:
```typescript
const name = getEmojiWhaleStatsRef.operationName;
console.log(name);
```

### Variables
The `GetEmojiWhaleStats` query has no variables.
### Return Type
Recall that executing the `GetEmojiWhaleStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmojiWhaleStatsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmojiWhaleStatsData {
  emojiWhaleStats: ({
    emojiId?: UUIDString | null;
    whaleUsername?: string | null;
    whaleProfileImage?: string | null;
    whaleShares?: number | null;
    totalSupply?: number | null;
    whalePercentage?: number | null;
  })[];
}
```
### Using `GetEmojiWhaleStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmojiWhaleStats } from '@dataconnect/generated';


// Call the `getEmojiWhaleStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmojiWhaleStats();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmojiWhaleStats(dataConnect);

console.log(data.emojiWhaleStats);

// Or, you can use the `Promise` API.
getEmojiWhaleStats().then((response) => {
  const data = response.data;
  console.log(data.emojiWhaleStats);
});
```

### Using `GetEmojiWhaleStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmojiWhaleStatsRef } from '@dataconnect/generated';


// Call the `getEmojiWhaleStatsRef()` function to get a reference to the query.
const ref = getEmojiWhaleStatsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmojiWhaleStatsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.emojiWhaleStats);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.emojiWhaleStats);
});
```

## GetEmojiHistoryStats
You can execute the `GetEmojiHistoryStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmojiHistoryStats(vars: GetEmojiHistoryStatsVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;

interface GetEmojiHistoryStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmojiHistoryStatsVariables): QueryRef<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
}
export const getEmojiHistoryStatsRef: GetEmojiHistoryStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmojiHistoryStats(dc: DataConnect, vars: GetEmojiHistoryStatsVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;

interface GetEmojiHistoryStatsRef {
  ...
  (dc: DataConnect, vars: GetEmojiHistoryStatsVariables): QueryRef<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
}
export const getEmojiHistoryStatsRef: GetEmojiHistoryStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmojiHistoryStatsRef:
```typescript
const name = getEmojiHistoryStatsRef.operationName;
console.log(name);
```

### Variables
The `GetEmojiHistoryStats` query requires an argument of type `GetEmojiHistoryStatsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmojiHistoryStatsVariables {
  emojiId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEmojiHistoryStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmojiHistoryStatsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmojiHistoryStatsData {
  emojiHistoryStats: ({
    price?: number | null;
    movingAverage?: number | null;
    recordedAt?: TimestampString | null;
  })[];
}
```
### Using `GetEmojiHistoryStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmojiHistoryStats, GetEmojiHistoryStatsVariables } from '@dataconnect/generated';

// The `GetEmojiHistoryStats` query requires an argument of type `GetEmojiHistoryStatsVariables`:
const getEmojiHistoryStatsVars: GetEmojiHistoryStatsVariables = {
  emojiId: ..., 
};

// Call the `getEmojiHistoryStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmojiHistoryStats(getEmojiHistoryStatsVars);
// Variables can be defined inline as well.
const { data } = await getEmojiHistoryStats({ emojiId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmojiHistoryStats(dataConnect, getEmojiHistoryStatsVars);

console.log(data.emojiHistoryStats);

// Or, you can use the `Promise` API.
getEmojiHistoryStats(getEmojiHistoryStatsVars).then((response) => {
  const data = response.data;
  console.log(data.emojiHistoryStats);
});
```

### Using `GetEmojiHistoryStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmojiHistoryStatsRef, GetEmojiHistoryStatsVariables } from '@dataconnect/generated';

// The `GetEmojiHistoryStats` query requires an argument of type `GetEmojiHistoryStatsVariables`:
const getEmojiHistoryStatsVars: GetEmojiHistoryStatsVariables = {
  emojiId: ..., 
};

// Call the `getEmojiHistoryStatsRef()` function to get a reference to the query.
const ref = getEmojiHistoryStatsRef(getEmojiHistoryStatsVars);
// Variables can be defined inline as well.
const ref = getEmojiHistoryStatsRef({ emojiId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmojiHistoryStatsRef(dataConnect, getEmojiHistoryStatsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.emojiHistoryStats);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.emojiHistoryStats);
});
```

## GetChronologicalTicker
You can execute the `GetChronologicalTicker` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getChronologicalTicker(options?: ExecuteQueryOptions): QueryPromise<GetChronologicalTickerData, undefined>;

interface GetChronologicalTickerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetChronologicalTickerData, undefined>;
}
export const getChronologicalTickerRef: GetChronologicalTickerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getChronologicalTicker(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetChronologicalTickerData, undefined>;

interface GetChronologicalTickerRef {
  ...
  (dc: DataConnect): QueryRef<GetChronologicalTickerData, undefined>;
}
export const getChronologicalTickerRef: GetChronologicalTickerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getChronologicalTickerRef:
```typescript
const name = getChronologicalTickerRef.operationName;
console.log(name);
```

### Variables
The `GetChronologicalTicker` query has no variables.
### Return Type
Recall that executing the `GetChronologicalTicker` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetChronologicalTickerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetChronologicalTickerData {
  tickerFeeds: ({
    type?: string | null;
    symbol?: string | null;
    name?: string | null;
    currentPrice?: number | null;
    trend?: number | null;
    description?: string | null;
    eventTime?: TimestampString | null;
  })[];
}
```
### Using `GetChronologicalTicker`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getChronologicalTicker } from '@dataconnect/generated';


// Call the `getChronologicalTicker()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getChronologicalTicker();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getChronologicalTicker(dataConnect);

console.log(data.tickerFeeds);

// Or, you can use the `Promise` API.
getChronologicalTicker().then((response) => {
  const data = response.data;
  console.log(data.tickerFeeds);
});
```

### Using `GetChronologicalTicker`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getChronologicalTickerRef } from '@dataconnect/generated';


// Call the `getChronologicalTickerRef()` function to get a reference to the query.
const ref = getChronologicalTickerRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getChronologicalTickerRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tickerFeeds);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tickerFeeds);
});
```

## GetEmojiSparklines
You can execute the `GetEmojiSparklines` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmojiSparklines(options?: ExecuteQueryOptions): QueryPromise<GetEmojiSparklinesData, undefined>;

interface GetEmojiSparklinesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetEmojiSparklinesData, undefined>;
}
export const getEmojiSparklinesRef: GetEmojiSparklinesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmojiSparklines(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetEmojiSparklinesData, undefined>;

interface GetEmojiSparklinesRef {
  ...
  (dc: DataConnect): QueryRef<GetEmojiSparklinesData, undefined>;
}
export const getEmojiSparklinesRef: GetEmojiSparklinesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmojiSparklinesRef:
```typescript
const name = getEmojiSparklinesRef.operationName;
console.log(name);
```

### Variables
The `GetEmojiSparklines` query has no variables.
### Return Type
Recall that executing the `GetEmojiSparklines` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmojiSparklinesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmojiSparklinesData {
  emojiSparklines: ({
    emojiId?: UUIDString | null;
    price?: number | null;
    recordedAt?: TimestampString | null;
  })[];
}
```
### Using `GetEmojiSparklines`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmojiSparklines } from '@dataconnect/generated';


// Call the `getEmojiSparklines()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmojiSparklines();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmojiSparklines(dataConnect);

console.log(data.emojiSparklines);

// Or, you can use the `Promise` API.
getEmojiSparklines().then((response) => {
  const data = response.data;
  console.log(data.emojiSparklines);
});
```

### Using `GetEmojiSparklines`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmojiSparklinesRef } from '@dataconnect/generated';


// Call the `getEmojiSparklinesRef()` function to get a reference to the query.
const ref = getEmojiSparklinesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmojiSparklinesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.emojiSparklines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.emojiSparklines);
});
```

## GetTopTraders
You can execute the `GetTopTraders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTopTraders(options?: ExecuteQueryOptions): QueryPromise<GetTopTradersData, undefined>;

interface GetTopTradersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTopTradersData, undefined>;
}
export const getTopTradersRef: GetTopTradersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTopTraders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTopTradersData, undefined>;

interface GetTopTradersRef {
  ...
  (dc: DataConnect): QueryRef<GetTopTradersData, undefined>;
}
export const getTopTradersRef: GetTopTradersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTopTradersRef:
```typescript
const name = getTopTradersRef.operationName;
console.log(name);
```

### Variables
The `GetTopTraders` query has no variables.
### Return Type
Recall that executing the `GetTopTraders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTopTradersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTopTradersData {
  topTraders: ({
    id?: string | null;
    username?: string | null;
    profileImage?: string | null;
    netWorth?: number | null;
    rank?: number | null;
  })[];
}
```
### Using `GetTopTraders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTopTraders } from '@dataconnect/generated';


// Call the `getTopTraders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTopTraders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTopTraders(dataConnect);

console.log(data.topTraders);

// Or, you can use the `Promise` API.
getTopTraders().then((response) => {
  const data = response.data;
  console.log(data.topTraders);
});
```

### Using `GetTopTraders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTopTradersRef } from '@dataconnect/generated';


// Call the `getTopTradersRef()` function to get a reference to the query.
const ref = getTopTradersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTopTradersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.topTraders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.topTraders);
});
```

## SearchEmojis
You can execute the `SearchEmojis` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchEmojis(vars?: SearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<SearchEmojisData, SearchEmojisVariables>;

interface SearchEmojisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchEmojisVariables): QueryRef<SearchEmojisData, SearchEmojisVariables>;
}
export const searchEmojisRef: SearchEmojisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchEmojis(dc: DataConnect, vars?: SearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<SearchEmojisData, SearchEmojisVariables>;

interface SearchEmojisRef {
  ...
  (dc: DataConnect, vars?: SearchEmojisVariables): QueryRef<SearchEmojisData, SearchEmojisVariables>;
}
export const searchEmojisRef: SearchEmojisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchEmojisRef:
```typescript
const name = searchEmojisRef.operationName;
console.log(name);
```

### Variables
The `SearchEmojis` query has an optional argument of type `SearchEmojisVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchEmojisVariables {
  query?: string | null;
}
```
### Return Type
Recall that executing the `SearchEmojis` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchEmojisData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchEmojisData {
  emojis_search: ({
    id: UUIDString;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    trend: number;
  } & Emoji_Key)[];
}
```
### Using `SearchEmojis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchEmojis, SearchEmojisVariables } from '@dataconnect/generated';

// The `SearchEmojis` query has an optional argument of type `SearchEmojisVariables`:
const searchEmojisVars: SearchEmojisVariables = {
  query: ..., // optional
};

// Call the `searchEmojis()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchEmojis(searchEmojisVars);
// Variables can be defined inline as well.
const { data } = await searchEmojis({ query: ..., });
// Since all variables are optional for this query, you can omit the `SearchEmojisVariables` argument.
const { data } = await searchEmojis();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchEmojis(dataConnect, searchEmojisVars);

console.log(data.emojis_search);

// Or, you can use the `Promise` API.
searchEmojis(searchEmojisVars).then((response) => {
  const data = response.data;
  console.log(data.emojis_search);
});
```

### Using `SearchEmojis`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchEmojisRef, SearchEmojisVariables } from '@dataconnect/generated';

// The `SearchEmojis` query has an optional argument of type `SearchEmojisVariables`:
const searchEmojisVars: SearchEmojisVariables = {
  query: ..., // optional
};

// Call the `searchEmojisRef()` function to get a reference to the query.
const ref = searchEmojisRef(searchEmojisVars);
// Variables can be defined inline as well.
const ref = searchEmojisRef({ query: ..., });
// Since all variables are optional for this query, you can omit the `SearchEmojisVariables` argument.
const ref = searchEmojisRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchEmojisRef(dataConnect, searchEmojisVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.emojis_search);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.emojis_search);
});
```

## GetTopEmojisByCity
You can execute the `GetTopEmojisByCity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTopEmojisByCity(options?: ExecuteQueryOptions): QueryPromise<GetTopEmojisByCityData, undefined>;

interface GetTopEmojisByCityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTopEmojisByCityData, undefined>;
}
export const getTopEmojisByCityRef: GetTopEmojisByCityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTopEmojisByCity(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTopEmojisByCityData, undefined>;

interface GetTopEmojisByCityRef {
  ...
  (dc: DataConnect): QueryRef<GetTopEmojisByCityData, undefined>;
}
export const getTopEmojisByCityRef: GetTopEmojisByCityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTopEmojisByCityRef:
```typescript
const name = getTopEmojisByCityRef.operationName;
console.log(name);
```

### Variables
The `GetTopEmojisByCity` query has no variables.
### Return Type
Recall that executing the `GetTopEmojisByCity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTopEmojisByCityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTopEmojisByCityData {
  cityTrends?: unknown[] | null;
}
```
### Using `GetTopEmojisByCity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTopEmojisByCity } from '@dataconnect/generated';


// Call the `getTopEmojisByCity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTopEmojisByCity();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTopEmojisByCity(dataConnect);

console.log(data.cityTrends);

// Or, you can use the `Promise` API.
getTopEmojisByCity().then((response) => {
  const data = response.data;
  console.log(data.cityTrends);
});
```

### Using `GetTopEmojisByCity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTopEmojisByCityRef } from '@dataconnect/generated';


// Call the `getTopEmojisByCityRef()` function to get a reference to the query.
const ref = getTopEmojisByCityRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTopEmojisByCityRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cityTrends);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cityTrends);
});
```

## GetTrendingEmojisNearMe
You can execute the `GetTrendingEmojisNearMe` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTrendingEmojisNearMe(vars: GetTrendingEmojisNearMeVariables, options?: ExecuteQueryOptions): QueryPromise<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;

interface GetTrendingEmojisNearMeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTrendingEmojisNearMeVariables): QueryRef<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
}
export const getTrendingEmojisNearMeRef: GetTrendingEmojisNearMeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTrendingEmojisNearMe(dc: DataConnect, vars: GetTrendingEmojisNearMeVariables, options?: ExecuteQueryOptions): QueryPromise<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;

interface GetTrendingEmojisNearMeRef {
  ...
  (dc: DataConnect, vars: GetTrendingEmojisNearMeVariables): QueryRef<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
}
export const getTrendingEmojisNearMeRef: GetTrendingEmojisNearMeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTrendingEmojisNearMeRef:
```typescript
const name = getTrendingEmojisNearMeRef.operationName;
console.log(name);
```

### Variables
The `GetTrendingEmojisNearMe` query requires an argument of type `GetTrendingEmojisNearMeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTrendingEmojisNearMeVariables {
  userLng: number;
  userLat: number;
  radiusMeters: number;
}
```
### Return Type
Recall that executing the `GetTrendingEmojisNearMe` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTrendingEmojisNearMeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTrendingEmojisNearMeData {
  regionalTrends?: unknown[] | null;
}
```
### Using `GetTrendingEmojisNearMe`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTrendingEmojisNearMe, GetTrendingEmojisNearMeVariables } from '@dataconnect/generated';

// The `GetTrendingEmojisNearMe` query requires an argument of type `GetTrendingEmojisNearMeVariables`:
const getTrendingEmojisNearMeVars: GetTrendingEmojisNearMeVariables = {
  userLng: ..., 
  userLat: ..., 
  radiusMeters: ..., 
};

// Call the `getTrendingEmojisNearMe()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTrendingEmojisNearMe(getTrendingEmojisNearMeVars);
// Variables can be defined inline as well.
const { data } = await getTrendingEmojisNearMe({ userLng: ..., userLat: ..., radiusMeters: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTrendingEmojisNearMe(dataConnect, getTrendingEmojisNearMeVars);

console.log(data.regionalTrends);

// Or, you can use the `Promise` API.
getTrendingEmojisNearMe(getTrendingEmojisNearMeVars).then((response) => {
  const data = response.data;
  console.log(data.regionalTrends);
});
```

### Using `GetTrendingEmojisNearMe`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTrendingEmojisNearMeRef, GetTrendingEmojisNearMeVariables } from '@dataconnect/generated';

// The `GetTrendingEmojisNearMe` query requires an argument of type `GetTrendingEmojisNearMeVariables`:
const getTrendingEmojisNearMeVars: GetTrendingEmojisNearMeVariables = {
  userLng: ..., 
  userLat: ..., 
  radiusMeters: ..., 
};

// Call the `getTrendingEmojisNearMeRef()` function to get a reference to the query.
const ref = getTrendingEmojisNearMeRef(getTrendingEmojisNearMeVars);
// Variables can be defined inline as well.
const ref = getTrendingEmojisNearMeRef({ userLng: ..., userLat: ..., radiusMeters: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTrendingEmojisNearMeRef(dataConnect, getTrendingEmojisNearMeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.regionalTrends);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.regionalTrends);
});
```

## VectorSearchEmojis
You can execute the `VectorSearchEmojis` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
vectorSearchEmojis(vars: VectorSearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<VectorSearchEmojisData, VectorSearchEmojisVariables>;

interface VectorSearchEmojisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VectorSearchEmojisVariables): QueryRef<VectorSearchEmojisData, VectorSearchEmojisVariables>;
}
export const vectorSearchEmojisRef: VectorSearchEmojisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
vectorSearchEmojis(dc: DataConnect, vars: VectorSearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<VectorSearchEmojisData, VectorSearchEmojisVariables>;

interface VectorSearchEmojisRef {
  ...
  (dc: DataConnect, vars: VectorSearchEmojisVariables): QueryRef<VectorSearchEmojisData, VectorSearchEmojisVariables>;
}
export const vectorSearchEmojisRef: VectorSearchEmojisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the vectorSearchEmojisRef:
```typescript
const name = vectorSearchEmojisRef.operationName;
console.log(name);
```

### Variables
The `VectorSearchEmojis` query requires an argument of type `VectorSearchEmojisVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VectorSearchEmojisVariables {
  query: string;
}
```
### Return Type
Recall that executing the `VectorSearchEmojis` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VectorSearchEmojisData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VectorSearchEmojisData {
  emojis_descriptionEmbedding_similarity: ({
    id: UUIDString;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    trend: number;
    _metadata?: {
      distance?: number | null;
    };
  } & Emoji_Key)[];
}
```
### Using `VectorSearchEmojis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, vectorSearchEmojis, VectorSearchEmojisVariables } from '@dataconnect/generated';

// The `VectorSearchEmojis` query requires an argument of type `VectorSearchEmojisVariables`:
const vectorSearchEmojisVars: VectorSearchEmojisVariables = {
  query: ..., 
};

// Call the `vectorSearchEmojis()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await vectorSearchEmojis(vectorSearchEmojisVars);
// Variables can be defined inline as well.
const { data } = await vectorSearchEmojis({ query: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await vectorSearchEmojis(dataConnect, vectorSearchEmojisVars);

console.log(data.emojis_descriptionEmbedding_similarity);

// Or, you can use the `Promise` API.
vectorSearchEmojis(vectorSearchEmojisVars).then((response) => {
  const data = response.data;
  console.log(data.emojis_descriptionEmbedding_similarity);
});
```

### Using `VectorSearchEmojis`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, vectorSearchEmojisRef, VectorSearchEmojisVariables } from '@dataconnect/generated';

// The `VectorSearchEmojis` query requires an argument of type `VectorSearchEmojisVariables`:
const vectorSearchEmojisVars: VectorSearchEmojisVariables = {
  query: ..., 
};

// Call the `vectorSearchEmojisRef()` function to get a reference to the query.
const ref = vectorSearchEmojisRef(vectorSearchEmojisVars);
// Variables can be defined inline as well.
const ref = vectorSearchEmojisRef({ query: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = vectorSearchEmojisRef(dataConnect, vectorSearchEmojisVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.emojis_descriptionEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.emojis_descriptionEmbedding_similarity);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `friendly-exchange` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  username: string;
  profileImage: string;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
  profileImage: ..., 
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ username: ..., profileImage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
  profileImage: ..., 
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ username: ..., profileImage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## UpdateUserRole
You can execute the `UpdateUserRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
}
export const updateUserRoleRef: UpdateUserRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserRoleRef {
  ...
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
}
export const updateUserRoleRef: UpdateUserRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRoleRef:
```typescript
const name = updateUserRoleRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserRoleVariables {
  role: string;
}
```
### Return Type
Recall that executing the `UpdateUserRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserRoleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserRole, UpdateUserRoleVariables } from '@dataconnect/generated';

// The `UpdateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`:
const updateUserRoleVars: UpdateUserRoleVariables = {
  role: ..., 
};

// Call the `updateUserRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserRole(updateUserRoleVars);
// Variables can be defined inline as well.
const { data } = await updateUserRole({ role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserRole(dataConnect, updateUserRoleVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserRole(updateUserRoleVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRoleRef, UpdateUserRoleVariables } from '@dataconnect/generated';

// The `UpdateUserRole` mutation requires an argument of type `UpdateUserRoleVariables`:
const updateUserRoleVars: UpdateUserRoleVariables = {
  role: ..., 
};

// Call the `updateUserRoleRef()` function to get a reference to the mutation.
const ref = updateUserRoleRef(updateUserRoleVars);
// Variables can be defined inline as well.
const ref = updateUserRoleRef({ role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRoleRef(dataConnect, updateUserRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## UpdateUserLocation
You can execute the `UpdateUserLocation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserLocation(vars: UpdateUserLocationVariables): MutationPromise<UpdateUserLocationData, UpdateUserLocationVariables>;

interface UpdateUserLocationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserLocationVariables): MutationRef<UpdateUserLocationData, UpdateUserLocationVariables>;
}
export const updateUserLocationRef: UpdateUserLocationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserLocation(dc: DataConnect, vars: UpdateUserLocationVariables): MutationPromise<UpdateUserLocationData, UpdateUserLocationVariables>;

interface UpdateUserLocationRef {
  ...
  (dc: DataConnect, vars: UpdateUserLocationVariables): MutationRef<UpdateUserLocationData, UpdateUserLocationVariables>;
}
export const updateUserLocationRef: UpdateUserLocationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserLocationRef:
```typescript
const name = updateUserLocationRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserLocation` mutation requires an argument of type `UpdateUserLocationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserLocationVariables {
  city: string;
  latitude: number;
  longitude: number;
}
```
### Return Type
Recall that executing the `UpdateUserLocation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserLocationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserLocationData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserLocation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserLocation, UpdateUserLocationVariables } from '@dataconnect/generated';

// The `UpdateUserLocation` mutation requires an argument of type `UpdateUserLocationVariables`:
const updateUserLocationVars: UpdateUserLocationVariables = {
  city: ..., 
  latitude: ..., 
  longitude: ..., 
};

// Call the `updateUserLocation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserLocation(updateUserLocationVars);
// Variables can be defined inline as well.
const { data } = await updateUserLocation({ city: ..., latitude: ..., longitude: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserLocation(dataConnect, updateUserLocationVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserLocation(updateUserLocationVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserLocation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserLocationRef, UpdateUserLocationVariables } from '@dataconnect/generated';

// The `UpdateUserLocation` mutation requires an argument of type `UpdateUserLocationVariables`:
const updateUserLocationVars: UpdateUserLocationVariables = {
  city: ..., 
  latitude: ..., 
  longitude: ..., 
};

// Call the `updateUserLocationRef()` function to get a reference to the mutation.
const ref = updateUserLocationRef(updateUserLocationVars);
// Variables can be defined inline as well.
const ref = updateUserLocationRef({ city: ..., latitude: ..., longitude: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserLocationRef(dataConnect, updateUserLocationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## TriggerEvent
You can execute the `TriggerEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
triggerEvent(vars: TriggerEventVariables): MutationPromise<TriggerEventData, TriggerEventVariables>;

interface TriggerEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TriggerEventVariables): MutationRef<TriggerEventData, TriggerEventVariables>;
}
export const triggerEventRef: TriggerEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
triggerEvent(dc: DataConnect, vars: TriggerEventVariables): MutationPromise<TriggerEventData, TriggerEventVariables>;

interface TriggerEventRef {
  ...
  (dc: DataConnect, vars: TriggerEventVariables): MutationRef<TriggerEventData, TriggerEventVariables>;
}
export const triggerEventRef: TriggerEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the triggerEventRef:
```typescript
const name = triggerEventRef.operationName;
console.log(name);
```

### Variables
The `TriggerEvent` mutation requires an argument of type `TriggerEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface TriggerEventVariables {
  emojiId: UUIDString;
  impact: number;
  description: string;
  now: TimestampString;
}
```
### Return Type
Recall that executing the `TriggerEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TriggerEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TriggerEventData {
  event_insert: Event_Key;
}
```
### Using `TriggerEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, triggerEvent, TriggerEventVariables } from '@dataconnect/generated';

// The `TriggerEvent` mutation requires an argument of type `TriggerEventVariables`:
const triggerEventVars: TriggerEventVariables = {
  emojiId: ..., 
  impact: ..., 
  description: ..., 
  now: ..., 
};

// Call the `triggerEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await triggerEvent(triggerEventVars);
// Variables can be defined inline as well.
const { data } = await triggerEvent({ emojiId: ..., impact: ..., description: ..., now: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await triggerEvent(dataConnect, triggerEventVars);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
triggerEvent(triggerEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

### Using `TriggerEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, triggerEventRef, TriggerEventVariables } from '@dataconnect/generated';

// The `TriggerEvent` mutation requires an argument of type `TriggerEventVariables`:
const triggerEventVars: TriggerEventVariables = {
  emojiId: ..., 
  impact: ..., 
  description: ..., 
  now: ..., 
};

// Call the `triggerEventRef()` function to get a reference to the mutation.
const ref = triggerEventRef(triggerEventVars);
// Variables can be defined inline as well.
const ref = triggerEventRef({ emojiId: ..., impact: ..., description: ..., now: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = triggerEventRef(dataConnect, triggerEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

## MarketMakerTrade
You can execute the `MarketMakerTrade` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
marketMakerTrade(vars: MarketMakerTradeVariables): MutationPromise<MarketMakerTradeData, MarketMakerTradeVariables>;

interface MarketMakerTradeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarketMakerTradeVariables): MutationRef<MarketMakerTradeData, MarketMakerTradeVariables>;
}
export const marketMakerTradeRef: MarketMakerTradeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
marketMakerTrade(dc: DataConnect, vars: MarketMakerTradeVariables): MutationPromise<MarketMakerTradeData, MarketMakerTradeVariables>;

interface MarketMakerTradeRef {
  ...
  (dc: DataConnect, vars: MarketMakerTradeVariables): MutationRef<MarketMakerTradeData, MarketMakerTradeVariables>;
}
export const marketMakerTradeRef: MarketMakerTradeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the marketMakerTradeRef:
```typescript
const name = marketMakerTradeRef.operationName;
console.log(name);
```

### Variables
The `MarketMakerTrade` mutation requires an argument of type `MarketMakerTradeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarketMakerTradeVariables {
  emojiId: UUIDString;
  priceImpact: number;
  shareDelta: number;
  eventDesc: string;
  newPrice: number;
}
```
### Return Type
Recall that executing the `MarketMakerTrade` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarketMakerTradeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarketMakerTradeData {
  stockOwnership_upsert: StockOwnership_Key;
  emoji_update?: Emoji_Key | null;
  event_insert: Event_Key;
  priceHistory_insert: PriceHistory_Key;
}
```
### Using `MarketMakerTrade`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, marketMakerTrade, MarketMakerTradeVariables } from '@dataconnect/generated';

// The `MarketMakerTrade` mutation requires an argument of type `MarketMakerTradeVariables`:
const marketMakerTradeVars: MarketMakerTradeVariables = {
  emojiId: ..., 
  priceImpact: ..., 
  shareDelta: ..., 
  eventDesc: ..., 
  newPrice: ..., 
};

// Call the `marketMakerTrade()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await marketMakerTrade(marketMakerTradeVars);
// Variables can be defined inline as well.
const { data } = await marketMakerTrade({ emojiId: ..., priceImpact: ..., shareDelta: ..., eventDesc: ..., newPrice: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await marketMakerTrade(dataConnect, marketMakerTradeVars);

console.log(data.stockOwnership_upsert);
console.log(data.emoji_update);
console.log(data.event_insert);
console.log(data.priceHistory_insert);

// Or, you can use the `Promise` API.
marketMakerTrade(marketMakerTradeVars).then((response) => {
  const data = response.data;
  console.log(data.stockOwnership_upsert);
  console.log(data.emoji_update);
  console.log(data.event_insert);
  console.log(data.priceHistory_insert);
});
```

### Using `MarketMakerTrade`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, marketMakerTradeRef, MarketMakerTradeVariables } from '@dataconnect/generated';

// The `MarketMakerTrade` mutation requires an argument of type `MarketMakerTradeVariables`:
const marketMakerTradeVars: MarketMakerTradeVariables = {
  emojiId: ..., 
  priceImpact: ..., 
  shareDelta: ..., 
  eventDesc: ..., 
  newPrice: ..., 
};

// Call the `marketMakerTradeRef()` function to get a reference to the mutation.
const ref = marketMakerTradeRef(marketMakerTradeVars);
// Variables can be defined inline as well.
const ref = marketMakerTradeRef({ emojiId: ..., priceImpact: ..., shareDelta: ..., eventDesc: ..., newPrice: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = marketMakerTradeRef(dataConnect, marketMakerTradeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.stockOwnership_upsert);
console.log(data.emoji_update);
console.log(data.event_insert);
console.log(data.priceHistory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.stockOwnership_upsert);
  console.log(data.emoji_update);
  console.log(data.event_insert);
  console.log(data.priceHistory_insert);
});
```

## BuyStock
You can execute the `BuyStock` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
buyStock(vars: BuyStockVariables): MutationPromise<BuyStockData, BuyStockVariables>;

interface BuyStockRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuyStockVariables): MutationRef<BuyStockData, BuyStockVariables>;
}
export const buyStockRef: BuyStockRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
buyStock(dc: DataConnect, vars: BuyStockVariables): MutationPromise<BuyStockData, BuyStockVariables>;

interface BuyStockRef {
  ...
  (dc: DataConnect, vars: BuyStockVariables): MutationRef<BuyStockData, BuyStockVariables>;
}
export const buyStockRef: BuyStockRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the buyStockRef:
```typescript
const name = buyStockRef.operationName;
console.log(name);
```

### Variables
The `BuyStock` mutation requires an argument of type `BuyStockVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BuyStockVariables {
  emojiId: UUIDString;
  amount: number;
  isDiscounted: boolean;
}
```
### Return Type
Recall that executing the `BuyStock` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BuyStockData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BuyStockData {
  buyStock?: number | null;
}
```
### Using `BuyStock`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, buyStock, BuyStockVariables } from '@dataconnect/generated';

// The `BuyStock` mutation requires an argument of type `BuyStockVariables`:
const buyStockVars: BuyStockVariables = {
  emojiId: ..., 
  amount: ..., 
  isDiscounted: ..., 
};

// Call the `buyStock()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await buyStock(buyStockVars);
// Variables can be defined inline as well.
const { data } = await buyStock({ emojiId: ..., amount: ..., isDiscounted: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await buyStock(dataConnect, buyStockVars);

console.log(data.buyStock);

// Or, you can use the `Promise` API.
buyStock(buyStockVars).then((response) => {
  const data = response.data;
  console.log(data.buyStock);
});
```

### Using `BuyStock`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, buyStockRef, BuyStockVariables } from '@dataconnect/generated';

// The `BuyStock` mutation requires an argument of type `BuyStockVariables`:
const buyStockVars: BuyStockVariables = {
  emojiId: ..., 
  amount: ..., 
  isDiscounted: ..., 
};

// Call the `buyStockRef()` function to get a reference to the mutation.
const ref = buyStockRef(buyStockVars);
// Variables can be defined inline as well.
const ref = buyStockRef({ emojiId: ..., amount: ..., isDiscounted: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = buyStockRef(dataConnect, buyStockVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.buyStock);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.buyStock);
});
```

## SellStock
You can execute the `SellStock` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
sellStock(vars: SellStockVariables): MutationPromise<SellStockData, SellStockVariables>;

interface SellStockRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SellStockVariables): MutationRef<SellStockData, SellStockVariables>;
}
export const sellStockRef: SellStockRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
sellStock(dc: DataConnect, vars: SellStockVariables): MutationPromise<SellStockData, SellStockVariables>;

interface SellStockRef {
  ...
  (dc: DataConnect, vars: SellStockVariables): MutationRef<SellStockData, SellStockVariables>;
}
export const sellStockRef: SellStockRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the sellStockRef:
```typescript
const name = sellStockRef.operationName;
console.log(name);
```

### Variables
The `SellStock` mutation requires an argument of type `SellStockVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SellStockVariables {
  emojiId: UUIDString;
  amount: number;
}
```
### Return Type
Recall that executing the `SellStock` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SellStockData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SellStockData {
  sellStock?: number | null;
}
```
### Using `SellStock`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, sellStock, SellStockVariables } from '@dataconnect/generated';

// The `SellStock` mutation requires an argument of type `SellStockVariables`:
const sellStockVars: SellStockVariables = {
  emojiId: ..., 
  amount: ..., 
};

// Call the `sellStock()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await sellStock(sellStockVars);
// Variables can be defined inline as well.
const { data } = await sellStock({ emojiId: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await sellStock(dataConnect, sellStockVars);

console.log(data.sellStock);

// Or, you can use the `Promise` API.
sellStock(sellStockVars).then((response) => {
  const data = response.data;
  console.log(data.sellStock);
});
```

### Using `SellStock`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, sellStockRef, SellStockVariables } from '@dataconnect/generated';

// The `SellStock` mutation requires an argument of type `SellStockVariables`:
const sellStockVars: SellStockVariables = {
  emojiId: ..., 
  amount: ..., 
};

// Call the `sellStockRef()` function to get a reference to the mutation.
const ref = sellStockRef(sellStockVars);
// Variables can be defined inline as well.
const ref = sellStockRef({ emojiId: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = sellStockRef(dataConnect, sellStockVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sellStock);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sellStock);
});
```

## GenerateTradeHeadline
You can execute the `GenerateTradeHeadline` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
generateTradeHeadline(vars: GenerateTradeHeadlineVariables): MutationPromise<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;

interface GenerateTradeHeadlineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GenerateTradeHeadlineVariables): MutationRef<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;
}
export const generateTradeHeadlineRef: GenerateTradeHeadlineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
generateTradeHeadline(dc: DataConnect, vars: GenerateTradeHeadlineVariables): MutationPromise<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;

interface GenerateTradeHeadlineRef {
  ...
  (dc: DataConnect, vars: GenerateTradeHeadlineVariables): MutationRef<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;
}
export const generateTradeHeadlineRef: GenerateTradeHeadlineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the generateTradeHeadlineRef:
```typescript
const name = generateTradeHeadlineRef.operationName;
console.log(name);
```

### Variables
The `GenerateTradeHeadline` mutation requires an argument of type `GenerateTradeHeadlineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GenerateTradeHeadlineVariables {
  emojiSymbol: string;
  emojiName: string;
  username: string;
  tradeAmount: number;
  tradeCost: number;
  tradeType: string;
}
```
### Return Type
Recall that executing the `GenerateTradeHeadline` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GenerateTradeHeadlineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GenerateTradeHeadlineData {
  aiHeadline: string;
}
```
### Using `GenerateTradeHeadline`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, generateTradeHeadline, GenerateTradeHeadlineVariables } from '@dataconnect/generated';

// The `GenerateTradeHeadline` mutation requires an argument of type `GenerateTradeHeadlineVariables`:
const generateTradeHeadlineVars: GenerateTradeHeadlineVariables = {
  emojiSymbol: ..., 
  emojiName: ..., 
  username: ..., 
  tradeAmount: ..., 
  tradeCost: ..., 
  tradeType: ..., 
};

// Call the `generateTradeHeadline()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await generateTradeHeadline(generateTradeHeadlineVars);
// Variables can be defined inline as well.
const { data } = await generateTradeHeadline({ emojiSymbol: ..., emojiName: ..., username: ..., tradeAmount: ..., tradeCost: ..., tradeType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await generateTradeHeadline(dataConnect, generateTradeHeadlineVars);

console.log(data.aiHeadline);

// Or, you can use the `Promise` API.
generateTradeHeadline(generateTradeHeadlineVars).then((response) => {
  const data = response.data;
  console.log(data.aiHeadline);
});
```

### Using `GenerateTradeHeadline`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, generateTradeHeadlineRef, GenerateTradeHeadlineVariables } from '@dataconnect/generated';

// The `GenerateTradeHeadline` mutation requires an argument of type `GenerateTradeHeadlineVariables`:
const generateTradeHeadlineVars: GenerateTradeHeadlineVariables = {
  emojiSymbol: ..., 
  emojiName: ..., 
  username: ..., 
  tradeAmount: ..., 
  tradeCost: ..., 
  tradeType: ..., 
};

// Call the `generateTradeHeadlineRef()` function to get a reference to the mutation.
const ref = generateTradeHeadlineRef(generateTradeHeadlineVars);
// Variables can be defined inline as well.
const ref = generateTradeHeadlineRef({ emojiSymbol: ..., emojiName: ..., username: ..., tradeAmount: ..., tradeCost: ..., tradeType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = generateTradeHeadlineRef(dataConnect, generateTradeHeadlineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiHeadline);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiHeadline);
});
```

## ExecuteReadXPostTransaction
You can execute the `ExecuteReadXPostTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
executeReadXPostTransaction(vars: ExecuteReadXPostTransactionVariables): MutationPromise<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;

interface ExecuteReadXPostTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExecuteReadXPostTransactionVariables): MutationRef<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;
}
export const executeReadXPostTransactionRef: ExecuteReadXPostTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
executeReadXPostTransaction(dc: DataConnect, vars: ExecuteReadXPostTransactionVariables): MutationPromise<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;

interface ExecuteReadXPostTransactionRef {
  ...
  (dc: DataConnect, vars: ExecuteReadXPostTransactionVariables): MutationRef<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;
}
export const executeReadXPostTransactionRef: ExecuteReadXPostTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the executeReadXPostTransactionRef:
```typescript
const name = executeReadXPostTransactionRef.operationName;
console.log(name);
```

### Variables
The `ExecuteReadXPostTransaction` mutation requires an argument of type `ExecuteReadXPostTransactionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ExecuteReadXPostTransactionVariables {
  symbol: string;
  boostAmount: number;
  tweetId: string;
  userId: string;
}
```
### Return Type
Recall that executing the `ExecuteReadXPostTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ExecuteReadXPostTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ExecuteReadXPostTransactionData {
  readXPost?: number | null;
}
```
### Using `ExecuteReadXPostTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, executeReadXPostTransaction, ExecuteReadXPostTransactionVariables } from '@dataconnect/generated';

// The `ExecuteReadXPostTransaction` mutation requires an argument of type `ExecuteReadXPostTransactionVariables`:
const executeReadXPostTransactionVars: ExecuteReadXPostTransactionVariables = {
  symbol: ..., 
  boostAmount: ..., 
  tweetId: ..., 
  userId: ..., 
};

// Call the `executeReadXPostTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeReadXPostTransaction(executeReadXPostTransactionVars);
// Variables can be defined inline as well.
const { data } = await executeReadXPostTransaction({ symbol: ..., boostAmount: ..., tweetId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await executeReadXPostTransaction(dataConnect, executeReadXPostTransactionVars);

console.log(data.readXPost);

// Or, you can use the `Promise` API.
executeReadXPostTransaction(executeReadXPostTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.readXPost);
});
```

### Using `ExecuteReadXPostTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, executeReadXPostTransactionRef, ExecuteReadXPostTransactionVariables } from '@dataconnect/generated';

// The `ExecuteReadXPostTransaction` mutation requires an argument of type `ExecuteReadXPostTransactionVariables`:
const executeReadXPostTransactionVars: ExecuteReadXPostTransactionVariables = {
  symbol: ..., 
  boostAmount: ..., 
  tweetId: ..., 
  userId: ..., 
};

// Call the `executeReadXPostTransactionRef()` function to get a reference to the mutation.
const ref = executeReadXPostTransactionRef(executeReadXPostTransactionVars);
// Variables can be defined inline as well.
const ref = executeReadXPostTransactionRef({ symbol: ..., boostAmount: ..., tweetId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = executeReadXPostTransactionRef(dataConnect, executeReadXPostTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.readXPost);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.readXPost);
});
```

## TriggerSocialBoost
You can execute the `TriggerSocialBoost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
triggerSocialBoost(vars: TriggerSocialBoostVariables): MutationPromise<TriggerSocialBoostData, TriggerSocialBoostVariables>;

interface TriggerSocialBoostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TriggerSocialBoostVariables): MutationRef<TriggerSocialBoostData, TriggerSocialBoostVariables>;
}
export const triggerSocialBoostRef: TriggerSocialBoostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
triggerSocialBoost(dc: DataConnect, vars: TriggerSocialBoostVariables): MutationPromise<TriggerSocialBoostData, TriggerSocialBoostVariables>;

interface TriggerSocialBoostRef {
  ...
  (dc: DataConnect, vars: TriggerSocialBoostVariables): MutationRef<TriggerSocialBoostData, TriggerSocialBoostVariables>;
}
export const triggerSocialBoostRef: TriggerSocialBoostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the triggerSocialBoostRef:
```typescript
const name = triggerSocialBoostRef.operationName;
console.log(name);
```

### Variables
The `TriggerSocialBoost` mutation requires an argument of type `TriggerSocialBoostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface TriggerSocialBoostVariables {
  tweetUrl: string;
  userId: string;
}
```
### Return Type
Recall that executing the `TriggerSocialBoost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TriggerSocialBoostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TriggerSocialBoostData {
  boostFromTweet?: {
    success: boolean;
    symbol?: string | null;
    boostAmount?: number | null;
    message?: string | null;
  };
}
```
### Using `TriggerSocialBoost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, triggerSocialBoost, TriggerSocialBoostVariables } from '@dataconnect/generated';

// The `TriggerSocialBoost` mutation requires an argument of type `TriggerSocialBoostVariables`:
const triggerSocialBoostVars: TriggerSocialBoostVariables = {
  tweetUrl: ..., 
  userId: ..., 
};

// Call the `triggerSocialBoost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await triggerSocialBoost(triggerSocialBoostVars);
// Variables can be defined inline as well.
const { data } = await triggerSocialBoost({ tweetUrl: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await triggerSocialBoost(dataConnect, triggerSocialBoostVars);

console.log(data.boostFromTweet);

// Or, you can use the `Promise` API.
triggerSocialBoost(triggerSocialBoostVars).then((response) => {
  const data = response.data;
  console.log(data.boostFromTweet);
});
```

### Using `TriggerSocialBoost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, triggerSocialBoostRef, TriggerSocialBoostVariables } from '@dataconnect/generated';

// The `TriggerSocialBoost` mutation requires an argument of type `TriggerSocialBoostVariables`:
const triggerSocialBoostVars: TriggerSocialBoostVariables = {
  tweetUrl: ..., 
  userId: ..., 
};

// Call the `triggerSocialBoostRef()` function to get a reference to the mutation.
const ref = triggerSocialBoostRef(triggerSocialBoostVars);
// Variables can be defined inline as well.
const ref = triggerSocialBoostRef({ tweetUrl: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = triggerSocialBoostRef(dataConnect, triggerSocialBoostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.boostFromTweet);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.boostFromTweet);
});
```

## PanicSellPortfolio
You can execute the `PanicSellPortfolio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
panicSellPortfolio(): MutationPromise<PanicSellPortfolioData, undefined>;

interface PanicSellPortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<PanicSellPortfolioData, undefined>;
}
export const panicSellPortfolioRef: PanicSellPortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
panicSellPortfolio(dc: DataConnect): MutationPromise<PanicSellPortfolioData, undefined>;

interface PanicSellPortfolioRef {
  ...
  (dc: DataConnect): MutationRef<PanicSellPortfolioData, undefined>;
}
export const panicSellPortfolioRef: PanicSellPortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the panicSellPortfolioRef:
```typescript
const name = panicSellPortfolioRef.operationName;
console.log(name);
```

### Variables
The `PanicSellPortfolio` mutation has no variables.
### Return Type
Recall that executing the `PanicSellPortfolio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PanicSellPortfolioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PanicSellPortfolioData {
  panicSell?: number | null;
}
```
### Using `PanicSellPortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, panicSellPortfolio } from '@dataconnect/generated';


// Call the `panicSellPortfolio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await panicSellPortfolio();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await panicSellPortfolio(dataConnect);

console.log(data.panicSell);

// Or, you can use the `Promise` API.
panicSellPortfolio().then((response) => {
  const data = response.data;
  console.log(data.panicSell);
});
```

### Using `PanicSellPortfolio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, panicSellPortfolioRef } from '@dataconnect/generated';


// Call the `panicSellPortfolioRef()` function to get a reference to the mutation.
const ref = panicSellPortfolioRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = panicSellPortfolioRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.panicSell);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.panicSell);
});
```

## TriggerMarketCrash
You can execute the `TriggerMarketCrash` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
triggerMarketCrash(vars: TriggerMarketCrashVariables): MutationPromise<TriggerMarketCrashData, TriggerMarketCrashVariables>;

interface TriggerMarketCrashRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TriggerMarketCrashVariables): MutationRef<TriggerMarketCrashData, TriggerMarketCrashVariables>;
}
export const triggerMarketCrashRef: TriggerMarketCrashRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
triggerMarketCrash(dc: DataConnect, vars: TriggerMarketCrashVariables): MutationPromise<TriggerMarketCrashData, TriggerMarketCrashVariables>;

interface TriggerMarketCrashRef {
  ...
  (dc: DataConnect, vars: TriggerMarketCrashVariables): MutationRef<TriggerMarketCrashData, TriggerMarketCrashVariables>;
}
export const triggerMarketCrashRef: TriggerMarketCrashRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the triggerMarketCrashRef:
```typescript
const name = triggerMarketCrashRef.operationName;
console.log(name);
```

### Variables
The `TriggerMarketCrash` mutation requires an argument of type `TriggerMarketCrashVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface TriggerMarketCrashVariables {
  tag: string;
}
```
### Return Type
Recall that executing the `TriggerMarketCrash` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TriggerMarketCrashData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TriggerMarketCrashData {
  marketCrash?: number | null;
}
```
### Using `TriggerMarketCrash`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, triggerMarketCrash, TriggerMarketCrashVariables } from '@dataconnect/generated';

// The `TriggerMarketCrash` mutation requires an argument of type `TriggerMarketCrashVariables`:
const triggerMarketCrashVars: TriggerMarketCrashVariables = {
  tag: ..., 
};

// Call the `triggerMarketCrash()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await triggerMarketCrash(triggerMarketCrashVars);
// Variables can be defined inline as well.
const { data } = await triggerMarketCrash({ tag: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await triggerMarketCrash(dataConnect, triggerMarketCrashVars);

console.log(data.marketCrash);

// Or, you can use the `Promise` API.
triggerMarketCrash(triggerMarketCrashVars).then((response) => {
  const data = response.data;
  console.log(data.marketCrash);
});
```

### Using `TriggerMarketCrash`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, triggerMarketCrashRef, TriggerMarketCrashVariables } from '@dataconnect/generated';

// The `TriggerMarketCrash` mutation requires an argument of type `TriggerMarketCrashVariables`:
const triggerMarketCrashVars: TriggerMarketCrashVariables = {
  tag: ..., 
};

// Call the `triggerMarketCrashRef()` function to get a reference to the mutation.
const ref = triggerMarketCrashRef(triggerMarketCrashVars);
// Variables can be defined inline as well.
const ref = triggerMarketCrashRef({ tag: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = triggerMarketCrashRef(dataConnect, triggerMarketCrashVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.marketCrash);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.marketCrash);
});
```

