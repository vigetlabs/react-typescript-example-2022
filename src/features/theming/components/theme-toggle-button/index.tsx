import { useThemeStore } from 'features/theming';
import { Button } from 'features/ui';
import React from 'react';

export const ThemeToggleButton = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const themeStore = useThemeStore();
  return <Button onClick={() => themeStore.toggleMode()}>{children}</Button>;
};
