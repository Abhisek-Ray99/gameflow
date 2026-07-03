import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../theme/colors';

interface CardRootProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardRoot: React.FC<CardRootProps> = React.memo(({ children, style }) => {
  const rootStyle = React.useMemo(() => {
    return [
      styles.card,
      style,
    ];
  }, [style]);

  return <View style={rootStyle}>{children}</View>;
});

interface CardSubProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CardHeader: React.FC<CardSubProps> = React.memo(({ children, style }) => {
  const headerStyle = React.useMemo(() => [styles.header, style], [style]);
  return <View style={headerStyle}>{children}</View>;
});

const CardBody: React.FC<CardSubProps> = React.memo(({ children, style }) => {
  const bodyStyle = React.useMemo(() => [styles.body, style], [style]);
  return <View style={bodyStyle}>{children}</View>;
});

const CardFooter: React.FC<CardSubProps> = React.memo(({ children, style }) => {
  const footerStyle = React.useMemo(() => [styles.footer, style], [style]);
  return <View style={footerStyle}>{children}</View>;
});

export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.deepPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
