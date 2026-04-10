import React, { ReactNode, useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  selectedTab?: string;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  selectedTab,
  setSelectedTab,
  className,
}) => {
  return (
    <div className={`flex mb-4 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsTriggerProps>(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, {
            isSelected: child.props.value === selectedTab,
            onClick: () => setSelectedTab?.(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  isSelected,
  onClick,
  className,
}) => {
  return (
    <button
      className={`px-4 py-2 m-2 border border-black rounded cursor-pointer ${isSelected ? 'bg-indigo-400 text-white' : 'bg-white hover:bg-indigo-400'} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  selectedTab,
  className,
}) => {
  if (value !== selectedTab) return null;
  return <div className={`p-4 border-t border-gray-300 ${className}`}>{children}</div>;
};

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  return (
    <div className={`flex flex-col ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsListProps>(child) && child.type === TabsList) {
          return React.cloneElement(child, {
            selectedTab,
            setSelectedTab,
          });
        }
        if (React.isValidElement<TabsContentProps>(child) && child.type === TabsContent) {
          return React.cloneElement(child, {
            selectedTab,
          });
        }
        return child;
      })}
    </div>
  );
};