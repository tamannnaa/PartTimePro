import React from 'react';
import { 
  Select as RadixSelect, 
  SelectTrigger as RadixSelectTrigger, 
  SelectValue as RadixSelectValue, 
  SelectContent as RadixSelectContent, 
  SelectItem as RadixSelectItem,
  SelectTriggerProps,
  SelectItemProps
} from '@radix-ui/react-select';

interface SelectProps {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children }) => {
  return (
    <RadixSelect>
      {children}
    </RadixSelect>
  );
};

// Explicitly typing SelectTriggerProps
export const SelectTrigger: React.FC<React.PropsWithChildren<SelectTriggerProps>> = ({ children, ...props }) => (
  <RadixSelectTrigger {...props}>{children}</RadixSelectTrigger>
);

// Using correct typing for SelectItemProps
export const SelectItem: React.FC<React.PropsWithChildren<SelectItemProps>> = ({ children, ...props }) => (
  <RadixSelectItem {...props}>{children}</RadixSelectItem>
);

export const SelectValue: React.FC<React.HTMLProps<HTMLSpanElement>> = ({ children, ...props }) => (
  <RadixSelectValue {...props}>{children}</RadixSelectValue>
);

export const SelectContent: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, ...props }) => (
  <RadixSelectContent {...props}>{children}</RadixSelectContent>
);
