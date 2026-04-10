### Setup iOS Dependencies and Project

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.77/the-new-architecture/pure-cxx-modules.md

Commands to install CocoaPods dependencies, run Codegen, and open the Xcode workspace for manual project configuration.

```bash
cd ios
bundle install
bundle exec pod install
open SampleApp.xcworkspace
```

--------------------------------

### Initialize React Native Project using CLI

Source: https://github.com/facebook/react-native-website/blob/main/docs/get-started-without-a-framework.md

Creates a new React Native project named 'AwesomeProject' using the React Native Community CLI. This command is essential for starting a new project from scratch. It requires Node.js and npm/yarn to be installed.

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

--------------------------------

### Create New Expo App

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.78/getting-started.md

This command initializes a new React Native project using the Expo framework. It ensures you have the latest version of the Expo CLI installed and ready to create your application. This is the recommended starting point for most new React Native projects.

```shell
npx create-expo-app@latest
```

--------------------------------

### Initialize React Native Project

Source: https://github.com/facebook/react-native-website/blob/main/docs/fabric-native-components.md

Command to create a new React Native project template without installing CocoaPods, used as a starting point for developing native components.

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

--------------------------------

### Configure React Native Dependencies in Podfile

Source: https://github.com/facebook/react-native-website/blob/main/docs/troubleshooting.md

Example configuration for adding React Native and specific subspecs to a CocoaPods Podfile to ensure necessary libraries are linked.

```ruby
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

--------------------------------

### Implement Initialization in iOS Native Module

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.79/the-new-architecture/native-modules-lifecycle.md

Shows how to conform to the RCTInitializing protocol in the header file and implement the initialize method in the implementation file for setup logic.

```Objective-C++
#import <React/RCTInitializing.h>

@interface NativeModule : NSObject <NativeModuleSpec, RCTInitializing>
@end

@implementation NativeModule
- (void)initialize {
  // add the initialization code here
}
@end
```

--------------------------------

### Configure ANDROID_HOME environment variable

Source: https://github.com/facebook/react-native-website/blob/main/docs/_getting-started-windows-android.md

This example demonstrates how to set the ANDROID_HOME environment variable on Windows. This variable is crucial for React Native tools to locate your Android SDK installation. The default SDK path is typically %LOCALAPPDATA%\Android\Sdk.

```powershell
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
```

--------------------------------

### Start Metro Development Server

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.77/_integration-with-existing-apps-kotlin.md

Commands to start the Metro bundler using common package managers.

```shell
# Using npm
npm start

# Using yarn
yarn start
```

--------------------------------

### Install iOS Dependencies with Bundler and CocoaPods

Source: https://github.com/facebook/react-native-website/blob/main/docs/get-started-without-a-framework.md

Installs Ruby dependencies using Bundler and then installs native iOS dependencies using CocoaPods. This is a common troubleshooting step for iOS projects experiencing issues with native modules. Ensure you have Ruby and Bundler installed.

```shell
cd ios
bundle install
bundle exec pod install
```

--------------------------------

### Initialize a new React Native project

Source: https://github.com/facebook/react-native-website/blob/main/website/blog/2025-02-19-react-native-0.78.md

Command to initialize a fresh React Native project using the latest CLI version.

```bash
npx @react-native-community/cli@latest init MyProject --version latest
```

--------------------------------

### Install Node.js LTS and OpenJDK 17 using Chocolatey

Source: https://github.com/facebook/react-native-website/blob/main/docs/_getting-started-windows-android.md

This command installs the Long Term Support (LTS) version of Node.js and OpenJDK 17 using the Chocolatey package manager on Windows. Ensure you are running an Administrator Command Prompt.

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

--------------------------------

### Implement Initialization in iOS Native Modules

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.80/the-new-architecture/native-modules-lifecycle.md

Demonstrates how to conform to the RCTInitializing protocol in the header file and implement the initialize method in the implementation file for iOS Native Modules.

```objective-c
#import <React/RCTInitializing.h>

