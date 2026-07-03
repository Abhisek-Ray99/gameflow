import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../localization/i18n';
import { NavigationProp } from '../navigation/navigationTypes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Selectable } from '../components/Selectable';
import { Button } from '../components/Button';

export const LanguageSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { locale, setLocale, t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = useMemo(() => width > height, [width, height]);
  const isTablet = useMemo(() => Math.min(width, height) >= 600, [width, height]);

  const handleSelectEnglish = useCallback(() => {
    setLocale('en');
  }, [setLocale]);

  const handleSelectPolish = useCallback(() => {
    setLocale('pl');
  }, [setLocale]);

  const handleConfirm = useCallback(() => {
    navigation.navigate('Welcome');
  }, [navigation]);

  const containerStyles = useMemo(() => [
    styles.container,
    isLandscape && styles.containerLandscape,
    isTablet && styles.containerTablet,
  ], [isLandscape, isTablet]);

  const innerWrapperStyles = useMemo(() => [
    styles.innerWrapper,
    isLandscape && styles.innerWrapperLandscape,
  ], [isLandscape]);

  const leftColumnStyles = useMemo(() => [
    styles.leftColumn,
    isLandscape && styles.leftColumnLandscape,
  ], [isLandscape]);

  const optionsSectionStyles = useMemo(() => [
    styles.optionsSection,
    isLandscape && styles.optionsSectionLandscape,
  ], [isLandscape]);

  const textSection = (
    <View style={styles.textSection}>
      <Text style={styles.title}>
        {t('lang_selection_title')}
      </Text>
      <Text style={styles.subtitle}>
        {t('lang_selection_subtitle')}
      </Text>
    </View>
  );

  const optionsSection = (
    <View style={optionsSectionStyles}>
      <Selectable.Root
        selected={locale === 'en'}
        onPress={handleSelectEnglish}
        style={styles.selectableOption}
      >
        <Selectable.Indicator type="radio" style={styles.indicatorLeft} />
        <Selectable.Label style={styles.optionLabel}>{t('english')}</Selectable.Label>
      </Selectable.Root>

      <Selectable.Root
        selected={locale === 'pl'}
        onPress={handleSelectPolish}
        style={styles.selectableOption}
      >
        <Selectable.Indicator type="radio" style={styles.indicatorLeft} />
        <Selectable.Label style={styles.optionLabel}>{t('polish')}</Selectable.Label>
      </Selectable.Root>

      <Button.Root
        variant="primary"
        onPress={handleConfirm}
        style={styles.confirmButton}
      >
        <Button.Text>{t('confirm')}</Button.Text>
      </Button.Root>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={containerStyles}>
          {isLandscape ? (
            <View style={innerWrapperStyles}>
              <View style={leftColumnStyles}>
                {textSection}
              </View>
              {optionsSection}
            </View>
          ) : (
            <View style={innerWrapperStyles}>
              {textSection}
              {optionsSection}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(LanguageSelectionScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  containerLandscape: {
    paddingHorizontal: 48,
  },
  containerTablet: {
    paddingHorizontal: 96,
  },
  innerWrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  innerWrapperLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '100%',
    alignItems: 'stretch',
  },
  leftColumnLandscape: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 32,
  },
  textSection: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.white,
    marginBottom: 12,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'left',
  },
  optionLabel: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.white,
  },
  optionsSection: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  optionsSectionLandscape: {
    flex: 1.2,
  },
  selectableOption: {
    marginVertical: 8,
  },
  indicatorLeft: {
    marginRight: 16,
  },
  confirmButton: {
    marginTop: 24,
  },
});