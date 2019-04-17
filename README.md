# vietnamese-english

A website to search vietnamese

## Install

`npm i`

## Running locally

`npm run dev` to start the devserver.

## Build

`npm run build` will bundle the files into the `build` directory.

## Troubleshoot the fusebox.js bundler by removing the cache

Bust fusebox's cache by removing the .fusebox folder.

## Deploy

Create a gcloud service account and put the key in a file in the root directory of this repo called `google-cloud-platform-service-account-key.json`. `npm run deploy` will try to deploy the app using this service account.