@interface NativeModule : NSObject <NativeModuleSpec, RCTInitializing>
@end
```

```objective-c
@implementation NativeModule

- (void)initialize {
  // add the initialization code here
}

@end
```

--------------------------------

### Initialize React Native Project

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.77/turbo-native-modules.md

Command to bootstrap a new React Native project with a specific version to support Turbo Native Module development.

```shell
npx @react-native-community/cli@latest init TurboModuleExample --version 0.76.0
```

--------------------------------

### Get Zulu JDK Information using Homebrew

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.84/_getting-started-macos-android.md

Retrieves information about the installed Zulu JDK, including its version and installation path. This is useful for verifying the installation and locating the JDK for further configuration.

```shell
brew info --cask zulu@17
```

--------------------------------

### Install iOS Pods for Bare React Native Project

Source: https://github.com/facebook/react-native-website/blob/main/docs/navigation.md

After installing dependencies for a bare React Native project, this command installs the necessary CocoaPods for iOS to complete the React Navigation setup.

```shell
cd ios
pod install
cd ..
```

--------------------------------

### Manual React Native project setup

Source: https://github.com/facebook/react-native-website/blob/main/website/blog/2018-05-07-using-typescript-with-react-native.md

Standard commands to initialize a base React Native project and navigate into the directory.

```shell
react-native init MyAwesomeProject
cd MyAwesomeProject
```

--------------------------------

### Initialize React Native Project via CLI

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.77/get-started-without-a-framework.md

Uses the React Native Community CLI to bootstrap a new project. Supports optional versioning and custom templates for specific project requirements.

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

```shell
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

--------------------------------

### Install Azul Zulu JDK 17 via Homebrew

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.77/_getting-started-macos-android.md

Installs the OpenJDK distribution (Zulu 17) required for Android development. The commands also include a step to verify the installation path for the JDK.

```shell
brew install --cask zulu@17
brew info --cask zulu@17
```

--------------------------------

### DrawerLayoutAndroid Component Example (TypeScript)

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.78/drawerlayoutandroid.md

Provides an example of using the DrawerLayoutAndroid component in React Native with TypeScript. It demonstrates similar functionality to the JavaScript example, including drawer control and styling, with type safety. This requires React Native and TypeScript setup.

```typescript
import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

--------------------------------

### Test Setup with Jest beforeEach/beforeAll

Source: https://github.com/facebook/react-native-website/blob/main/docs/testing-overview.md

Illustrates the use of Jest's `beforeEach` and `beforeAll` hooks for setting up test environments. `beforeEach` runs before each test in a `describe` block, while `beforeAll` runs once before all tests in a block. These are essential for initializing mocks or test data.

```javascript
describe('Data Fetching', () => {
  beforeAll(() => {
    // Initialize API client or global mocks
    console.log('Setting up API client...');
  });

  beforeEach(() => {
    // Reset mocks or data before each test
    jest.clearAllMocks();
    console.log('Resetting mocks for next test...');
  });

  it('fetches data correctly', () => {
    // ... test implementation ...
  });

  it('handles errors during fetch', () => {
    // ... test implementation ...
  });
});
```

--------------------------------

### Style Property: start

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.78/layout-props.md

The 'start' style property behaves like 'left' in LTR direction and 'right' in RTL direction. It takes precedence over 'left', 'right', and 'end'.

```APIDOC
## `start`

### Description
When the direction is `ltr`, `start` is equivalent to `left`. When the direction is `rtl`, `start` is equivalent to `right`.

This style takes precedence over the `left`, `right`, and `end` styles.

### Type
number, string

