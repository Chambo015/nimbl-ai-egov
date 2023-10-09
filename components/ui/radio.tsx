import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';
import './RadioGroup.css';

interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  className?: string;
}

interface RadioGroupIndicatorProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator> {
  className?: string;
}

interface RadioGroupLabelProps {
  className?: string;
  htmlFor: string;
  children: React.ReactNode;
}

const RadioGroupRoot = RadioGroupPrimitive.Root;

const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ className, children, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref as any}
      className={cn('RadioGroupItem', className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
);
RadioGroupItem.displayName = 'RadioGroupItem';

const RadioGroupIndicator = React.forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Indicator
      ref={ref}
      className={cn('RadioGroupIndicator', className)}
      {...props}
    />
  )
);
RadioGroupIndicator.displayName = 'RadioGroupIndicator';


const RadioGroupLabel: React.FC<RadioGroupLabelProps> = ({ className, htmlFor, children }) => (
  <label className={cn('Label', className)} htmlFor={htmlFor}>
    {children}
  </label>
);

export {
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupIndicator,
  RadioGroupLabel
};