
## SwordHealth Challenge

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Create env variable file and add the following google client id:

NEXT_PUBLIC_GOOGLE_CLIENT = 36006667267-q1kouj55hp82r3f6aok5mfirg1crttro.apps.googleusercontent.com

to run the sanity cms:
cd swordstudio
npm run dev

## Features

1. User and Admin authentication with Google indentity service provider.
2. only users and admin users can read posts.
3. users can only edit their own posts and admin users can edit and delete all posts.
4. logged users can create posts.
5. post filtering by category.
6. light and dark mode.
