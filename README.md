# instal library
1. instal nativewind for Tailwind CSS look at https://www.nativewind.dev/docs/getting-started/installation
2. icons Expo Vector Icons `npm i @expo/vector-icons | bun add  @expo/vector-icons`
   https://icons.expo.fyi/Index

3. ui library https://reactnavigation.org/

* first instal Stack Navigator and Native Stack Navigator 

```
npm installnpm install @react-navigation/stack
bun add @react-navigation/stack 

npm install @react-navigation/native-stack
bun add @react-navigation/native-stack
```

* Buttons Tabs install `npm install @react-navigation/bottom-tabs | bun add @react-navigation/bottom-tabs`

### Color transitions library (Reng kecisleri) =>```bun add expo-linear-gradient```

### Icons library (Expo Vector Icons) =>```bun add @expo/vector-icons```

### Storage library (react-native-async-storage) 
    => https://www.npmjs.com/package/@react-native-async-storage/async-storage

### sentry (debug performance issues and errors across their systems and services.) 
    => https://docs.sentry.io/platforms/react-native/

## building app for production => "expo.dev" => https://expo.dev/

## build time you can do following steps
1. tsc --noEmit => checking typescript errors
2. npx expo-doctor --verbose => checking expo errors
3. "expo build:ios" or "expo build:android"