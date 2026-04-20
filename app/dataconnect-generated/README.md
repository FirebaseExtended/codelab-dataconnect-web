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
  - [*GetTopTraders*](#gettoptraders)
  - [*GetChronologicalTicker*](#getchronologicalticker)
  - [*GetEmojiSparklines*](#getemojisparklines)
  - [*SearchEmojis*](#searchemojis)
- [**Mutations**](#mutations)

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

# Mutations

No mutations were generated for the `friendly-exchange` connector.

If you want to learn more about how to use mutations in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

