import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockFoods, mockFoodSearchResponse } from '@/data/mockData';
import type { Food, FoodSearchParams, FoodSearchResponse, CreateMealEntryRequest, MealEntry } from '@/types/food';

export const foodsService = {
    searchFoods: async (params: FoodSearchParams): Promise<FoodSearchResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: searchFoods ---', params);
            await mockApiDelay();

            // Filter mock foods based on query
            const filteredFoods = mockFoodSearchResponse.foods.filter(
                food =>
                    food.name.toLowerCase().includes(params.q.toLowerCase()) ||
                    food.brand?.toLowerCase().includes(params.q.toLowerCase()) ||
                    food.category.toLowerCase().includes(params.q.toLowerCase())
            );

            return {
                foods: filteredFoods.slice(0, params.limit || 20),
                total: filteredFoods.length,
                hasMore: filteredFoods.length > (params.limit || 20)
            };
        }

        const searchParams = new URLSearchParams();
        searchParams.append('q', params.q);
        if (params.limit) searchParams.append('limit', params.limit.toString());
        if (params.offset) searchParams.append('offset', params.offset.toString());
        if (params.category) searchParams.append('category', params.category);

        const response = await api.get(`/foods/search?${searchParams.toString()}`);
        return response.data;
    },

    getFoodById: async (id: string): Promise<Food> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getFoodById ---', id);
            await mockApiDelay();

            const food = mockFoods.find(f => f.id === id);
            if (!food) {
                throw new Error('Food not found');
            }
            return food;
        }

        const response = await api.get(`/foods/${id}`);
        return response.data;
    },

    addMealEntry: async (mealData: CreateMealEntryRequest): Promise<MealEntry> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: addMealEntry ---', mealData);
            await mockApiDelay();

            // Get food details to calculate nutrition
            const food = mockFoods.find(f => f.id === mealData.foodId);
            if (!food) {
                throw new Error('Food not found');
            }

            const servingSize = food.servingSizes.find(s => s.id === mealData.servingSizeId);
            if (!servingSize) {
                throw new Error('Serving size not found');
            }

            // Calculate nutrition based on serving size and quantity
            const multiplier = (servingSize.grams / 100) * mealData.quantity;
            const nutrition = {
                calories: Math.round(food.nutritionPer100g.calories * multiplier),
                protein: Math.round(food.nutritionPer100g.protein * multiplier * 10) / 10,
                carbs: Math.round(food.nutritionPer100g.carbs * multiplier * 10) / 10,
                fat: Math.round(food.nutritionPer100g.fat * multiplier * 10) / 10,
                fiber: Math.round(food.nutritionPer100g.fiber * multiplier * 10) / 10,
                sugar: Math.round(food.nutritionPer100g.sugar * multiplier * 10) / 10,
                sodium: Math.round(food.nutritionPer100g.sodium * multiplier)
            };

            return {
                id: `mock-${Date.now()}`,
                foodId: mealData.foodId,
                foodName: food.name,
                brand: food.brand,
                mealType: mealData.mealType,
                servingSizeId: mealData.servingSizeId,
                servingSizeName: servingSize.name,
                quantity: mealData.quantity,
                nutrition,
                date: mealData.date,
                createdAt: new Date().toISOString()
            };
        }

        const response = await api.post('/meals', mealData);
        return response.data;
    }
};
