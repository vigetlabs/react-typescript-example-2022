import { Button } from './styled';
import { useThemeStore } from 'features/theming';
import React from 'react';

export const ThemeToggleButton = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const themeStore = useThemeStore();
  return <Button onClick={() => themeStore.toggleMode()}>{children}</Button>;
};
