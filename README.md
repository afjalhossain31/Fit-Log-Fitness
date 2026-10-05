# FitLog - Workout Library

FitLog is a dark, no-nonsense gym companion app. Pick a lift, lock it into today's plan, and watch the week's work add up.

## 🚀 Technologies Used
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Notifications:** React Hot Toast
- **Data Fetching:** Native Fetch API

## ✨ Key Features
1. **Responsive Dark UI:** A beautifully designed dark theme with neon accent colors that works perfectly on mobile, tablet, and desktop screens.
2. **Dynamic Workout Library:** Fetches and displays workout data from an external API, showcasing interactive workout cards.
3. **Plan Management:** Users can add workouts to "Today's Plan" (up to 5 lifts) or "Save for later".
4. **Live Statistics:** Calculates and displays the total number of exercises, total workout duration, and total calories burned in real-time.
5. **Persistent Storage & Sorting:** Uses LocalStorage to save your plans even if you refresh the page. Workouts in the plan can also be sorted by Duration, Calories, or Rating.

## 🛠️ How to run locally
1. Clone the repository
2. Run `npm install --legacy-peer-deps`
3. Run `npm run dev`
4. Open `http://localhost:3000`