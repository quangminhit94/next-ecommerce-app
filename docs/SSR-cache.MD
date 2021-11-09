# Server Side Rendering with cache
## Using s-maxage=5
- Keep the page FRESH in 5 seconds, after that call getServerSideProps again on page request.

```js
export async function getServerSideProps(context) {
  context.res.setHeader('Cache-Control', 's-maxage=5')
// ...
}
```

- request 1: call getServerSideProps() and cache in CDN
- next 0-5s: return from cache immediately
- then: call getServerSideProps() and cache in CDN
- next 0-5s: return from cache immediately
- then: ...

## Using s-maxage=5 and stale-while-revalidate
- Keep the page FRESH for 5 seconds.
- Then on page request, return the stale data immediately and call getServerSideProps() to have new
cache.

```js
export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    's-maxage=5, stale-while-revalidate'
  )
// ...
}
```

- request 1: call getServerSideProps() and cache in CDN
- next 0-5s (s-maxage): return from cache immediately
- after that (swr): return from cache immediately (stale), then call getServerSideProps()
- once new cache is set: start a new cycle (cache 5s and start the swr on the next request)

## Using s-maxage=5 and stale-while-revalidate=5

```js
export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    's-maxage=5, stale-while-revalidate=5'
  )
// ...
}

```

- first request: call getServerSideProps() and cache in CDN
- next 0-5s (s-maxage): return from cache immediately
- next 0-5s (swr): return from cache immediately (stale), then call getServerSideProps()
- once new cache is set: start a new life cycle (0 -> 10s)

