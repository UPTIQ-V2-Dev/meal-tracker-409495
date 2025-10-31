import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import type { ServingSize } from '@/types/food';

interface ServingSizeSelectorProps {
    servingSizes: ServingSize[];
    selectedServingId: string;
    quantity: number;
    onServingChange: (servingId: string) => void;
    onQuantityChange: (quantity: number) => void;
}

export const ServingSizeSelector = ({
    servingSizes,
    selectedServingId,
    quantity,
    onServingChange,
    onQuantityChange
}: ServingSizeSelectorProps) => {
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 1;
        if (value > 0 && value <= 999) {
            onQuantityChange(value);
        }
    };

    return (
        <div className='space-y-4'>
            <div className='space-y-2'>
                <Label htmlFor='serving-size'>Serving Size</Label>
                <Select
                    value={selectedServingId}
                    onValueChange={onServingChange}
                >
                    <SelectTrigger id='serving-size'>
                        <SelectValue placeholder='Select serving size' />
                    </SelectTrigger>
                    <SelectContent>
                        {servingSizes.map(serving => (
                            <SelectItem
                                key={serving.id}
                                value={serving.id}
                            >
                                {serving.name} ({serving.grams}g)
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='space-y-2'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                    id='quantity'
                    type='number'
                    min='0.1'
                    max='999'
                    step='0.1'
                    value={quantity}
                    onChange={handleQuantityChange}
                    className='w-24'
                />
            </div>
        </div>
    );
};
