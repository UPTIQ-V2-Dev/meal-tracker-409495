# Food Logger - Technical Implementation Plan

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** for components (already configured)
- **Tailwind CSS v4** for styling
- **React Router DOM** for navigation
- **React Hook Form + Zod** for form validation
- **TanStack Query** for API state management
- **date-fns** for date utilities

## Page-by-Page Implementation Plan

### 1. Dashboard/Home Page (`/`)

**Components:**

- `DashboardLayout` - Main layout with sidebar
- `DashboardStats` - Daily calories, macros overview cards
- `RecentMeals` - List of today's logged meals
- `QuickAddFood` - Quick food entry button/modal
- `CalorieChart` - Weekly calorie intake visualization

**Utils/Hooks:**

- `useDashboardData` - Fetch dashboard stats
- `useRecentMeals` - Get today's meals
- `calculateDailyTotals` - Sum calories/macros

**API Endpoints:**

- `GET /api/dashboard/stats` - Daily totals
- `GET /api/meals/recent` - Recent meals
- `GET /api/user/goals` - User daily goals

**Types:**

- `DashboardStats`, `DailyGoals`, `MacroBreakdown`

---

### 2. Food Search & Add Page (`/add-food`)

**Components:**

- `FoodSearchBar` - Search input with autocomplete
- `FoodSearchResults` - Grid of search results
- `FoodDetailsCard` - Selected food nutrition info
- `ServingSizeSelector` - Portion size controls
- `MealTypeSelector` - Breakfast/Lunch/Dinner/Snack
- `AddFoodForm` - Final form to log food

**Utils/Hooks:**

- `useFoodSearch` - Debounced food search
- `useAddFood` - Mutation to log food
- `calculateNutrition` - Scale nutrition by serving size
- `useFoodDatabase` - Local food database cache

**API Endpoints:**

- `GET /api/foods/search?q={query}` - Search foods
- `GET /api/foods/{id}` - Get food details
- `POST /api/meals` - Log food entry

**Types:**

- `Food`, `FoodSearchResult`, `ServingSize`, `MealEntry`

---

### 3. Meal History Page (`/history`)

**Components:**

- `MealHistoryCalendar` - Date picker calendar
- `DayMealsList` - Meals for selected day
- `MealEntryCard` - Individual meal with edit/delete
- `NutritionSummary` - Daily nutrition breakdown
- `FilterControls` - Filter by meal type/date range

**Utils/Hooks:**

- `useMealHistory` - Fetch meals by date range
- `useDeleteMeal` - Delete meal mutation
- `useEditMeal` - Edit meal mutation
- `groupMealsByType` - Group meals by breakfast/lunch/dinner

**API Endpoints:**

- `GET /api/meals?date={date}` - Get meals for date
- `DELETE /api/meals/{id}` - Delete meal
- `PUT /api/meals/{id}` - Update meal

**Types:**

- `MealHistoryFilter`, `DailyMeals`, `MealGroup`

---

### 4. Goals & Settings Page (`/goals`)

**Components:**

- `GoalsForm` - Daily calorie/macro targets
- `WeightTracking` - Current weight input
- `ActivityLevelSelector` - Sedentary/Active/etc
- `GoalTypeSelector` - Lose/Maintain/Gain weight
- `MacroDistribution` - Carbs/Protein/Fat percentages

**Utils/Hooks:**

- `useUserGoals` - Fetch user goals
- `useUpdateGoals` - Update goals mutation
- `calculateMacroTargets` - Calculate macro goals from calories
- `bmrCalculator` - Calculate BMR/TDEE

**API Endpoints:**

- `GET /api/user/goals` - Get user goals
- `PUT /api/user/goals` - Update user goals
- `POST /api/user/weight` - Log weight entry

**Types:**

- `UserGoals`, `ActivityLevel`, `GoalType`, `MacroTargets`

---

### 5. Profile Page (`/profile`)

**Components:**

- `ProfileForm` - Basic info (name, age, height, gender)
- `WeightChart` - Weight progress over time
- `AccountSettings` - Email, password, preferences
- `DataExport` - Export meal data
- `DeleteAccount` - Account deletion

**Utils/Hooks:**

- `useUserProfile` - Fetch user profile
- `useUpdateProfile` - Update profile mutation
- `useWeightHistory` - Weight tracking data
- `useExportData` - Export user data

**API Endpoints:**

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/weight-history` - Weight history
- `GET /api/user/export` - Export data

**Types:**

- `UserProfile`, `WeightEntry`, `ExportOptions`

---

## Common Components & Layout

### Layout Components

- `AppLayout` - Root layout with navigation
- `Sidebar` - Navigation sidebar (already exists)
- `Header` - Top bar with user menu
- `MobileNav` - Mobile navigation drawer

### Shared Components

- `LoadingSpinner` - Loading states
- `ErrorBoundary` - Error handling
- `ConfirmDialog` - Confirmation modals
- `Toast` - Success/error notifications (sonner already configured)
- `EmptyState` - Empty data states

### Form Components

- `FoodAutocomplete` - Reusable food search input
- `MacroDisplay` - Nutrition info display
- `DatePicker` - Date selection (react-day-picker configured)

## Common Utils & Hooks

### API Layer

- `apiClient.ts` - Axios instance with interceptors
- `authApi.ts` - Authentication endpoints
- `foodsApi.ts` - Food database endpoints
- `mealsApi.ts` - Meal logging endpoints
- `userApi.ts` - User profile/goals endpoints

### Custom Hooks

- `useAuth` - Authentication state
- `useLocalStorage` - Persist data locally
- `useDebounce` - Debounced inputs
- `useInfiniteScroll` - Paginated lists

### Utility Functions

- `nutritionCalculations.ts` - Macro calculations
- `dateUtils.ts` - Date formatting/manipulation
- `validationSchemas.ts` - Zod schemas
- `constants.ts` - App constants

## Types & Interfaces

### Core Types (`types/`)

- `food.ts` - Food, Nutrition, ServingSize
- `meal.ts` - MealEntry, MealType, DailyMeals
- `user.ts` - UserProfile, UserGoals (already exists)
- `api.ts` - API responses (already exists)

## Implementation Priority

1. **Phase 1:** Dashboard + Add Food (core functionality)
2. **Phase 2:** Meal History + Basic goals
3. **Phase 3:** Advanced goals + Profile management
4. **Phase 4:** Charts, analytics, data export

Each page will use existing shadcn components and follow the established patterns in the codebase.
