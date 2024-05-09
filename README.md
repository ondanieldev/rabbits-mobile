<!-- Title -->
<h1 align="center">
  <img src="https://github.com/ondanieldev/rabbits-mobile/blob/HEAD/public/images/logo.png" alt="Logo" height="77px" />
  <br />
  <a href="#" style="color: #51CF66;">
    Rabbits Mobile
  </a>
</h1>

<!-- Slogan -->
<p align="center">
  <strong>A mobile app to manage your routine</strong><br>
  Currently on experimental phase
</p>

<!-- Badges -->
<p align="center">
  <a href="https://github.com/ondanieldev/rabbits-mobile/blob/HEAD/package.json">
    <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fondanieldev%2Frabbits-mobile%2Fraw%2FHEAD%2Fpackage.json&query=%24.version&label=Current%20version&color=51CF66" alt="Current version." />
  </a>
  <a href="https://github.com/ondanieldev/rabbits-mobile/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-51CF66.svg" alt="Released under the MIT license." />
  </a>
  <a href="https://github.com/ondanieldev/rabbits-mobile/blob/HEAD/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-Welcome-51CF66.svg" alt="PRs welcome!" />
  </a>
</p>

<!-- Body -->
## Description

Rabbits is an app that aims to help people to improve their routine by managing habits, reminders and events.

I want to improve the app continuously in order to add more ways to help people to manage their lives. Given this idea, project's roadmap includes modules for managing house storage, finance, pets and plants!

## How to setup

- Node:
  - Run `yarn` to install dependencies.
- Environment variables:
  - Copy `env.example` to a new `.env` file;
  - Fill/replace `.env` with the required credentials.

## How to run

### Running on Android

Before running the following commands, start your Android Studio's virtual device or connect to your computer an android device with its USB debugging mode on:

- Run `yarn start:metro` to start metro bundler;
- Run `yarn start:android` to download app on the current device.

### Running on IOS

This app was not tested on IOS environment and some functions are not ready to run on it yet. However, IOS integration is included on project's roadmap.

## How to test

TODO.

## How to lint

- Run `yarn fix` to fix linting issues;
- Run `yarn lint` to check for linting issues. If some of them was not solved by `yarn fix`, you will see related files and description on terminal, so you can manually solve them.

## How to build

### Building on android

The following steps must be ran only once:

- Run `yarn assets:android:dir` to create assets dir;
- Run `yarn assets:android:index` to create assets index.

The following steps must be ran whenever you want do generate a new output:

- Run `yarn bundle:android:debug` to generate debug APK;
- Run `yarn bundle:android:release` to generate release APK.

Both APKs will be available under `android/app/build/outputs/apk` folder.

## How to deploy

### Deploying to android

TODO.

## Storybook

### Running storybook on android

- Run `yarn storybook:metro` to start metro bundler using storybook environment;
- Run `yarn storybook:android` to download app on the current device using storybook environment.

## How to contribute

If you want to contribute, please check [contributing](https://github.com/ondanieldev/rabbits-mobile/blob/HEAD/CONTRIBUTING.md).

## Links

- Google Play Store
- [Figma](https://www.figma.com/file/ipDwne7ajgybxQml25PKn6/Rabbits?type=design&node-id=0%3A1&mode=design&t=q69bOm7uSXI063jO-1)
- [Roadmap](https://ondanieldev.notion.site/Rabbits-Roadmap-05a85728e4d946cd8b4fb51dea256ce0?pvs=4)
- [Rabbits API repository](https://github.com/ondanieldev/rabbits-api)
