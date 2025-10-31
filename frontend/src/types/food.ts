export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

export interface ServingSize {
    id: string;
    name: string;
    amount: number;
    unit: string;
    grams: number;
}

export interface Food {
    id: string;
    name: string;
    brand?: string;
    category: string;
    nutritionPer100g: Nutrition;
    servingSizes: ServingSize[];
    barcode?: string;
    imageUrl?: string;
}

export interface FoodSearchResult {
    id: string;
    name: string;
    brand?: string;
    category: string;
    calories: number;
    imageUrl?: string;
}

export interface MealEntry {
    id: string;
    foodId: string;
    foodName: string;
    brand?: string;
    mealType: MealType;
    servingSizeId: string;
    servingSizeName: string;
    quantity: number;
    nutrition: Nutrition;
    date: string;
    createdAt: string;
}

export interface CreateMealEntryRequest {
    foodId: string;
    mealType: MealType;
    servingSizeId: string;
    quantity: number;
    date: string;
}

export interface FoodSearchParams {
    q: string;
    limit?: number;
    offset?: number;
    category?: string;
}

export interface FoodSearchResponse {
    foods: FoodSearchResult[];
    total: number;
    hasMore: boolean;
}
