## Demo Animal Shelter

### Basic Commands

- `yarn dev`: Run the development server
- `yarn build`: Build the static site
  > Original script:
  >
  > ```
  >  "build": "next build"
  > ```
- `yarn run`: Run the server

### [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)

- `yarn build`: builds an HTML version of the site
  > Altered script:
  >
  > ```
  >  "build": "next build && next export"
  > ```

#### Unsupoorted Features

- Image Optimization (default loader)
- Internationalized Routing
- API Routes
- Rewrites
- Redirects
- Headers
- Middleware
- Incremental Static Regeneration
- fallback: true
- getServerSideProps

### Image Optimization

We cannot use the default loader for images.

- use img
- use another loader
- other options like [next-optimized-images](https://www.npmjs.com/package/next-optimized-images#example)

## DISCLAIMER

STATIC HTML EXPORT WORKS QUITE BADLY.