### Required
No
```

--------------------------------

### Verify and Install Library

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.82/the-new-architecture/create-module-library.md

Commands to verify the package status on the NPM registry and install the library into a React Native project. Replace <package.name> with the actual name defined in package.json.

```bash
npm view <package.name>
yarn add <package.name>
```

--------------------------------

### Initialize global methods with JSI

Source: https://github.com/facebook/react-native-website/blob/main/website/blog/2024-10-23-the-new-architecture-is-here.md

Compares the legacy bridge approach of initializing global methods via JavaScript modules with the new architecture's direct C++ binding approach. The new method reduces startup overhead by binding methods directly to the runtime.

```javascript
// ❌ Slow initialization
import {NativeTimingModule} from 'NativeTimingModule';
global.setTimeout = timer => {
  NativeTimingModule.setTimeout(timer);
};

// App.js
setTimeout(() => {}, 100);
```

```cpp
// ✅ Initialize directly in C++
runtime.global().setProperty(runtime, "setTimeout", createTimer);
```

```javascript
// App.js
setTimeout(() => {}, 100);
```

--------------------------------

### Example Usage of get() Method - React Native

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.80/dimensions.md

This code snippet provides a concise example of how to use the `Dimensions.get('window')` method to extract the height and width properties from the returned ScaledSize object.

```tsx
const {height, width} = Dimensions.get('window');

```

--------------------------------

### runApplication()

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.83/appregistry.md

Loads the JavaScript bundle and initiates the execution of the application with the specified app key and parameters.

```APIDOC
## runApplication()

### Description
Loads the JavaScript bundle and runs the application.

### Method
`static runApplication`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **appKey** (string) - Required - The key of the application to run.
- **appParameters** (any) - Required - Parameters to be passed to the application.
```

--------------------------------

### Start Headless JS Task Service (Android)

Source: https://github.com/facebook/react-native-website/blob/main/docs/headless-js-android.md

Initiates a Headless JS task by starting the native service with necessary data. This example demonstrates how to create an Intent, attach data via a Bundle, and start the service using `startForegroundService`. Requires Android SDK.

```java
Intent service = new Intent(getApplicationContext(), MyTaskService.class);
Bundle bundle = new Bundle();

bundle.putString("foo", "bar");
service.putExtras(bundle);

getApplicationContext().startForegroundService(service);
```

```kotlin
val service = Intent(applicationContext, MyTaskService::class.java)
val bundle = Bundle()

bundle.putString("foo", "bar")

service.putExtras(bundle)

applicationContext.startForegroundService(service)
```

--------------------------------

### Uninstall Global React Native CLI

Source: https://github.com/facebook/react-native-website/blob/main/docs/_remove-global-cli.md

This command removes the globally installed React Native CLI and the community CLI package. It is recommended to run this command if you have previously installed a global `react-native-cli` to avoid potential conflicts with the project's local CLI.

```shell
npm uninstall -g react-native-cli @react-native-community/cli
```

--------------------------------

### Configure MainApplication for React Native

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.77/_integration-with-existing-apps-kotlin.md

Updates the MainApplication class to implement ReactApplication, providing the necessary ReactNativeHost and ReactHost instances. This setup includes configuration for the New Architecture, Hermes engine, and SoLoader initialization.

```java
class MainApplication extends Application implements ReactApplication {
  @Override
  public ReactNativeHost getReactNativeHost() {
    return new DefaultReactNativeHost(this) {
      @Override
      protected List<ReactPackage> getPackages() { return new PackageList(this).getPackages(); }
      @Override
      protected String getJSMainModuleName() { return "index"; }
      @Override
      public boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }
      @Override
      protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }
      @Override
      protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }
    };
  }

  @Override
  public ReactHost getReactHost() {
    return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, OpenSourceMergedSoMapping);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      DefaultNewArchitectureEntryPoint.load();
    }
  }
}
```

```kotlin
class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost =
       object : DefaultReactNativeHost(this) {
         override fun getPackages(): List<ReactPackage> = PackageList(this).packages
         override fun getJSMainModuleName(): String = "index"
         override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
         override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
         override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
       }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}
```

--------------------------------

### marginBlockStart

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.78/layout-props.md

`marginBlockStart` is equivalent to `marginTop`, controlling the margin at the start of the block axis.

```APIDOC
## marginBlockStart

