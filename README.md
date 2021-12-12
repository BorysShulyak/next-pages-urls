## Motivation

This package would be useful if you use [Next.js](https://nextjs.org/) framework for your application.
Next.js has a very powerful feature to work with Static Site Generation - [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration). 
It allows you to use SSG and keep your data up to date. But there are some troubles with development flow.

Let's imagine you have FE and BE/CMS in different repos and use only SSG. If you do the breaking changes for BE data structure, your site would still work correctly, because to fetch new data you should rebuild your site, or even deploy the old version.
With Incremental Static Regeneration your static would try to fetch the new data, compare with existing one and rebuild the type of page if it's necessary. So your static site will be broken if ISR fetch the new structure of data.

To fix it you need to disable revalidate before merging the MR with data structure breaking changes. Sp after set `revalidate: false` you should fetch all pages based on the file-based routing (Read [Next.js routing](https://nextjs.org/docs/routing/introduction)).
This package allows you to get all the necessary urls to fetch.

As for me, I use this script as a part of development flow in production:

- Do the breaking changes in our headless CMS.
- Disable ISR for the necessary Next.js apps.
- Run the script that fetches all the urls generated with the help of this package.
- Merge the CMS changes.
- Update FE for new structure of data.
- Merge it.
- Enable revalidate and run this script one more time.

FYI, I have created the scheduled inactive job that have all the necessary variables and run this script in one click.
