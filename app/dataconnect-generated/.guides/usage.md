# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useUpsertUser, useUpdateUserRole, useUpdateUserLocation, useTriggerEvent, useMarketMakerTrade, useBuyStock, useSellStock, useGetDashboardData, useGetUserProfile, useGetPriceHistory } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useUpsertUser(upsertUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUserRole(updateUserRoleVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUserLocation(updateUserLocationVars);

const { data, isPending, isSuccess, isError, error } = useTriggerEvent(triggerEventVars);

const { data, isPending, isSuccess, isError, error } = useMarketMakerTrade(marketMakerTradeVars);

const { data, isPending, isSuccess, isError, error } = useBuyStock(buyStockVars);

const { data, isPending, isSuccess, isError, error } = useSellStock(sellStockVars);

const { data, isPending, isSuccess, isError, error } = useGetDashboardData();

const { data, isPending, isSuccess, isError, error } = useGetUserProfile();

const { data, isPending, isSuccess, isError, error } = useGetPriceHistory(getPriceHistoryVars);

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
import { upsertUser, updateUserRole, updateUserLocation, triggerEvent, marketMakerTrade, buyStock, sellStock, getDashboardData, getUserProfile, getPriceHistory } from '@dataconnect/generated';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation UpdateUserRole:  For variables, look at type UpdateUserRoleVars in ../index.d.ts
const { data } = await UpdateUserRole(dataConnect, updateUserRoleVars);

// Operation UpdateUserLocation:  For variables, look at type UpdateUserLocationVars in ../index.d.ts
const { data } = await UpdateUserLocation(dataConnect, updateUserLocationVars);

// Operation TriggerEvent:  For variables, look at type TriggerEventVars in ../index.d.ts
const { data } = await TriggerEvent(dataConnect, triggerEventVars);

// Operation MarketMakerTrade:  For variables, look at type MarketMakerTradeVars in ../index.d.ts
const { data } = await MarketMakerTrade(dataConnect, marketMakerTradeVars);

// Operation BuyStock:  For variables, look at type BuyStockVars in ../index.d.ts
const { data } = await BuyStock(dataConnect, buyStockVars);

// Operation SellStock:  For variables, look at type SellStockVars in ../index.d.ts
const { data } = await SellStock(dataConnect, sellStockVars);

// Operation GetDashboardData: 
const { data } = await GetDashboardData(dataConnect);

// Operation GetUserProfile: 
const { data } = await GetUserProfile(dataConnect);

// Operation GetPriceHistory:  For variables, look at type GetPriceHistoryVars in ../index.d.ts
const { data } = await GetPriceHistory(dataConnect, getPriceHistoryVars);


```