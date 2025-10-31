import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FoodSearchBar } from '@/components/FoodSearchBar';
import { FoodSearchResults } from '@/components/FoodSearchResults';
import { FoodDetailsCard } from '@/components/FoodDetailsCard';
import { AddFoodForm } from '@/components/AddFoodForm';
import { foodsService } from '@/services/foods';
import type { CreateMealEntryRequest } from '@/types/food';

type ViewState = 'search' | 'details' | 'add';

export const AddFoodPage = () => {
    const [viewState, setViewState] = useState<ViewState>('search');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
    const queryClient = useQueryClient();

    // Search foods query
    const { data: searchResults, isLoading: isSearchLoading } = useQuery({
        queryKey: ['foods', 'search', searchQuery],
        queryFn: () => foodsService.searchFoods({ q: searchQuery }),
        enabled: searchQuery.length > 0,
        staleTime: 5 * 60 * 1000 // 5 minutes
    });

    // Get selected food details query
    const { data: selectedFood, isLoading: isFoodLoading } = useQuery({
        queryKey: ['foods', selectedFoodId],
        queryFn: () => foodsService.getFoodById(selectedFoodId!),
        enabled: !!selectedFoodId && viewState !== 'search'
    });

    // Add meal mutation
    const addMealMutation = useMutation({
        mutationFn: (data: CreateMealEntryRequest) => foodsService.addMealEntry(data),
        onSuccess: () => {
            toast.success('Food added to diary successfully!');
            queryClient.invalidateQueries({ queryKey: ['meals'] });
            handleBackToSearch();
        },
        onError: error => {
            console.error('Error adding food:', error);
            toast.error('Failed to add food to diary. Please try again.');
        }
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.length === 0) {
            setViewState('search');
        }
    };

    const handleSelectFood = (foodId: string) => {
        setSelectedFoodId(foodId);
        setViewState('details');
    };

    const handleAddFood = () => {
        setViewState('add');
    };

    const handleSubmitFood = (data: CreateMealEntryRequest) => {
        addMealMutation.mutate(data);
    };

    const handleBackToSearch = () => {
        setViewState('search');
        setSelectedFoodId(null);
        setSearchQuery('');
    };

    const handleBackToDetails = () => {
        setViewState('details');
    };

    const renderContent = () => {
        switch (viewState) {
            case 'search':
                return (
                    <>
                        <FoodSearchBar
                            onSearch={handleSearch}
                            placeholder='Search for foods to add...'
                            className='mb-6'
                        />

                        {searchQuery && (
                            <FoodSearchResults
                                results={searchResults?.foods || []}
                                onSelectFood={handleSelectFood}
                                isLoading={isSearchLoading}
                            />
                        )}

                        {!searchQuery && (
                            <div className='text-center py-12'>
                                <div className='max-w-md mx-auto'>
                                    <div className='w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <Plus className='w-12 h-12 text-muted-foreground' />
                                    </div>
                                    <h3 className='text-lg font-semibold mb-2'>Add Food to Your Diary</h3>
                                    <p className='text-muted-foreground'>
                                        Start typing to search for foods from our database and add them to your meal
                                        diary.
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'details':
                return (
                    <div className='space-y-6'>
                        <div className='flex items-center gap-4'>
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={handleBackToSearch}
                                className='gap-2'
                            >
                                <ArrowLeft className='w-4 h-4' />
                                Back to Search
                            </Button>
                            <Button onClick={handleAddFood}>Add to Diary</Button>
                        </div>

                        {isFoodLoading ? (
                            <div className='animate-pulse'>
                                <div className='h-8 bg-muted rounded w-1/3 mb-4'></div>
                                <div className='h-64 bg-muted rounded'></div>
                            </div>
                        ) : selectedFood ? (
                            <FoodDetailsCard food={selectedFood} />
                        ) : (
                            <div className='text-center py-12'>
                                <p className='text-muted-foreground'>Food not found.</p>
                            </div>
                        )}
                    </div>
                );

            case 'add':
                return (
                    <div className='space-y-6'>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={handleBackToDetails}
                            className='gap-2'
                        >
                            <ArrowLeft className='w-4 h-4' />
                            Back to Details
                        </Button>

                        {selectedFood ? (
                            <div className='flex justify-center'>
                                <AddFoodForm
                                    food={selectedFood}
                                    onSubmit={handleSubmitFood}
                                    onCancel={handleBackToDetails}
                                    isLoading={addMealMutation.isPending}
                                />
                            </div>
                        ) : (
                            <div className='text-center py-12'>
                                <p className='text-muted-foreground'>Loading food details...</p>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className='min-h-screen bg-background'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-4xl mx-auto'>
                    <div className='mb-8'>
                        <h1 className='text-3xl font-bold tracking-tight'>Add Food</h1>
                        <p className='text-muted-foreground mt-2'>Search and add foods to your meal diary</p>
                    </div>

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
