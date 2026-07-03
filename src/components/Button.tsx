import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { StyleSheet, ViewStyle, TextStyle, StyleProp, ActivityIndicator, Pressable, Platform } from 'react-native';
import AwesomeButton from '@rcaferati/react-native-awesome-button';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

interface ButtonContextProps {
  variant: ButtonVariant;
  disabled: boolean;
}

const ButtonContext = createContext<ButtonContextProps>({
  variant: 'primary',
  disabled: false,
});

interface ButtonRootProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  width?: number;
  height?: number;
  stretch?: boolean;
}

const ButtonRoot: React.FC<ButtonRootProps> = React.memo(({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  onPress,
  style,
  borderRadius,
  width,
  height,
  stretch,
}) => {
  const contextValue = useMemo(() => ({ variant, disabled: disabled || loading }), [variant, disabled, loading]);

  const buttonProps = useMemo(() => {
    let base = {};
    switch (variant) {
      case 'primary':
        base = {
          backgroundColor: colors.deepPurple,
          backgroundActive: '#1F1847',
          backgroundDarker: '#140E32',
          raiseLevel: 5,
          borderRadius: 26,
          height: 54,
          stretch: true,
        };
        break;
      case 'secondary':
        base = {
          backgroundColor: colors.white,
          backgroundActive: '#E5E7EB',
          backgroundDarker: '#D1D5DB',
          raiseLevel: 5,
          borderRadius: 26,
          height: 54,
          stretch: true,
        };
        break;
      case 'outline':
        base = {
          backgroundColor: 'transparent',
          backgroundActive: 'rgba(255, 255, 255, 0.1)',
          backgroundDarker: 'transparent',
          raiseLevel: 0,
          borderRadius: 26,
          height: 54,
          borderWidth: 2,
          borderColor: colors.white,
          stretch: true,
        };
        break;
      case 'text':
      default:
        base = {
          backgroundColor: 'transparent',
          backgroundActive: 'transparent',
          backgroundDarker: 'transparent',
          raiseLevel: 0,
          height: 40,
          stretch: false,
        };
        break;
    }

    return {
      ...base,
      ...(borderRadius !== undefined && { borderRadius }),
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(stretch !== undefined && { stretch }),
    };
  }, [variant, borderRadius, width, height, stretch]);

  const handlePress = useCallback((next?: () => void) => {
    onPress();
    if (next) {
      next();
    }
  }, [onPress]);

  const cleanedStyle = useMemo(() => {
    if (!style) return undefined;
    const flattened = { ...StyleSheet.flatten(style) };
    delete flattened.backgroundColor;
    return flattened;
  }, [style]);

  if (variant === 'text') {
    return (
      <ButtonContext.Provider value={contextValue}>
        <Pressable
          disabled={disabled || loading}
          onPress={onPress}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.25)', borderless: false }}
          style={({ pressed }) => [
            styles.textRoot,
            pressed && Platform.OS === 'ios' && { opacity: 0.6 },
            style,
            { overflow: 'hidden' },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            children
          )}
        </Pressable>
      </ButtonContext.Provider>
    );
  }

  return (
    <ButtonContext.Provider value={contextValue}>
      <AwesomeButton
        {...buttonProps}
        disabled={disabled || loading}
        onPress={handlePress}
        style={cleanedStyle}
      >
        {loading ? <ActivityIndicator color={variant === 'secondary' ? colors.deepPurple : colors.white} size="small" /> : children}
      </AwesomeButton>
    </ButtonContext.Provider>
  );
});

interface ButtonTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

const ButtonText: React.FC<ButtonTextProps> = React.memo(({ children, style }) => {
  const { variant, disabled } = useContext(ButtonContext);

  const textStyle = useMemo(() => {
    const variantStyle = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      outline: styles.outlineText,
      text: styles.textText,
    }[variant];

    const disabledStyle = disabled ? styles.disabledText : null;

    return [
      styles.baseText,
      variantStyle,
      disabledStyle,
      style,
    ] as StyleProp<TextStyle>;
  }, [variant, disabled, style]);

  return <React.Fragment>{React.createElement(require('react-native').Text, { style: textStyle }, children)}</React.Fragment>;
});

interface ButtonIconProps {
  children: React.ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = React.memo(({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
});

export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  Text: ButtonText,
  Icon: ButtonIcon,
});

const styles = StyleSheet.create({
  textRoot: {
    backgroundColor: 'transparent',
    height: 'auto',
    paddingHorizontal: 0,
    borderWidth: 0,
    overflow: 'hidden',
  },
  baseText: {
    fontSize: 16,
    fontFamily: fonts.button,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.deepPurple,
  },
  outlineText: {
    color: colors.white,
  },
  textText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.button,
  },
  disabledText: {
    color: colors.disabledText,
  },
});
