import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { ServingSizeSelector } from '@/components/ServingSizeSelector';
import { MealTypeSelector } from '@/components/MealTypeSelector';
import { calculateNutrition, formatNutritionValue } from '@/lib/nutrition';
import { cn } from '@/lib/utils';
import type { Food, MealType } from '@/types/food';

interface AddFoodFormProps {
    food: Food;
    onSubmit: (data: {
        foodId: string;
        mealType: MealType;
        servingSizeId: string;
        quantity: number;
        date: string;
    }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const AddFoodForm = ({ food, onSubmit, onCancel, isLoading = false }: AddFoodFormProps) => {
    const [selectedServingId, setSelectedServingId] = useState(food.servingSizes[0]?.id || '');
    const [quantity, setQuantity] = useState(1);
    const [mealType, setMealType] = useState<MealType>('lunch');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const selectedServing = food.servingSizes.find(s => s.id === selectedServingId);
    const calculatedNutrition = selectedServing
        ? calculateNutrition(food.nutritionPer100g, selectedServing, quantity)
        : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedServing || !calculatedNutrition) return;

        onSubmit({
            foodId: food.id,
            mealType,
            servingSizeId: selectedServingId,
            quantity,
            date: format(selectedDate, 'yyyy-MM-dd')
        });
    };

    return (
        <Card className='w-full max-w-2xl'>
            <CardHeader>
                <CardTitle>Add {food.name} to Diary</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-6'
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <ServingSizeSelector
                                servingSizes={food.servingSizes}
                                selectedServingId={selectedServingId}
                                quantity={quantity}
                                onServingChange={setSelectedServingId}
                                onQuantityChange={setQuantity}
                            />

                            <MealTypeSelector
                                selectedMealType={mealType}
                                onMealTypeChange={setMealType}
                            />

                            <div className='space-y-2'>
                                <Label>Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !selectedDate && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarDays className='mr-2 h-4 w-4' />
                                            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto p-0'
                                        align='start'
                                    >
                                        <CalendarComponent
                                            mode='single'
                                            selected={selectedDate}
                                            onSelect={date => date && setSelectedDate(date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {calculatedNutrition && (
                            <div className='space-y-4'>
                                <div>
                                    <h4 className='font-semibold mb-3'>Nutrition Summary</h4>
                                    <div className='bg-muted/50 p-4 rounded-lg space-y-2'>
                                        <div className='flex justify-between'>
                                            <span>Calories</span>
                                            <span className='font-medium'>{calculatedNutrition.calories}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Protein</span>
                                            <span className='font-medium'>
                                                {formatNutritionValue(calculatedNutrition.protein)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Carbs</span>
                                            <span className='font-medium'>
                                                {formatNutritionValue(calculatedNutrition.carbs)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Fat</span>
                                            <span className='font-medium'>
                                                {formatNutritionValue(calculatedNutrition.fat)}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className='flex justify-between'>
                                            <span>Fiber</span>
                                            <span className='font-medium'>
                                                {formatNutritionValue(calculatedNutrition.fiber)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Sugar</span>
                                            <span className='font-medium'>
                                                {formatNutritionValue(calculatedNutrition.sugar)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Sodium</span>
                                            <span className='font-medium'>
                                                {formatNutritionValue(calculatedNutrition.sodium, 'mg')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    <div className='flex gap-4 justify-end'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isLoading || !selectedServing}
                        >
                            {isLoading ? 'Adding...' : 'Add to Diary'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
