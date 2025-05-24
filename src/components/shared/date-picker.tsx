'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export default function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ field, placeholder }: { field: ControllerRenderProps<TFieldValues, TName>; placeholder: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              'w-full font-normal justify-start px-3 hover:bg-white',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? format(field.value, 'd MMMM yyyy') : placeholder}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={field.value}
          defaultMonth={field.value}
          onSelect={selectedDate => {
            if (selectedDate) {
              const utcDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
              field.onChange(utcDate);
            } else {
              field.onChange(selectedDate);
            }

            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
