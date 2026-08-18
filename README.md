# TaskApp

TaskApp is a React Native application that allows users to manage their daily tasks efficiently. It provides secure Firebase authentication, offline task management, Firestore synchronization, and push notification support.

---

# Features

- **Firebase Authentication**
  - Register a new account with email and password.
  - Login using existing Firebase credentials.
  - Form validation is implemented for both Login and Registration screens.
  - If the user is already authenticated, the app automatically logs in using the stored credentials without requiring login every time.

- **Persistent Login**
  - User information is securely stored in the device's internal storage after successful login.
  - Users remain logged in until they explicitly log out.

- **Task Management**
  - Create new tasks.
  - Edit existing tasks.
  - Delete tasks.
  - Mark tasks as completed using a checkbox.

- **Offline Storage**
  - All tasks are stored locally in the device database.
  - Users can continue using the application without an internet connection.

- **Firestore Synchronization**
  - Completed tasks can be uploaded to Firebase Firestore.
  - A **"Save Completed Tasks"** button appears only after one or more tasks are marked as completed.
  - If there is no internet connection, completed tasks cannot be uploaded, and the application displays an appropriate validation message.

- **Push Notifications**
  - Local push notification support has been implemented.
  - The notification infrastructure is ready.
  - Once backend APIs are integrated, remote push notifications can be enabled without major changes.

- **Environment Configuration**
  - Environment-specific configuration has been implemented using a `.env` file.
  - Separate environments can be maintained for:
    - Development
    - Staging
    - Production

---

# Technology Stack

- React Native CLI
- TypeScript
- Firebase Authentication
- Firebase Firestore
- React Navigation
- Redux Toolkit
- Local Database
- Encrypted Storage
- Push Notifications
- React Native Config (.env)

---

# Application Flow

1. Register a new account if you are a new user.
2. Existing users can log in using their Firebase credentials.
3. User credentials are securely stored after successful login.
4. The application automatically logs in authenticated users on subsequent launches.
5. After login, the Home screen is displayed.
6. Users can:
   - Add tasks
   - Edit tasks
   - Delete tasks
7. All tasks are saved locally.
8. Mark a task as completed by selecting its checkbox.
9. Once completed tasks exist, the **Save Completed Tasks** button becomes visible.
10. Clicking the button uploads completed tasks to Firebase Firestore.
11. If internet connectivity is unavailable, the upload is prevented and an appropriate validation message is shown.
12. If a user attempts to upload a task that has already been saved to Firebase Firestore, the application displays a validation alert indicating that the task has already been uploaded. This prevents duplicate entries from being stored in the database and ensures data consistency.

# Additional Features

- Vector Icons
1. The application uses React Native Vector Icons to provide a modern and intuitive user interface.
2. Icons are used throughout the application to enhance usability and improve the overall user experience.

# Responsive Dimension Utility

1. A centralized dimensions utility file has been implemented to manage reusable values for height, width, margins, and padding.
2. This approach ensures a consistent and responsive user interface across different Android and iOS screen sizes while improving code maintainability and reducing duplication.

# ios support

1. The application has been developed with support for both Android and iOS platforms.
2. However, since a macOS environment was not available during development, the application has not been tested on an iOS simulator or physical iOS device.
3. The iOS project structure and required dependencies are included, and the application is expected to work after verification in a macOS development environment.

---

# Project Setup

## Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## Start Metro

```bash
npm start
```

or

```bash
yarn start
```

---

## Run Android

```bash
npm run android
```

or

```bash
yarn android
```

---

## Run iOS

Install CocoaPods first:

```bash
bundle install
bundle exec pod install
```

Then run:

```bash
npm run ios
```

or

```bash
yarn ios
```

---

# Environment Variables

Create a `.env` file for environment-specific configuration.

Example:


Separate environment files can be maintained for:

- `.env.dev`
- `.env.staging`
- `.env.production`

---

# Future Enhancements

- Remote Push Notifications using Backend APIs
- Task Categories
- Due Date & Reminder Support
- Cloud Synchronization
- Task Search & Filtering

---

# Author

**Avishek Biswas**
