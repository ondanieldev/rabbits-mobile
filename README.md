# Rabbits Mobile

## Description

Rabbits is a simple app that aims to help people to improve their routine by managing habits, reminders and events.

I want to improve the app continuously in order to add more ways to help people to manage their lives. Given this idea, project's roadmap includes modules for managing house storage, finance, pets and plants!

## How to setup

- Node:
  - Run `yarn` to install dependencies.
- Environment variables:
  - Copy `env.example` to a new `.env` file;
  - Fill/replace `.env` with the required credentials.

## How to run

### Running on android

Before running the following commands, start your android studio virtual device or connect to your computer an android device with its USB debugging mode on:

- Run `yarn start:metro` to start metro bundler;
- Run `yarn start:android` to download the app to the current device.

### Running on IOS

This app was not tested on IOS environment and some functions are not ready to run on it yet. However, IOS integration is included on project's roadmap.

## Testing

TODO.

## Linting

- Run `yarn fix` to fix linting issues;
- Run `yarn lint` to check for linting issues. If some of them was not solved by `yarn fix`, you will see related files and description on terminal, so you can manually solve them.

## How to build

### Build on android

The following steps must be ran only once:

- Run `yarn assets:android:dir` to create assets dir;
- Run `yarn assets:android:index` to create assets index.

The following steps must be ran whenever you want do generate a new output:

- Run `yarn bundle:android:debug` to generate debug APK;
- Run `yarn bundle:android:release` to generate release APK.

Both APKs will be available under `android/app/build/outputs/apk` folder.

## How to deploy

### Deploy on android

TODO.

## How to contribute

If you want to contribute, please check [contributing](https://github.com/ondanieldev/rabbits-mobile/blob/master/CONTRIBUTING.md).

## Links

- Google Play Store
- Storybook
- [Figma](https://www.figma.com/file/ipDwne7ajgybxQml25PKn6/Rabbits?type=design&node-id=0%3A1&mode=design&t=q69bOm7uSXI063jO-1)
- [Roadmap](https://ondanieldev.notion.site/Rabbits-Roadmap-05a85728e4d946cd8b4fb51dea256ce0?pvs=4)

- [Rabbits API repository](https://github.com/ondanieldev/rabbits-api)
