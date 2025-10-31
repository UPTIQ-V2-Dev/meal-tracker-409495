import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatNutritionValue } from '@/lib/nutrition';
import type { Food } from '@/types/food';

interface FoodDetailsCardProps {
    food: Food;
}

export const FoodDetailsCard = ({ food }: FoodDetailsCardProps) => {
    const nutrition = food.nutritionPer100g;

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle className='text-xl'>{food.name}</CardTitle>
                        {food.brand && <p className='text-muted-foreground mt-1'>{food.brand}</p>}
                    </div>
                    <Badge variant='outline'>{food.category}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <div>
                        <h4 className='font-semibold mb-2'>Nutrition per 100g</h4>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                    <span>Calories</span>
                                    <span className='font-medium'>{nutrition.calories}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Protein</span>
                                    <span className='font-medium'>{formatNutritionValue(nutrition.protein)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Carbs</span>
                                    <span className='font-medium'>{formatNutritionValue(nutrition.carbs)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Fat</span>
                                    <span className='font-medium'>{formatNutritionValue(nutrition.fat)}</span>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                    <span>Fiber</span>
                                    <span className='font-medium'>{formatNutritionValue(nutrition.fiber)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Sugar</span>
                                    <span className='font-medium'>{formatNutritionValue(nutrition.sugar)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Sodium</span>
                                    <span className='font-medium'>{formatNutritionValue(nutrition.sodium, 'mg')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h4 className='font-semibold mb-2'>Available Serving Sizes</h4>
                        <div className='space-y-1'>
                            {food.servingSizes.map(serving => (
                                <div
                                    key={serving.id}
                                    className='text-sm'
                                >
                                    <span className='font-medium'>{serving.name}</span>
                                    <span className='text-muted-foreground ml-2'>({serving.grams}g)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
