import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { Food, FoodSearchResult, FoodSearchResponse, MealEntry } from '@/types/food';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

// Mock food data
export const mockFoods: Food[] = [
    {
        id: '1',
        name: 'Chicken Breast',
        category: 'Meat & Poultry',
        nutritionPer100g: {
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6,
            fiber: 0,
            sugar: 0,
            sodium: 74
        },
        servingSizes: [
            { id: '1', name: '100g', amount: 100, unit: 'g', grams: 100 },
            { id: '2', name: '1 breast (4 oz)', amount: 113, unit: 'piece', grams: 113 },
            { id: '3', name: '1 cup, diced', amount: 140, unit: 'cup', grams: 140 }
        ]
    },
    {
        id: '2',
        name: 'Brown Rice',
        category: 'Grains',
        nutritionPer100g: {
            calories: 111,
            protein: 2.6,
            carbs: 23,
            fat: 0.9,
            fiber: 1.8,
            sugar: 0.4,
            sodium: 5
        },
        servingSizes: [
            { id: '4', name: '100g', amount: 100, unit: 'g', grams: 100 },
            { id: '5', name: '1 cup, cooked', amount: 195, unit: 'cup', grams: 195 },
            { id: '6', name: '0.5 cup, cooked', amount: 97.5, unit: 'cup', grams: 97.5 }
        ]
    },
    {
        id: '3',
        name: 'Broccoli',
        category: 'Vegetables',
        nutritionPer100g: {
            calories: 34,
            protein: 2.8,
            carbs: 7,
            fat: 0.4,
            fiber: 2.6,
            sugar: 1.5,
            sodium: 33
        },
        servingSizes: [
            { id: '7', name: '100g', amount: 100, unit: 'g', grams: 100 },
            { id: '8', name: '1 cup, chopped', amount: 91, unit: 'cup', grams: 91 },
            { id: '9', name: '1 medium stalk', amount: 148, unit: 'piece', grams: 148 }
        ]
    },
    {
        id: '4',
        name: 'Greek Yogurt',
        brand: 'Fage',
        category: 'Dairy',
        nutritionPer100g: {
            calories: 59,
            protein: 10,
            carbs: 3.6,
            fat: 0.4,
            fiber: 0,
            sugar: 3.6,
            sodium: 36
        },
        servingSizes: [
            { id: '10', name: '100g', amount: 100, unit: 'g', grams: 100 },
            { id: '11', name: '1 container (170g)', amount: 170, unit: 'container', grams: 170 },
            { id: '12', name: '1 cup', amount: 245, unit: 'cup', grams: 245 }
        ]
    },
    {
        id: '5',
        name: 'Banana',
        category: 'Fruits',
        nutritionPer100g: {
            calories: 89,
            protein: 1.1,
            carbs: 23,
            fat: 0.3,
            fiber: 2.6,
            sugar: 12,
            sodium: 1
        },
        servingSizes: [
            { id: '13', name: '100g', amount: 100, unit: 'g', grams: 100 },
            { id: '14', name: '1 medium (118g)', amount: 118, unit: 'piece', grams: 118 },
            { id: '15', name: '1 large (136g)', amount: 136, unit: 'piece', grams: 136 }
        ]
    },
    {
        id: '6',
        name: 'Almonds',
        category: 'Nuts & Seeds',
        nutritionPer100g: {
            calories: 579,
            protein: 21,
            carbs: 22,
            fat: 50,
            fiber: 12,
            sugar: 4.4,
            sodium: 1
        },
        servingSizes: [
            { id: '16', name: '100g', amount: 100, unit: 'g', grams: 100 },
            { id: '17', name: '1 oz (28g)', amount: 28, unit: 'oz', grams: 28 },
            { id: '18', name: '23 almonds', amount: 28, unit: 'pieces', grams: 28 }
        ]
    }
];

export const mockFoodSearchResults: FoodSearchResult[] = mockFoods.map(food => ({
    id: food.id,
    name: food.name,
    brand: food.brand,
    category: food.category,
    calories: food.nutritionPer100g.calories
}));

export const mockFoodSearchResponse: FoodSearchResponse = {
    foods: mockFoodSearchResults,
    total: mockFoodSearchResults.length,
    hasMore: false
};

export const mockMealEntries: MealEntry[] = [
    {
        id: '1',
        foodId: '1',
        foodName: 'Chicken Breast',
        mealType: 'lunch',
        servingSizeId: '2',
        servingSizeName: '1 breast (4 oz)',
        quantity: 1,
        nutrition: {
            calories: 186,
            protein: 35,
            carbs: 0,
            fat: 4.1,
            fiber: 0,
            sugar: 0,
            sodium: 84
        },
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    }
];