### Description
Equivalent to `marginTop`.

### Method
Not Applicable (Style Property)

### Endpoint
Not Applicable

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **marginBlockStart** (number, string) - Optional - The margin at the start of the block axis.

### Request Example
```json
{
  "style": {
    "marginBlockStart": 8
  }
}
```

### Response
#### Success Response (200)
Not Applicable (Style Property)

#### Response Example
Not Applicable
```

--------------------------------

### Start Metro Development Server

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.79/_integration-with-existing-apps-kotlin.md

Commands to initiate the Metro bundler server, allowing the Android app to fetch the JavaScript bundle during development.

```shell
npm start
# or
yarn start
```

--------------------------------

### Flexible Size Example View Setup (Objective-C)

Source: https://github.com/facebook/react-native-website/blob/main/docs/communication-ios.md

An Objective-C example demonstrating the initialization of an RCTRootView within a custom view. It configures the root view with a module name, initial properties, sets itself as the delegate, and specifies the size flexibility mode to RCTRootViewSizeFlexibilityHeight. The initial frame is set, with the height explicitly set to 0 to be determined by React Native.

```objectivec
- (instancetype)initWithFrame:(CGRect)frame
{
  [...] // Initialization code

  _rootView = [[RCTRootView alloc] initWithBridge:bridge
  moduleName:@"FlexibilityExampleApp"
  initialProperties:@{}];

  _rootView.delegate = self;
  _rootView.sizeFlexibility = RCTRootViewSizeFlexibilityHeight;
  _rootView.frame = CGRectMake(0, 0, self.frame.size.width, 0);
}

```

--------------------------------

### Style Property: start

Source: https://github.com/facebook/react-native-website/blob/main/docs/layout-props.md

The 'start' style property acts as a directional offset. It's equivalent to 'left' in LTR mode and 'right' in RTL mode, taking precedence over 'left', 'right', and 'end'.

```APIDOC
## start

### Description
When the direction is `ltr`, `start` is equivalent to `left`. When the direction is `rtl`, `start` is equivalent to `right`. This style takes precedence over the `left`, `right`, and `end` styles.

### Method
Not Applicable (Style Property)

### Endpoint
Not Applicable (Style Property)

### Parameters
#### Style Properties
- **start** (number, string) - No - The directional offset.

### Request Example
```json
{
  "style": {
    "start": 10
  }
}
```

### Response
#### Success Response (200)
Not Applicable (Style Property)

#### Response Example
Not Applicable (Style Property)
```

--------------------------------

### Install Pods and Run Codegen on iOS

Source: https://github.com/facebook/react-native-website/blob/main/website/versioned_docs/version-0.82/turbo-native-modules.md

These bash commands outline the process for setting up Codegen on iOS. It involves navigating to the `ios` directory, installing bundle dependencies using `bundle install`, and then executing `bundle exec pod install`. Codegen runs as part of the script phases automatically added by CocoaPods.

```bash
cd ios
bundle install
bundle exec pod install

... (output examples) ...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

--------------------------------

### React Native Systrace Example

Source: https://github.com/facebook/react-native-website/blob/main/docs/systrace.md

Demonstrates how to use the React Native Systrace API to capture non-timed JavaScript events. This example shows how to enable profiling, start and end events, and record counter events.

```javascript
import React from 'react';
import {Button, Text, View, StyleSheet, Systrace} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent('event_label');
    Systrace.counterEvent('event_label', 10);
  };

  const stopProfiling = () => {
    Systrace.endEvent();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>
          React Native Systrace API
        </Text>
        <View style={styles.buttonsColumn}>
          <Button
            title="Capture the non-Timed JS events in EasyProfiler"
            onPress={() => enableProfiling()}
          />
          <Button
            title="Stop capturing"
            onPress={() => stopProfiling()}
            color="#FF0000"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsColumn: {
    gap: 16,
  },
});

export default App;
```