import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FoodSearchResult } from '@/types/food';

interface FoodSearchResultsProps {
    results: FoodSearchResult[];
    onSelectFood: (foodId: string) => void;
    isLoading?: boolean;
}

export const FoodSearchResults = ({ results, onSelectFood, isLoading = false }: FoodSearchResultsProps) => {
    if (isLoading) {
        return (
            <div className='space-y-4'>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card
                        key={i}
                        className='animate-pulse'
                    >
                        <CardHeader>
                            <div className='h-4 bg-muted rounded w-3/4'></div>
                            <div className='h-3 bg-muted rounded w-1/2'></div>
                        </CardHeader>
                        <CardContent>
                            <div className='h-3 bg-muted rounded w-1/4'></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-muted-foreground'>No foods found. Try a different search term.</p>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {results.map(food => (
                <Card
                    key={food.id}
                    className='hover:shadow-md transition-shadow'
                >
                    <CardHeader className='pb-2'>
                        <div className='flex justify-between items-start'>
                            <div className='flex-1'>
                                <CardTitle className='text-lg'>{food.name}</CardTitle>
                                {food.brand && <p className='text-sm text-muted-foreground mt-1'>{food.brand}</p>}
                            </div>
                            <Button
                                onClick={() => onSelectFood(food.id)}
                                size='sm'
                            >
                                Select
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                        <div className='flex items-center gap-4'>
                            <Badge variant='secondary'>{food.category}</Badge>
                            <span className='text-sm font-medium'>{food.calories} cal/100g</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
