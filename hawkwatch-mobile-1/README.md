# HawkWatch Mobile MVP

## Overview
HawkWatch is a mobile application designed to provide users with a platform for monitoring and managing their birdwatching activities. This MVP version focuses on user authentication and basic navigation within the app.

## Features
- User authentication via Supabase
- Login and Sign Up screens
- Main dashboard with sample data
- User profile management
- Settings for user preferences

## Project Structure
```
hawkwatch-mobile
├── src
│   ├── components
│   ├── screens
│   ├── navigation
│   ├── services
│   ├── hooks
│   ├── types
│   └── utils
├── assets
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js installed on your machine
- Expo CLI installed globally (`npm install -g expo-cli`)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd hawkwatch-mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   GOOGLE_API_KEY=<your-google-api-key>
   OPENAI_API_KEY=<your-openai-api-key>
   ```

### Running the App
To start the development server, run:
```
npm start
```
This will open a new tab in your browser with the Expo developer tools. You can run the app on an emulator or a physical device using the Expo Go app.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.