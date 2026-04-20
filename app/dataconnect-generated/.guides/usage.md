# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetDashboardData, useGetUserProfile, useGetPriceHistory, useGetEmojiWhaleStats, useGetEmojiHistoryStats, useGetTopTraders, useGetChronologicalTicker, useGetEmojiSparklines, useSearchEmojis } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetDashboardData();

const { data, isPending, isSuccess, isError, error } = useGetUserProfile();

const { data, isPending, isSuccess, isError, error } = useGetPriceHistory(getPriceHistoryVars);

const { data, isPending, isSuccess, isError, error } = useGetEmojiWhaleStats();

const { data, isPending, isSuccess, isError, error } = useGetEmojiHistoryStats(getEmojiHistoryStatsVars);

const { data, isPending, isSuccess, isError, error } = useGetTopTraders();

const { data, isPending, isSuccess, isError, error } = useGetChronologicalTicker();

const { data, isPending, isSuccess, isError, error } = useGetEmojiSparklines();

const { data, isPending, isSuccess, isError, error } = useSearchEmojis(searchEmojisVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getDashboardData, getUserProfile, getPriceHistory, getEmojiWhaleStats, getEmojiHistoryStats, getTopTraders, getChronologicalTicker, getEmojiSparklines, searchEmojis } from '@dataconnect/generated';


// Operation GetDashboardData: 
const { data } = await GetDashboardData(dataConnect);

// Operation GetUserProfile: 
const { data } = await GetUserProfile(dataConnect);

// Operation GetPriceHistory:  For variables, look at type GetPriceHistoryVars in ../index.d.ts
const { data } = await GetPriceHistory(dataConnect, getPriceHistoryVars);

// Operation GetEmojiWhaleStats: 
const { data } = await GetEmojiWhaleStats(dataConnect);

// Operation GetEmojiHistoryStats:  For variables, look at type GetEmojiHistoryStatsVars in ../index.d.ts
const { data } = await GetEmojiHistoryStats(dataConnect, getEmojiHistoryStatsVars);

// Operation GetTopTraders: 
const { data } = await GetTopTraders(dataConnect);

// Operation GetChronologicalTicker: 
const { data } = await GetChronologicalTicker(dataConnect);

// Operation GetEmojiSparklines: 
const { data } = await GetEmojiSparklines(dataConnect);

// Operation SearchEmojis:  For variables, look at type SearchEmojisVars in ../index.d.ts
const { data } = await SearchEmojis(dataConnect, searchEmojisVars);


```