# vietnamese-english

A website to search vietnamese

## Setup

1. Clone this repo.
1. Recommended node version: v11.2.0.
1. Run `npm i` to install packages.
1. Run `node fuse.js write:definitions` to generate the definitions.json file.

## Running locally

`npm run dev` to start the devserver.

## Build

`npm run build` will bundle the files into the `build` directory.

## Troubleshoot the fusebox.js bundler by removing the cache

Bust fusebox's cache by removing the .fusebox folder.

## Deploy

Create a gcloud service account and put the key in a file in the root directory of this repo called `google-cloud-platform-service-account-key.json`. `npm run deploy` will try to deploy the app using this service account.
