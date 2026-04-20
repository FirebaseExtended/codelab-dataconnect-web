# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `friendly-exchange`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `friendly-exchange`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `friendly-exchange`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `friendly-exchange` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetDashboardData
You can execute the `GetDashboardData` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetDashboardData(dc: DataConnect, options?: useDataConnectQueryOptions<GetDashboardDataData>): UseDataConnectQueryResult<GetDashboardDataData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDashboardData(options?: useDataConnectQueryOptions<GetDashboardDataData>): UseDataConnectQueryResult<GetDashboardDataData, undefined>;
```

### Variables
The `GetDashboardData` Query has no variables.
### Return Type
Recall that calling the `GetDashboardData` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDashboardData` Query is of type `GetDashboardDataData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDashboardData`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetDashboardData } from '@dataconnect/generated/react'

export default function GetDashboardDataComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDashboardData();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDashboardData(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardData(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardData(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.emojis);
    console.log(query.data.events);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserProfile
You can execute the `GetUserProfile` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserProfile(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserProfile(options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, undefined>;
```

### Variables
The `GetUserProfile` Query has no variables.
### Return Type
Recall that calling the `GetUserProfile` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserProfile` Query is of type `GetUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserProfile`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetUserProfile } from '@dataconnect/generated/react'

export default function GetUserProfileComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserProfile();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserProfile(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserProfile(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPriceHistory
You can execute the `GetPriceHistory` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPriceHistory(dc: DataConnect, vars: GetPriceHistoryVariables, options?: useDataConnectQueryOptions<GetPriceHistoryData>): UseDataConnectQueryResult<GetPriceHistoryData, GetPriceHistoryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPriceHistory(vars: GetPriceHistoryVariables, options?: useDataConnectQueryOptions<GetPriceHistoryData>): UseDataConnectQueryResult<GetPriceHistoryData, GetPriceHistoryVariables>;
```

### Variables
The `GetPriceHistory` Query requires an argument of type `GetPriceHistoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPriceHistoryVariables {
  emojiId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that calling the `GetPriceHistory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPriceHistory` Query is of type `GetPriceHistoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetPriceHistoryData {
  priceHistories: ({
    price: number;
    recordedAt: TimestampString;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPriceHistory`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPriceHistoryVariables } from '@dataconnect/generated';
import { useGetPriceHistory } from '@dataconnect/generated/react'

export default function GetPriceHistoryComponent() {
  // The `useGetPriceHistory` Query hook requires an argument of type `GetPriceHistoryVariables`:
  const getPriceHistoryVars: GetPriceHistoryVariables = {
    emojiId: ..., 
    limit: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPriceHistory(getPriceHistoryVars);
  // Variables can be defined inline as well.
  const query = useGetPriceHistory({ emojiId: ..., limit: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPriceHistory(dataConnect, getPriceHistoryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPriceHistory(getPriceHistoryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPriceHistory(dataConnect, getPriceHistoryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.priceHistories);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEmojiWhaleStats
You can execute the `GetEmojiWhaleStats` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEmojiWhaleStats(dc: DataConnect, options?: useDataConnectQueryOptions<GetEmojiWhaleStatsData>): UseDataConnectQueryResult<GetEmojiWhaleStatsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEmojiWhaleStats(options?: useDataConnectQueryOptions<GetEmojiWhaleStatsData>): UseDataConnectQueryResult<GetEmojiWhaleStatsData, undefined>;
```

### Variables
The `GetEmojiWhaleStats` Query has no variables.
### Return Type
Recall that calling the `GetEmojiWhaleStats` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEmojiWhaleStats` Query is of type `GetEmojiWhaleStatsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEmojiWhaleStats`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetEmojiWhaleStats } from '@dataconnect/generated/react'

export default function GetEmojiWhaleStatsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEmojiWhaleStats();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEmojiWhaleStats(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEmojiWhaleStats(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEmojiWhaleStats(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.emojiWhaleStats);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEmojiHistoryStats
You can execute the `GetEmojiHistoryStats` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEmojiHistoryStats(dc: DataConnect, vars: GetEmojiHistoryStatsVariables, options?: useDataConnectQueryOptions<GetEmojiHistoryStatsData>): UseDataConnectQueryResult<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEmojiHistoryStats(vars: GetEmojiHistoryStatsVariables, options?: useDataConnectQueryOptions<GetEmojiHistoryStatsData>): UseDataConnectQueryResult<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
```

### Variables
The `GetEmojiHistoryStats` Query requires an argument of type `GetEmojiHistoryStatsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEmojiHistoryStatsVariables {
  emojiId: UUIDString;
}
```
### Return Type
Recall that calling the `GetEmojiHistoryStats` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEmojiHistoryStats` Query is of type `GetEmojiHistoryStatsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetEmojiHistoryStatsData {
  emojiHistoryStats: ({
    price?: number | null;
    movingAverage?: number | null;
    recordedAt?: TimestampString | null;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEmojiHistoryStats`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEmojiHistoryStatsVariables } from '@dataconnect/generated';
import { useGetEmojiHistoryStats } from '@dataconnect/generated/react'

export default function GetEmojiHistoryStatsComponent() {
  // The `useGetEmojiHistoryStats` Query hook requires an argument of type `GetEmojiHistoryStatsVariables`:
  const getEmojiHistoryStatsVars: GetEmojiHistoryStatsVariables = {
    emojiId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEmojiHistoryStats(getEmojiHistoryStatsVars);
  // Variables can be defined inline as well.
  const query = useGetEmojiHistoryStats({ emojiId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEmojiHistoryStats(dataConnect, getEmojiHistoryStatsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEmojiHistoryStats(getEmojiHistoryStatsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEmojiHistoryStats(dataConnect, getEmojiHistoryStatsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.emojiHistoryStats);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTopTraders
You can execute the `GetTopTraders` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTopTraders(dc: DataConnect, options?: useDataConnectQueryOptions<GetTopTradersData>): UseDataConnectQueryResult<GetTopTradersData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTopTraders(options?: useDataConnectQueryOptions<GetTopTradersData>): UseDataConnectQueryResult<GetTopTradersData, undefined>;
```

### Variables
The `GetTopTraders` Query has no variables.
### Return Type
Recall that calling the `GetTopTraders` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTopTraders` Query is of type `GetTopTradersData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTopTraders`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetTopTraders } from '@dataconnect/generated/react'

export default function GetTopTradersComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTopTraders();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTopTraders(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTopTraders(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTopTraders(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.topTraders);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetChronologicalTicker
You can execute the `GetChronologicalTicker` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetChronologicalTicker(dc: DataConnect, options?: useDataConnectQueryOptions<GetChronologicalTickerData>): UseDataConnectQueryResult<GetChronologicalTickerData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetChronologicalTicker(options?: useDataConnectQueryOptions<GetChronologicalTickerData>): UseDataConnectQueryResult<GetChronologicalTickerData, undefined>;
```

### Variables
The `GetChronologicalTicker` Query has no variables.
### Return Type
Recall that calling the `GetChronologicalTicker` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetChronologicalTicker` Query is of type `GetChronologicalTickerData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetChronologicalTicker`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetChronologicalTicker } from '@dataconnect/generated/react'

export default function GetChronologicalTickerComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetChronologicalTicker();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetChronologicalTicker(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetChronologicalTicker(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetChronologicalTicker(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.tickerFeeds);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEmojiSparklines
You can execute the `GetEmojiSparklines` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEmojiSparklines(dc: DataConnect, options?: useDataConnectQueryOptions<GetEmojiSparklinesData>): UseDataConnectQueryResult<GetEmojiSparklinesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEmojiSparklines(options?: useDataConnectQueryOptions<GetEmojiSparklinesData>): UseDataConnectQueryResult<GetEmojiSparklinesData, undefined>;
```

### Variables
The `GetEmojiSparklines` Query has no variables.
### Return Type
Recall that calling the `GetEmojiSparklines` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEmojiSparklines` Query is of type `GetEmojiSparklinesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetEmojiSparklinesData {
  emojiSparklines: ({
    emojiId?: UUIDString | null;
    price?: number | null;
    recordedAt?: TimestampString | null;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEmojiSparklines`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetEmojiSparklines } from '@dataconnect/generated/react'

export default function GetEmojiSparklinesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEmojiSparklines();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEmojiSparklines(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEmojiSparklines(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEmojiSparklines(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.emojiSparklines);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SearchEmojis
You can execute the `SearchEmojis` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useSearchEmojis(dc: DataConnect, vars?: SearchEmojisVariables, options?: useDataConnectQueryOptions<SearchEmojisData>): UseDataConnectQueryResult<SearchEmojisData, SearchEmojisVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useSearchEmojis(vars?: SearchEmojisVariables, options?: useDataConnectQueryOptions<SearchEmojisData>): UseDataConnectQueryResult<SearchEmojisData, SearchEmojisVariables>;
```

### Variables
The `SearchEmojis` Query has an optional argument of type `SearchEmojisVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SearchEmojisVariables {
  query?: string | null;
}
```
### Return Type
Recall that calling the `SearchEmojis` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `SearchEmojis` Query is of type `SearchEmojisData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `SearchEmojis`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SearchEmojisVariables } from '@dataconnect/generated';
import { useSearchEmojis } from '@dataconnect/generated/react'

export default function SearchEmojisComponent() {
  // The `useSearchEmojis` Query hook has an optional argument of type `SearchEmojisVariables`:
  const searchEmojisVars: SearchEmojisVariables = {
    query: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useSearchEmojis(searchEmojisVars);
  // Variables can be defined inline as well.
  const query = useSearchEmojis({ query: ..., });
  // Since all variables are optional for this Query, you can omit the `SearchEmojisVariables` argument.
  // (as long as you don't want to provide any `options`!)
  const query = useSearchEmojis();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useSearchEmojis(dataConnect, searchEmojisVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useSearchEmojis(searchEmojisVars, options);
  // If you'd like to provide options without providing any variables, you must
  // pass `undefined` where you would normally pass the variables.
  const query = useSearchEmojis(undefined, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useSearchEmojis(dataConnect, searchEmojisVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.emojis_search);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

No Mutations were generated for the `friendly-exchange` connector.

If you want to learn more about how to use Mutations in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

