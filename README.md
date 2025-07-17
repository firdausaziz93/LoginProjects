# LoginProjects Setup & Usage Guide

## Overview

LoginProjects is a React Native application featuring login and sign-up pages. It provides user authentication functionality and is set up to run on both Android and iOS platforms.

## Functionality

- **Login Page**: Allows users to enter credentials and authenticate.
- **Sign Up Page**: Enables new users to register an account.
- **Remain Login if Kill App**: Asyncstorage to persist the authentication state so that the user remains logged in after the app is closed and reopened.
- **Password visibility**: Allows user to visible the password in sign up page
- **Cross-platform Support**: Runs on Android and iOS devices.

## Prerequisites

- [Node.js](https://nodejs.org/) (Recommended: v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS, macOS only)
- [CocoaPods](https://cocoapods.org/) (for iOS dependencies)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/LoginProjects.git
cd LoginProjects
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

#### iOS Only: Install CocoaPods

```sh
cd ios
pod install
cd ..
```

### 3. Running the App

#### Android

```sh
npx react-native run-android
```

#### iOS

```sh
npx react-native run-ios
```

## Additional Notes

- Make sure you have an Android emulator or iOS simulator running, or connect a physical device.
- For iOS, open `ios/LoginProjects.xcworkspace` in Xcode if you want to run or debug manually.
- For Android, ensure your device is authorized for development.

## Troubleshooting

- If you encounter issues with dependencies, try running `npm install` or `yarn install` again.
- For iOS build issues, ensure CocoaPods is installed and run `pod install` in the `ios` directory.
- If you see errors related to native modules, rebuild the project and restart Metro bundler.

---