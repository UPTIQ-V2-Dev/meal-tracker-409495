import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { MealType } from '@/types/food';

interface MealTypeSelectorProps {
    selectedMealType: MealType;
    onMealTypeChange: (mealType: MealType) => void;
}

const mealTypes: Array<{ value: MealType; label: string }> = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
];

export const MealTypeSelector = ({ selectedMealType, onMealTypeChange }: MealTypeSelectorProps) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor='meal-type'>Meal Type</Label>
            <Select
                value={selectedMealType}
                onValueChange={onMealTypeChange}
            >
                <SelectTrigger id='meal-type'>
                    <SelectValue placeholder='Select meal type' />
                </SelectTrigger>
                <SelectContent>
                    {mealTypes.map(meal => (
                        <SelectItem
                            key={meal.value}
                            value={meal.value}
                        >
                            {meal.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
