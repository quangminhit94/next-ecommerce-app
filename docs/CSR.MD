# CSR - Client Side Rendering

1. dynamic ssr=false

- You may not always want to include a module on server-side. For example, when the module includes a
  library that only works in the browser.

```js
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/hello3'),
  { ssr: false }
)
function Home() {
  return (
    <div>
      <Header />
      <DynamicComponentWithNoSSR />
      <p>HOME PAGE is here!</p>
    </div>
  )
}
export default Home
```

2. SSG + Data fetching on client side

