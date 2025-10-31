import type { MealEntry, MealType, Nutrition } from './food';

export interface DailyMeals {
    date: string;
    meals: MealEntry[];
    totalNutrition: Nutrition;
}

export interface MealGroup {
    mealType: MealType;
    entries: MealEntry[];
    totalNutrition: Nutrition;
}

export interface MealHistoryFilter {
    startDate?: string;
    endDate?: string;
    mealType?: MealType;
    foodName?: string;
}

export interface UpdateMealEntryRequest {
    mealType?: MealType;
    servingSizeId?: string;
    quantity?: number;
}

export interface MealHistoryParams {
    date?: string;
    startDate?: string;
    endDate?: string;
    mealType?: MealType;
    limit?: number;
    offset?: number;
}

export interface MealHistoryResponse {
    meals: MealEntry[];
    total: number;
    hasMore: boolean;
}
