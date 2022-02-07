# Next Js

## [Tutorial](https://nextjs.org/learn/basics/create-nextjs-app

### Creating a Next.js App

- **Create**: `npx create-next-app <project>`

  > Creating tutorial template: `npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"`

- **Start development server**: `npm run dev`

- **Structure**:

```
 📂 Project
 ┣━📂 components
 ┣━📂 ...
 ┣━📂 public    (*)[ static assets ]
 ┣━📂 pages     (*)[ page structure ]
 ┃ ┣━📂 ...
 ┃ ┣━📄 _app.js (*)[ global override ]
 ┃ ┗━📄 index.js
 ┗━📄 README.md
```

### Navigating Between Pages

- **Structure**: The page structure equivalent to the one in the `/pages/` folder.

- **Link**: The `<Link />` component is used to navigate between pages in the same app.
  ( It transitions faster than `<a>` as it happens using JavaScript and does not trigger a full page reload. )

  > It is used as follows:
  >
  > ```
  > <Link href="/[page]" {...linkProps}`}>
  >   <a {...allOtherProps} >{link}</a>
  > </Link>
  > ```

- **Code splitting**: Each page only loads what’s necessary for that page.

- **Prefetching**: whenever a `Link` component appear in the browser’s viewport, the linked page's code is prefetched in the background.

### Assets, Metadata, and CSS

#### Assets

- **Style**: Built-in support for CSS and Sass.

- **Assets**: Serve static assets, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.

- **Images**: next/image is an extension of the HTML <img> that supports
  - Image Optimization
  - lazy-loading.
  - progressive rendering.

#### Metadata

- **Head**: import the `Head` component from the `next/head` module

- **Third-Party JavaScript**: `next/script` is an extension of the HTML `<script>` element and optimizes when additional scripts are fetched and executed.

#### CSS

- **Supports**:

  - styled jsx
  - css modules
  - sass

- **Global Style**: To load global CSS files, import them in `pages/_app.js`.
  This component is common across all the different pages, thus it can be used to load global assets or keeping state between pages.
  > The development server needs to be restarted after adding the file

### Pre-rendering and Data Fetching

- **Pre-rendering**: generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

  > Html is pre-rendered on the **initial load** and react components are loaded ( becoming interactive ) on **hydration**.

- **Types of pre-rendering**:

  > pre-rendering is selected in a per page basis

  - **SG - Static Generation**: is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
  - **SSR - Server-side Rendering**: is the pre-rendering method that generates the HTML on each request.

- **`getStaticProps`**: runs at build time in production, can fetch external data and send it as props to the page.
  > should `return { props: { ... } }`

### Dynamic Routes

- A dynamic route page can be created using `[]`. ( eg. `pages/.../[id].js` )

- `getStaticPaths` is then used to definde the possible routes.

  > ```
  > return {
  >   paths: [{ params: { id, ...other } }],
  >   fallback,
  > };
  > ```
  >
  > - `id` is required, as it what defines the routes.
  >
  > - [`fallback`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false) is used to define the fallback page.

- `getStaticProps({ params })` is then used to fetch the data for the route.
  > `params = { id, ...other }`

### API Routes

> Next.js has support for API Routes, which let you easily create an API endpoint as a Node.js serverless function.

- Export a default function inside `pages/api/...`
  > ```
  > // req = HTTP incoming message, res = HTTP server response
  > export default function handler(req, res) {
  >   // ...
  >   // res.status(200).json({ text: 'Hello World!' }); // eg. API response
  > }
  > ```

### Deploying

## Notes

### Rendering

- **SG**: Static Generation
  > `getStaticProps`
- **CSR**: Client Side Rendering
  > `fetch` -> `useSWR`
- **SSR**: Server Side Rendering
  > `getServerSideProps`

### Libraries

- **[gray-matter](https://github.com/jonschlinkert/gray-matter)**

  > Parse front-matter from a string or file. Fast, reliable and easy to use. Parses YAML front matter by default, but also has support for YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters. Used by metalsmith, assemble, verb and many other projects.

- **[remark]()**

- **[remark-html]()**

- **[date-fns]()**
