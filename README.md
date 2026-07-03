# PlayShifu Children's Onboarding Companion App Flow

This React Native project implements a responsive, localized, and highly polished onboarding flow plus a premium home dashboard screen. It is built strictly using React Native CLI (React Native 0.86), React Navigation (Native Stack), and TypeScript.

---

## 🚀 Application Flow & Screen Maps

The onboarding wizard runs through the following sequence:

```
[Screen 1: Language Selection]
             │
             ▼ (Confirm Selection)
[Screen 2: Welcome Splash]
             ├── (Yes, I have my toy!) ───────> [Screen 3: Plush Selection Grid] ──┐
             │                                                                      ▼
             └── (No, I don't have one yet!) ──> [Screen 4: Benefit/Comparison] ─────┼──> [Screen 5: Parental Gate]
                                                                                      │            │
                                                                    (Success) ────────┘            ▼ (Cancel)
                                                                                          [Return to Caller Screen]
                                                                                                   │
                                                                                                   ▼ (Success)
                                                                                         [Screen 6: Landing Home]
```

### 1. Language Selection (Screen 1)
- Left-aligned kid-friendly headers set in **DynaPuff-Bold**.
- Offers **English** and **Polski** selection options.
- Selection cards feature the radio indicator shifted to the left, labels set in **DynaPuff-Bold** with size **24**, and no emoji flags.
- Confirm button triggers the navigation.

### 2. Welcome Splash (Screen 2)
- Greets the child and asks if they have a physical toy.
- Features a large illustration (`Img1.png` at height `460` in portrait) and a 3D square back button.
- Contains two primary 3D CTAs:
  - `"Yes, I have my toy!"` → navigates to **Plush Selection**
  - `"No, I don't have one yet!"` → navigates to **Comparison/Benefits**

### 3. Comparison/Benefits (Screen 3)
- Showcases the benefits of having a physical buddy (interactive stories, bedtime lullabies, tactile coordination) in a premium, translucent table.
- Dual 3D CTAs:
  - `"Get the Plush"` → links to external store
  - `"Continue with App Only"` → navigates to **Parental Lock**

### 4. Plush Selection (Screen 4)
- Displays ZeeZee and Guffy card options.
- **Dynamic Zooming (Portrait):** Applies a scale zoom level transform only in portrait mode (`1.3` for ZeeZee and `1.1` for Guffy) to display the characters with maximum visual depth. Zoom transforms are disabled in landscape mode.
- Selection cards are styled on a solid purple background (`#5A4FC4`) with a thick white border highlight upon selection.

### 5. Parental Gate (Screen 5)
- Displays a mathematical equation challenge (`a X (b + c)`) styled in yellow using large **DynaPuff-Bold** font.
- Features a center-aligned text input box where parents type the answer (cursor is centered dynamically by resetting native EditText padding rules).
- Once solved successfully, registers the state and routes to **Landing Home**.

### 6. Landing Home (Screen 6)
- Renders the child's home dashboard with active plush details or localised demo mode features.

---

## 🎨 Theme & Typography

1. **Custom Font Assets**:
   - **`DynaPuff-Bold`**: Bubble-style Google font used for all titles, headers, Parental Lock equations, and button labels.
   - **`Feather`** icon pack: Used to draw navigation arrows.
   - Restructured native resources to bundle only active fonts.

2. **3D Button Design (`react-native-awesome-button`)**:
   - Primary and secondary buttons animate with tactile 3D depress shadows on click.
   - Support customizable dimensions, rounded corners, and stretching configurations (`borderRadius`, `width`, `height`, `stretch`) in `Button.Root`.

3. **3D Square Back Buttons**:
   - Replaced flat text links with a solid 3D square `AwesomeButton` (`width={54}`, `height={54}`, `borderRadius={12}`, `stretch={false}`) containing only a Feather `chevron-left` vector icon.

---

## 🛠️ Verification & Validation

The codebase has been checked for correct syntax, TypeScript validation, styling guidelines, and lint rules.

- **TypeScript type checking**: `npx tsc --noEmit` passes successfully.
- **Lint checks**: `npm run lint` passes successfully with **0 errors and 0 warnings**.

## 💻 Getting Started (React Native CLI)

Follow these step-by-step instructions to set up, build, and run the project from scratch:

### 📋 Prerequisites
Ensure you have the standard React Native development environment configured for Android (Android SDK, Android Studio Emulator).

---

### 🛠️ Setup & Installation

#### Step 1: Install Dependencies
Clone the repository and install all package dependencies:
```sh
npm install
```

#### Step 2: Set Up and Link Font Assets
Ensure the DynaPuff-Bold and Feather vector icon assets are linked natively:
```sh
npx react-native-asset
```

---

### 🚀 Running the App

#### Step 1: Start the Metro Bundler
Start the Metro server with a clean cache to make sure the font assets are correctly resolved:
```sh
npm start -- --reset-cache
```

#### Step 2: Launch the App on Emulator
Open a new terminal window and boot the application:
```sh
npm run android
```

---

### 📦 Building for Production

#### Generate a Release APK (Android)
To build a standalone signed release APK for testing, run:
```sh
cd android && ./gradlew assembleRelease
```
The output file will be saved at `android/app/build/outputs/apk/release/app-release.apk`.

# gameflow
