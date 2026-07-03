import React, { createContext, useContext, useMemo } from 'react';
import { Pressable, StyleSheet, View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface SelectableContextProps {
  selected: boolean;
}

const SelectableContext = createContext<SelectableContextProps>({
  selected: false,
});

interface SelectableRootProps {
  children: React.ReactNode;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SelectableRoot: React.FC<SelectableRootProps> = React.memo(({
  children,
  selected,
  onPress,
  style,
}) => {
  const contextValue = useMemo(() => ({ selected }), [selected]);

  const rootStyle = useMemo(() => {
    return ({ pressed }: { pressed: boolean }) => [
      styles.baseRoot,
      selected ? styles.selectedRoot : styles.unselectedRoot,
      pressed && styles.pressedRoot,
      style,
    ] as StyleProp<ViewStyle>;
  }, [selected, style]);

  return (
    <SelectableContext.Provider value={contextValue}>
      <Pressable onPress={onPress} style={rootStyle}>
        {children}
      </Pressable>
    </SelectableContext.Provider>
  );
});

interface SelectableIconProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SelectableIcon: React.FC<SelectableIconProps> = React.memo(({ children, style }) => {
  const iconStyle = useMemo(() => [styles.iconContainer, style], [style]);
  return <View style={iconStyle}>{children}</View>;
});

interface SelectableLabelProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

const SelectableLabel: React.FC<SelectableLabelProps> = React.memo(({ children, style }) => {
  const { selected } = useContext(SelectableContext);

  const labelStyle = useMemo(() => [
    styles.label,
    selected ? styles.selectedLabel : styles.unselectedLabel,
    style,
  ], [selected, style]);

  return <Text style={labelStyle}>{children}</Text>;
});

interface SelectableIndicatorProps {
  type?: 'radio' | 'checkbox';
  style?: StyleProp<ViewStyle>;
}

const SelectableIndicator: React.FC<SelectableIndicatorProps> = React.memo(({
  type = 'radio',
  style,
}) => {
  const { selected } = useContext(SelectableContext);

  const indicatorStyle = useMemo(() => [
    type === 'radio' ? styles.radioOuter : styles.checkboxOuter,
    selected ? styles.indicatorOuterSelected : styles.indicatorOuterUnselected,
    style,
  ], [type, selected, style]);

  return (
    <View style={indicatorStyle}>
      {selected && (
        <View style={type === 'radio' ? styles.radioInner : styles.checkboxInner} />
      )}
    </View>
  );
});

export const Selectable = Object.assign(SelectableRoot, {
  Root: SelectableRoot,
  Icon: SelectableIcon,
  Label: SelectableLabel,
  Indicator: SelectableIndicator,
});

const styles = StyleSheet.create({
  baseRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginVertical: 6,
    minHeight: 64,
  },
  selectedRoot: {
    borderColor: colors.white,
    backgroundColor: colors.cardBackground,
    borderWidth: 3.5,
  },
  unselectedRoot: {
    borderColor: 'transparent',
    backgroundColor: colors.cardBackground,
    borderWidth: 3.5,
  },
  pressedRoot: {
    opacity: 0.9,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  selectedLabel: {
    color: colors.white,
  },
  unselectedLabel: {
    color: colors.white,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  checkboxOuter: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  indicatorOuterSelected: {
    borderColor: colors.white,
  },
  indicatorOuterUnselected: {
    borderColor: colors.white,
  },
});
