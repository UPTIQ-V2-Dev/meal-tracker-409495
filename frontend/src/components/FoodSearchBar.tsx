import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

interface FoodSearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export const FoodSearchBar = ({
    onSearch,
    placeholder = 'Search for foods...',
    className = ''
}: FoodSearchBarProps) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);

    // Trigger search when debounced query changes
    useEffect(() => {
        if (debouncedQuery.trim()) {
            onSearch(debouncedQuery.trim());
        }
    }, [debouncedQuery, onSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // If query is empty, trigger search immediately to clear results
        if (!value.trim()) {
            onSearch('');
        }
    };

    return (
        <div className={`relative ${className}`}>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
                type='text'
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                className='pl-10'
            />
        </div>
    );
};
