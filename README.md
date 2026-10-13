# বাজার দর · BazarDor

**BazarDor** is a responsive Bengali market-price guide for everyday essentials in Bangladesh. Browse today's prices, compare regional markets, and sign in to see product details.

## Features

- Live catalog of 33+ products from the Bazar Dor assignment API, with automatic fallback to the alternative API.
- Bengali names, dates, digits, units, and taka prices throughout the interface.
- Responsive home page with a scrolling price ticker, rising and falling prices, and an all-products grid.
- Category pages with default, lowest-first, and highest-first numeric price sorting.
- Sign-in-protected product pages with minimum, maximum, average, and market-by-market prices.
- Better Auth email/password registration and sign-in, plus optional Google and GitHub OAuth.
- Protected profile page and name update flow, with toast feedback for account actions.
- Loading skeletons, friendly not-found states, and retry handling when catalog data cannot be loaded.

## Technologies

- Next.js App Router and React
- JavaScript and JSX
- Tailwind CSS 4 and responsive custom styles
- Better Auth with the MongoDB Node.js driver
- React Hot Toast and Lucide icons
- Bazar Dor products and categories API

## Run locally

Requirements: Node.js 20.9+ and a MongoDB database. MongoDB Atlas has a free cloud cluster and is the recommended option; you do not need to install MongoDB on your computer.

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create a free MongoDB Atlas cluster:

   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a free shared cluster.
   - Under **Database Access**, create a database username and password. This is separate from your MongoDB Atlas website login.
   - Under **Network Access**, add your current IP address for local development.
   - Select **Connect → Drivers**, choose Node.js, and copy the connection string. Replace `<password>` with the database user's password. If the password contains reserved URL characters, URL-encode it.

3. Create a local environment file:

   ```powershell
   Copy-Item .env.example .env.local
   ```

4. In `.env.local`, set `MONGODB_URI` to the Atlas connection string and replace `BETTER_AUTH_SECRET` with a random value. Generate one with:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

   Keep the secret private. Do not commit `.env.local`.

5. Start the development server:

   ```powershell
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

Email/password sign-up and sign-in store user accounts in MongoDB. Google and GitHub sign-in are optional: add each provider's client ID and secret to `.env.local` to enable it. Register these Better Auth callback URLs with your OAuth providers:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

The catalog uses the assignment's primary API by default and automatically retries the alternative API when a request fails. `BAZARDOR_API_URL` and `BAZARDOR_API_FALLBACK_URL` can be set to override them.

## Production build

```powershell
npm run lint
npm run build
```

For Vercel, add `MONGODB_URI` and `BETTER_AUTH_SECRET` under **Project Settings → Environment Variables**. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the deployed origin, for example `https://your-domain.vercel.app`, and update the OAuth callback URLs to use that origin. Add the Vercel server's IP access to Atlas Network Access; for serverless deployments that do not have a fixed egress IP, Atlas may require allowing access from `0.0.0.0/0`. Use a strong, unique database password and least-privilege database user if enabling this. Dynamic category and product routes are served by the Next.js App Router and support direct navigation and refresh.

**Keep database credentials and auth secrets private.** `.env.local` is ignored by Git. Do not commit it or post its contents in issues, chats, or screenshots. If you do not have an Atlas database URI yet, create the Atlas cluster and database user above first; Better Auth cannot persist or track registered users until MongoDB is configured.

## Project routes

- `/` — market overview and all products
- `/category/[slug]` — category listing and sorting
- `/product/[slug]` — protected product and market prices
- `/signin` and `/signup` — account access
- `/profile` and `/profile/update` — protected profile and name update
