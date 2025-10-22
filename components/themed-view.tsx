import { View as RNView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { styled } from 'nativewind'

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};



function View({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const ThemedView = styled(View);
