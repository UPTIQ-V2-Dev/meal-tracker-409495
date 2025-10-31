import type { Nutrition, ServingSize } from '@/types/food';

export const calculateNutrition = (
    nutritionPer100g: Nutrition,
    servingSize: ServingSize,
    quantity: number = 1
): Nutrition => {
    const multiplier = (servingSize.grams / 100) * quantity;

    return {
        calories: Math.round(nutritionPer100g.calories * multiplier),
        protein: Math.round(nutritionPer100g.protein * multiplier * 10) / 10,
        carbs: Math.round(nutritionPer100g.carbs * multiplier * 10) / 10,
        fat: Math.round(nutritionPer100g.fat * multiplier * 10) / 10,
        fiber: Math.round(nutritionPer100g.fiber * multiplier * 10) / 10,
        sugar: Math.round(nutritionPer100g.sugar * multiplier * 10) / 10,
        sodium: Math.round(nutritionPer100g.sodium * multiplier)
    };
};

export const formatMacroPercentage = (macro: number, totalCalories: number): number => {
    if (totalCalories === 0) return 0;
    const macroCalories = macro * (macro === 0 ? 0 : macro < 10 ? 4 : macro < 50 ? 4 : 9); // Rough estimation
    return Math.round((macroCalories / totalCalories) * 100);
};

export const formatNutritionValue = (value: number, unit: string = 'g'): string => {
    if (unit === 'mg') {
        return `${value}${unit}`;
    }
    return value % 1 === 0 ? `${value}${unit}` : `${value.toFixed(1)}${unit}`;
};
