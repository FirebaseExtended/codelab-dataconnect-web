#  Generated TypeScript README
This README will guide you through the process of using the generated TypeScript SDK package for the connector `movie-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@movie/dataconnect` as shown below. Both CommonJS and ESM imports are supported.
You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of queries and mutations. One SDK is generated for each connector - this SDK is generated for the connector `movie-connector`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

In order to call Data Connect queries and mutations, you need to create an instance of the connector in your application code.

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@movie/dataconnect';

const connector: DataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```javascript
// add connectDataConnectEmulator to your imports 
import { connectDataConnectEmulator, getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@movie/dataconnect';

const connector: DataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(connector, 'localhost', 9399);
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
- Both functions can be called with or without passing in a `DataConnect` instance as an argument

Below are examples of how to use the `movie-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMovies
You can execute the `ListMovies` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
listMovies(vars?: ListMoviesVariables): QueryPromise<ListMoviesData, ListMoviesVariables>;

listMoviesRef(vars?: ListMoviesVariables): QueryRef<ListMoviesData, ListMoviesVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
listMovies(dc: DataConnect, vars?: ListMoviesVariables): QueryPromise<ListMoviesData, ListMoviesVariables>;

listMoviesRef(dc: DataConnect, vars?: ListMoviesVariables): QueryRef<ListMoviesData, ListMoviesVariables>;
```

### Variables
The `ListMovies` query has an optional argument of type `ListMoviesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface ListMoviesVariables {
  orderByRating?: OrderDirection | null;
  orderByReleaseYear?: OrderDirection | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListMovies` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `ListMoviesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface ListMoviesData {
  movies: ({
    id: UUIDString;
    title: string;
    imageUrl: string;
    releaseYear?: number | null;
    genre?: string | null;
    rating?: number | null;
    tags?: string[] | null;
    description?: string | null;
  } & Movie_Key)[];
}
```
### Using `ListMovies`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, listMovies, ListMoviesVariables } from '@movie/dataconnect';
// The `ListMovies` query has an optional argument of type `ListMoviesVariables`:
const listMoviesVars: ListMoviesVariables = {
  orderByRating: ..., // optional
  orderByReleaseYear: ..., // optional
  limit: ..., // optional
}

// Call the `listMovies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMovies(listMoviesVars);
// Variables can be defined inline as well.
const { data } = await listMovies({ orderByRating: ..., orderByReleaseYear: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMoviesVariables` argument.
const { data } = await listMovies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await listMovies(connector, listMoviesVars);

console.log(data.movies);

// Or, you can use the `Promise` API.
listMovies(listMoviesVars).then((response) => {
  const data = response.data;
  console.log(data.movies);
});
```

### Using `ListMovies`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMoviesRef, ListMoviesVariables } from '@movie/dataconnect';
// The `ListMovies` query has an optional argument of type `ListMoviesVariables`:
const listMoviesVars: ListMoviesVariables = {
  orderByRating: ..., // optional
  orderByReleaseYear: ..., // optional
  limit: ..., // optional
}

// Call the `listMoviesRef()` function to get a reference to the query.
const ref = listMoviesRef(listMoviesVars);
// Variables can be defined inline as well.
const ref = listMoviesRef({ orderByRating: ..., orderByReleaseYear: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMoviesVariables` argument.
const ref = listMoviesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = listMoviesRef(connector, listMoviesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movies);
});
```

## GetMovieById
You can execute the `GetMovieById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
getMovieById(vars: GetMovieByIdVariables): QueryPromise<GetMovieByIdData, GetMovieByIdVariables>;

getMovieByIdRef(vars: GetMovieByIdVariables): QueryRef<GetMovieByIdData, GetMovieByIdVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
getMovieById(dc: DataConnect, vars: GetMovieByIdVariables): QueryPromise<GetMovieByIdData, GetMovieByIdVariables>;

getMovieByIdRef(dc: DataConnect, vars: GetMovieByIdVariables): QueryRef<GetMovieByIdData, GetMovieByIdVariables>;
```

### Variables
The `GetMovieById` query requires an argument of type `GetMovieByIdVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface GetMovieByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMovieById` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `GetMovieByIdData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface GetMovieByIdData {
  movie?: {
    id: UUIDString;
    title: string;
    imageUrl: string;
    releaseYear?: number | null;
    genre?: string | null;
    rating?: number | null;
    description?: string | null;
    tags?: string[] | null;
    metadata: ({
      director?: string | null;
    })[];
      mainActors: ({
        id: UUIDString;
        name: string;
        imageUrl: string;
      } & Actor_Key)[];
        supportingActors: ({
          id: UUIDString;
          name: string;
          imageUrl: string;
        } & Actor_Key)[];
          reviews: ({
            id: UUIDString;
            reviewText?: string | null;
            reviewDate: DateString;
            rating?: number | null;
            user: {
              id: string;
              username: string;
            } & User_Key;
          })[];
  } & Movie_Key;
}
```
### Using `GetMovieById`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, getMovieById, GetMovieByIdVariables } from '@movie/dataconnect';
// The `GetMovieById` query requires an argument of type `GetMovieByIdVariables`:
const getMovieByIdVars: GetMovieByIdVariables = {
  id: ..., 
}

// Call the `getMovieById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMovieById(getMovieByIdVars);
// Variables can be defined inline as well.
const { data } = await getMovieById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await getMovieById(connector, getMovieByIdVars);

console.log(data.movie);

// Or, you can use the `Promise` API.
getMovieById(getMovieByIdVars).then((response) => {
  const data = response.data;
  console.log(data.movie);
});
```

### Using `GetMovieById`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMovieByIdRef, GetMovieByIdVariables } from '@movie/dataconnect';
// The `GetMovieById` query requires an argument of type `GetMovieByIdVariables`:
const getMovieByIdVars: GetMovieByIdVariables = {
  id: ..., 
}

// Call the `getMovieByIdRef()` function to get a reference to the query.
const ref = getMovieByIdRef(getMovieByIdVars);
// Variables can be defined inline as well.
const ref = getMovieByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = getMovieByIdRef(connector, getMovieByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movie);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movie);
});
```

## GetActorById
You can execute the `GetActorById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
getActorById(vars: GetActorByIdVariables): QueryPromise<GetActorByIdData, GetActorByIdVariables>;

getActorByIdRef(vars: GetActorByIdVariables): QueryRef<GetActorByIdData, GetActorByIdVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
getActorById(dc: DataConnect, vars: GetActorByIdVariables): QueryPromise<GetActorByIdData, GetActorByIdVariables>;

getActorByIdRef(dc: DataConnect, vars: GetActorByIdVariables): QueryRef<GetActorByIdData, GetActorByIdVariables>;
```

### Variables
The `GetActorById` query requires an argument of type `GetActorByIdVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface GetActorByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetActorById` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `GetActorByIdData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface GetActorByIdData {
  actor?: {
    id: UUIDString;
    name: string;
    imageUrl: string;
    mainActors: ({
      id: UUIDString;
      title: string;
      genre?: string | null;
      tags?: string[] | null;
      imageUrl: string;
    } & Movie_Key)[];
      supportingActors: ({
        id: UUIDString;
        title: string;
        genre?: string | null;
        tags?: string[] | null;
        imageUrl: string;
      } & Movie_Key)[];
  } & Actor_Key;
}
```
### Using `GetActorById`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, getActorById, GetActorByIdVariables } from '@movie/dataconnect';
// The `GetActorById` query requires an argument of type `GetActorByIdVariables`:
const getActorByIdVars: GetActorByIdVariables = {
  id: ..., 
}

// Call the `getActorById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getActorById(getActorByIdVars);
// Variables can be defined inline as well.
const { data } = await getActorById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await getActorById(connector, getActorByIdVars);

console.log(data.actor);

// Or, you can use the `Promise` API.
getActorById(getActorByIdVars).then((response) => {
  const data = response.data;
  console.log(data.actor);
});
```

### Using `GetActorById`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getActorByIdRef, GetActorByIdVariables } from '@movie/dataconnect';
// The `GetActorById` query requires an argument of type `GetActorByIdVariables`:
const getActorByIdVars: GetActorByIdVariables = {
  id: ..., 
}

// Call the `getActorByIdRef()` function to get a reference to the query.
const ref = getActorByIdRef(getActorByIdVars);
// Variables can be defined inline as well.
const ref = getActorByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = getActorByIdRef(connector, getActorByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.actor);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.actor);
});
```

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;

getCurrentUserRef(): QueryRef<GetCurrentUserData, undefined>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

getCurrentUserRef(dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface GetCurrentUserData {
  user?: {
    id: string;
    username: string;
    reviews: ({
      id: UUIDString;
      rating?: number | null;
      reviewDate: DateString;
      reviewText?: string | null;
      movie: {
        id: UUIDString;
        title: string;
      } & Movie_Key;
    })[];
      favoriteMovies: ({
        movie: {
          id: UUIDString;
          title: string;
          genre?: string | null;
          imageUrl: string;
          releaseYear?: number | null;
          rating?: number | null;
          description?: string | null;
          tags?: string[] | null;
          metadata: ({
            director?: string | null;
          })[];
        } & Movie_Key;
      })[];
  } & User_Key;
}
```
### Using `GetCurrentUser`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@movie/dataconnect';

// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(connector);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@movie/dataconnect';

// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(connector);

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

## GetIfFavoritedMovie
You can execute the `GetIfFavoritedMovie` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
getIfFavoritedMovie(vars: GetIfFavoritedMovieVariables): QueryPromise<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;

getIfFavoritedMovieRef(vars: GetIfFavoritedMovieVariables): QueryRef<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
getIfFavoritedMovie(dc: DataConnect, vars: GetIfFavoritedMovieVariables): QueryPromise<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;

getIfFavoritedMovieRef(dc: DataConnect, vars: GetIfFavoritedMovieVariables): QueryRef<GetIfFavoritedMovieData, GetIfFavoritedMovieVariables>;
```

### Variables
The `GetIfFavoritedMovie` query requires an argument of type `GetIfFavoritedMovieVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface GetIfFavoritedMovieVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `GetIfFavoritedMovie` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `GetIfFavoritedMovieData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface GetIfFavoritedMovieData {
  favorite_movie?: {
    movieId: UUIDString;
  };
}
```
### Using `GetIfFavoritedMovie`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, getIfFavoritedMovie, GetIfFavoritedMovieVariables } from '@movie/dataconnect';
// The `GetIfFavoritedMovie` query requires an argument of type `GetIfFavoritedMovieVariables`:
const getIfFavoritedMovieVars: GetIfFavoritedMovieVariables = {
  movieId: ..., 
}

// Call the `getIfFavoritedMovie()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getIfFavoritedMovie(getIfFavoritedMovieVars);
// Variables can be defined inline as well.
const { data } = await getIfFavoritedMovie({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await getIfFavoritedMovie(connector, getIfFavoritedMovieVars);

console.log(data.favorite_movie);

// Or, you can use the `Promise` API.
getIfFavoritedMovie(getIfFavoritedMovieVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie);
});
```

### Using `GetIfFavoritedMovie`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getIfFavoritedMovieRef, GetIfFavoritedMovieVariables } from '@movie/dataconnect';
// The `GetIfFavoritedMovie` query requires an argument of type `GetIfFavoritedMovieVariables`:
const getIfFavoritedMovieVars: GetIfFavoritedMovieVariables = {
  movieId: ..., 
}

// Call the `getIfFavoritedMovieRef()` function to get a reference to the query.
const ref = getIfFavoritedMovieRef(getIfFavoritedMovieVars);
// Variables can be defined inline as well.
const ref = getIfFavoritedMovieRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = getIfFavoritedMovieRef(connector, getIfFavoritedMovieVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.favorite_movie);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie);
});
```

## SearchAll
You can execute the `SearchAll` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
searchAll(vars: SearchAllVariables): QueryPromise<SearchAllData, SearchAllVariables>;

searchAllRef(vars: SearchAllVariables): QueryRef<SearchAllData, SearchAllVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
searchAll(dc: DataConnect, vars: SearchAllVariables): QueryPromise<SearchAllData, SearchAllVariables>;

searchAllRef(dc: DataConnect, vars: SearchAllVariables): QueryRef<SearchAllData, SearchAllVariables>;
```

### Variables
The `SearchAll` query requires an argument of type `SearchAllVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface SearchAllVariables {
  input?: string | null;
  minYear: number;
  maxYear: number;
  minRating: number;
  maxRating: number;
  genre: string;
}
```
### Return Type
Recall that executing the `SearchAll` query returns a `QueryPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `SearchAllData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface SearchAllData {
  moviesMatchingTitle: ({
    id: UUIDString;
    title: string;
    genre?: string | null;
    rating?: number | null;
    imageUrl: string;
    tags?: string[] | null;
  } & Movie_Key)[];
    moviesMatchingDescription: ({
      id: UUIDString;
      title: string;
      genre?: string | null;
      rating?: number | null;
      imageUrl: string;
      tags?: string[] | null;
    } & Movie_Key)[];
      actorsMatchingName: ({
        id: UUIDString;
        name: string;
        imageUrl: string;
      } & Actor_Key)[];
        reviewsMatchingText: ({
          id: UUIDString;
          rating?: number | null;
          reviewText?: string | null;
          reviewDate: DateString;
          movie: {
            id: UUIDString;
            title: string;
          } & Movie_Key;
            user: {
              id: string;
              username: string;
            } & User_Key;
        })[];
}
```
### Using `SearchAll`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, searchAll, SearchAllVariables } from '@movie/dataconnect';
// The `SearchAll` query requires an argument of type `SearchAllVariables`:
const searchAllVars: SearchAllVariables = {
  input: ..., // optional
  minYear: ..., 
  maxYear: ..., 
  minRating: ..., 
  maxRating: ..., 
  genre: ..., 
}

// Call the `searchAll()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchAll(searchAllVars);
// Variables can be defined inline as well.
const { data } = await searchAll({ input: ..., minYear: ..., maxYear: ..., minRating: ..., maxRating: ..., genre: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await searchAll(connector, searchAllVars);

console.log(data.moviesMatchingTitle);
console.log(data.moviesMatchingDescription);
console.log(data.actorsMatchingName);
console.log(data.reviewsMatchingText);

// Or, you can use the `Promise` API.
searchAll(searchAllVars).then((response) => {
  const data = response.data;
  console.log(data.moviesMatchingTitle);
  console.log(data.moviesMatchingDescription);
  console.log(data.actorsMatchingName);
  console.log(data.reviewsMatchingText);
});
```

### Using `SearchAll`'s `QueryRef` function

```javascript
import { getDataConnect, DataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchAllRef, SearchAllVariables } from '@movie/dataconnect';
// The `SearchAll` query requires an argument of type `SearchAllVariables`:
const searchAllVars: SearchAllVariables = {
  input: ..., // optional
  minYear: ..., 
  maxYear: ..., 
  minRating: ..., 
  maxRating: ..., 
  genre: ..., 
}

// Call the `searchAllRef()` function to get a reference to the query.
const ref = searchAllRef(searchAllVars);
// Variables can be defined inline as well.
const ref = searchAllRef({ input: ..., minYear: ..., maxYear: ..., minRating: ..., maxRating: ..., genre: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = searchAllRef(connector, searchAllVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.moviesMatchingTitle);
console.log(data.moviesMatchingDescription);
console.log(data.actorsMatchingName);
console.log(data.reviewsMatchingText);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.moviesMatchingTitle);
  console.log(data.moviesMatchingDescription);
  console.log(data.actorsMatchingName);
  console.log(data.reviewsMatchingText);
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
- Both functions can be called with or without passing in a `DataConnect` instance as an argument

Below are examples of how to use the `movie-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

upsertUserRef(vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

upsertUserRef(dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface UpsertUserVariables {
  username: string;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@movie/dataconnect';
// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
}

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ username: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(connector, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```javascript
import { getDataConnect, DataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@movie/dataconnect';
// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
}

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ username: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(connector, upsertUserVars);

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

## AddFavoritedMovie
You can execute the `AddFavoritedMovie` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
addFavoritedMovie(vars: AddFavoritedMovieVariables): MutationPromise<AddFavoritedMovieData, AddFavoritedMovieVariables>;

addFavoritedMovieRef(vars: AddFavoritedMovieVariables): MutationRef<AddFavoritedMovieData, AddFavoritedMovieVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
addFavoritedMovie(dc: DataConnect, vars: AddFavoritedMovieVariables): MutationPromise<AddFavoritedMovieData, AddFavoritedMovieVariables>;

addFavoritedMovieRef(dc: DataConnect, vars: AddFavoritedMovieVariables): MutationRef<AddFavoritedMovieData, AddFavoritedMovieVariables>;
```

### Variables
The `AddFavoritedMovie` mutation requires an argument of type `AddFavoritedMovieVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface AddFavoritedMovieVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `AddFavoritedMovie` mutation returns a `MutationPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `AddFavoritedMovieData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface AddFavoritedMovieData {
  favorite_movie_upsert: FavoriteMovie_Key;
}
```
### Using `AddFavoritedMovie`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, addFavoritedMovie, AddFavoritedMovieVariables } from '@movie/dataconnect';
// The `AddFavoritedMovie` mutation requires an argument of type `AddFavoritedMovieVariables`:
const addFavoritedMovieVars: AddFavoritedMovieVariables = {
  movieId: ..., 
}

// Call the `addFavoritedMovie()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addFavoritedMovie(addFavoritedMovieVars);
// Variables can be defined inline as well.
const { data } = await addFavoritedMovie({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await addFavoritedMovie(connector, addFavoritedMovieVars);

console.log(data.favorite_movie_upsert);

// Or, you can use the `Promise` API.
addFavoritedMovie(addFavoritedMovieVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_upsert);
});
```

### Using `AddFavoritedMovie`'s `MutationRef` function

```javascript
import { getDataConnect, DataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addFavoritedMovieRef, AddFavoritedMovieVariables } from '@movie/dataconnect';
// The `AddFavoritedMovie` mutation requires an argument of type `AddFavoritedMovieVariables`:
const addFavoritedMovieVars: AddFavoritedMovieVariables = {
  movieId: ..., 
}

// Call the `addFavoritedMovieRef()` function to get a reference to the mutation.
const ref = addFavoritedMovieRef(addFavoritedMovieVars);
// Variables can be defined inline as well.
const ref = addFavoritedMovieRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = addFavoritedMovieRef(connector, addFavoritedMovieVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favorite_movie_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_upsert);
});
```

## DeleteFavoritedMovie
You can execute the `DeleteFavoritedMovie` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
deleteFavoritedMovie(vars: DeleteFavoritedMovieVariables): MutationPromise<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;

deleteFavoritedMovieRef(vars: DeleteFavoritedMovieVariables): MutationRef<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
deleteFavoritedMovie(dc: DataConnect, vars: DeleteFavoritedMovieVariables): MutationPromise<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;

deleteFavoritedMovieRef(dc: DataConnect, vars: DeleteFavoritedMovieVariables): MutationRef<DeleteFavoritedMovieData, DeleteFavoritedMovieVariables>;
```

### Variables
The `DeleteFavoritedMovie` mutation requires an argument of type `DeleteFavoritedMovieVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface DeleteFavoritedMovieVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFavoritedMovie` mutation returns a `MutationPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `DeleteFavoritedMovieData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface DeleteFavoritedMovieData {
  favorite_movie_delete?: FavoriteMovie_Key | null;
}
```
### Using `DeleteFavoritedMovie`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFavoritedMovie, DeleteFavoritedMovieVariables } from '@movie/dataconnect';
// The `DeleteFavoritedMovie` mutation requires an argument of type `DeleteFavoritedMovieVariables`:
const deleteFavoritedMovieVars: DeleteFavoritedMovieVariables = {
  movieId: ..., 
}

// Call the `deleteFavoritedMovie()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFavoritedMovie(deleteFavoritedMovieVars);
// Variables can be defined inline as well.
const { data } = await deleteFavoritedMovie({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFavoritedMovie(connector, deleteFavoritedMovieVars);

console.log(data.favorite_movie_delete);

// Or, you can use the `Promise` API.
deleteFavoritedMovie(deleteFavoritedMovieVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_delete);
});
```

### Using `DeleteFavoritedMovie`'s `MutationRef` function

```javascript
import { getDataConnect, DataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFavoritedMovieRef, DeleteFavoritedMovieVariables } from '@movie/dataconnect';
// The `DeleteFavoritedMovie` mutation requires an argument of type `DeleteFavoritedMovieVariables`:
const deleteFavoritedMovieVars: DeleteFavoritedMovieVariables = {
  movieId: ..., 
}

// Call the `deleteFavoritedMovieRef()` function to get a reference to the mutation.
const ref = deleteFavoritedMovieRef(deleteFavoritedMovieVars);
// Variables can be defined inline as well.
const ref = deleteFavoritedMovieRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = deleteFavoritedMovieRef(connector, deleteFavoritedMovieVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favorite_movie_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_movie_delete);
});
```

## AddReview
You can execute the `AddReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
addReview(vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

addReviewRef(vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
addReview(dc: DataConnect, vars: AddReviewVariables): MutationPromise<AddReviewData, AddReviewVariables>;

addReviewRef(dc: DataConnect, vars: AddReviewVariables): MutationRef<AddReviewData, AddReviewVariables>;
```

### Variables
The `AddReview` mutation requires an argument of type `AddReviewVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface AddReviewVariables {
  movieId: UUIDString;
  rating: number;
  reviewText: string;
}
```
### Return Type
Recall that executing the `AddReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `AddReviewData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface AddReviewData {
  review_insert: Review_Key;
}
```
### Using `AddReview`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, addReview, AddReviewVariables } from '@movie/dataconnect';
// The `AddReview` mutation requires an argument of type `AddReviewVariables`:
const addReviewVars: AddReviewVariables = {
  movieId: ..., 
  rating: ..., 
  reviewText: ..., 
}

// Call the `addReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addReview(addReviewVars);
// Variables can be defined inline as well.
const { data } = await addReview({ movieId: ..., rating: ..., reviewText: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await addReview(connector, addReviewVars);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
addReview(addReviewVars).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

### Using `AddReview`'s `MutationRef` function

```javascript
import { getDataConnect, DataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addReviewRef, AddReviewVariables } from '@movie/dataconnect';
// The `AddReview` mutation requires an argument of type `AddReviewVariables`:
const addReviewVars: AddReviewVariables = {
  movieId: ..., 
  rating: ..., 
  reviewText: ..., 
}

// Call the `addReviewRef()` function to get a reference to the mutation.
const ref = addReviewRef(addReviewVars);
// Variables can be defined inline as well.
const ref = addReviewRef({ movieId: ..., rating: ..., reviewText: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = addReviewRef(connector, addReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

## DeleteReview
You can execute the `DeleteReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```javascript
deleteReview(vars: DeleteReviewVariables): MutationPromise<DeleteReviewData, DeleteReviewVariables>;

deleteReviewRef(vars: DeleteReviewVariables): MutationRef<DeleteReviewData, DeleteReviewVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
deleteReview(dc: DataConnect, vars: DeleteReviewVariables): MutationPromise<DeleteReviewData, DeleteReviewVariables>;

deleteReviewRef(dc: DataConnect, vars: DeleteReviewVariables): MutationRef<DeleteReviewData, DeleteReviewVariables>;
```

### Variables
The `DeleteReview` mutation requires an argument of type `DeleteReviewVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface DeleteReviewVariables {
  movieId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property. 

The `data` property is an object of type `DeleteReviewData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface DeleteReviewData {
  review_delete?: Review_Key | null;
}
```
### Using `DeleteReview`'s action shortcut function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteReview, DeleteReviewVariables } from '@movie/dataconnect';
// The `DeleteReview` mutation requires an argument of type `DeleteReviewVariables`:
const deleteReviewVars: DeleteReviewVariables = {
  movieId: ..., 
}

// Call the `deleteReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteReview(deleteReviewVars);
// Variables can be defined inline as well.
const { data } = await deleteReview({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const connector: DataConnect = getDataConnect(connectorConfig);
const { data } = await deleteReview(connector, deleteReviewVars);

console.log(data.review_delete);

// Or, you can use the `Promise` API.
deleteReview(deleteReviewVars).then((response) => {
  const data = response.data;
  console.log(data.review_delete);
});
```

### Using `DeleteReview`'s `MutationRef` function

```javascript
import { getDataConnect, DataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteReviewRef, DeleteReviewVariables } from '@movie/dataconnect';
// The `DeleteReview` mutation requires an argument of type `DeleteReviewVariables`:
const deleteReviewVars: DeleteReviewVariables = {
  movieId: ..., 
}

// Call the `deleteReviewRef()` function to get a reference to the mutation.
const ref = deleteReviewRef(deleteReviewVars);
// Variables can be defined inline as well.
const ref = deleteReviewRef({ movieId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const connector: DataConnect = getDataConnect(connectorConfig);
const ref = deleteReviewRef(connector, deleteReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_delete);
});
```

