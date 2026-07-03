import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, TranslationKeys } from '../localization/i18n';
import { NavigationProp } from '../navigation/navigationTypes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Button } from '../components/Button';

interface BenefitItem {
  id: number;
  labelKey: TranslationKeys;
  appOnly: boolean;
  appPlush: boolean;
}

const TABLE_ROWS: BenefitItem[] = [
  { id: 1, labelKey: 'benefit_1', appOnly: true, appPlush: true },
  { id: 2, labelKey: 'benefit_2', appOnly: true, appPlush: true },
  { id: 3, labelKey: 'benefit_3', appOnly: false, appPlush: true },
  { id: 4, labelKey: 'benefit_4', appOnly: false, appPlush: true },
  { id: 5, labelKey: 'benefit_5', appOnly: false, appPlush: true },
  { id: 6, labelKey: 'benefit_6', appOnly: false, appPlush: true },
  { id: 7, labelKey: 'benefit_7', appOnly: false, appPlush: true },
  { id: 8, labelKey: 'benefit_8', appOnly: false, appPlush: true },
  { id: 9, labelKey: 'benefit_9', appOnly: false, appPlush: true },
];

export const ComparisonScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = useMemo(() => width > height, [width, height]);
  const isTablet = useMemo(() => Math.min(width, height) >= 600, [width, height]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    navigation.navigate('ParentalGate', {
      targetScreen: 'LandingHome',
      targetParams: {},
    });
  }, [navigation]);

  const handleBuyToy = useCallback(() => {
    // Navigates to plush picker (Lovabies selection screen)
    navigation.navigate('PlushSelection');
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

  const rightColumnStyles = useMemo(() => [
    styles.rightColumn,
    isLandscape && styles.rightColumnLandscape,
  ], [isLandscape]);

  const renderBadge = (active: boolean) => {
    return active ? (
      <View style={styles.badgeCheck}>
        <Text style={styles.badgeText}>✓</Text>
      </View>
    ) : (
      <View style={styles.badgeCross}>
        <Text style={styles.badgeText}>✕</Text>
      </View>
    );
  };

  const textSection = (
    <View style={styles.textSection}>
      <Text style={[styles.title, isLandscape && styles.textLeftAlign]}>
        {t('comparison_title')}
      </Text>
      <Text style={[styles.subtitle, isLandscape && styles.textLeftAlign]}>
        {t('comparison_subtitle')}
      </Text>
    </View>
  );

  const comparisonTable = (
    <View style={styles.tableCard}>
      {/* Table Header */}
      <View style={styles.tableRowHeader}>
        <View style={styles.colFeature} />
        <View style={styles.colIndicator}>
          <Text style={styles.headerText}>App{"\n"}only</Text>
        </View>
        <View style={styles.colIndicator}>
          <Text style={styles.headerText}>App +{"\n"}Plush</Text>
        </View>
      </View>

      {/* Table Rows */}
      {TABLE_ROWS.map((row) => (
        <View key={row.id} style={styles.tableRow}>
          <View style={styles.colFeature}>
            <Text style={styles.rowLabelText}>{t(row.labelKey)}</Text>
          </View>
          <View style={styles.colIndicator}>
            {renderBadge(row.appOnly)}
          </View>
          <View style={styles.colIndicator}>
            {renderBadge(row.appPlush)}
          </View>
        </View>
      ))}
    </View>
  );

  const buttonsSection = (
    <View style={styles.buttonContainer}>
      <Button.Root
        variant="primary"
        onPress={handleBuyToy}
        style={styles.actionButton}
      >
        <Button.Text>{t('comparison_btn')}</Button.Text>
      </Button.Root>

      <Button.Root
        variant="secondary"
        onPress={handleContinue}
        style={styles.actionButton}
      >
        <Button.Text>{t('comparison_btn_later')}</Button.Text>
      </Button.Root>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.headerBar}>
        <Button.Root
          variant="primary"
          onPress={handleBack}
          borderRadius={12}
          width={54}
          height={54}
          stretch={false}
          style={styles.backBtn}
        >
          <Icon name="chevron-left" size={24} color={colors.white} />
        </Button.Root>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {isLandscape ? (
          <View style={innerWrapperStyles}>
            <View style={leftColumnStyles}>
              <Image
                source={require('../assets/Img2.png')}
                style={styles.illustrationLandscape}
                resizeMode="cover"
              />
              {textSection}
              {buttonsSection}
            </View>
            <View style={rightColumnStyles}>
              {comparisonTable}
            </View>
          </View>
        ) : (
          <View style={containerStyles}>
            <Image
              source={require('../assets/Img2.png')}
              style={styles.illustration}
              resizeMode="cover"
            />
            <View style={styles.portraitContent}>
              {textSection}
              {comparisonTable}
              {buttonsSection}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ComparisonScreen);

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
    justifyContent: 'flex-start',
  },
  containerLandscape: {
    paddingHorizontal: 24,
  },
  containerTablet: {
    paddingHorizontal: 48,
  },
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
    backgroundColor: colors.background,
  },
  illustration: {
    width: '100%',
    height: 180,
  },
  illustrationLandscape: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
  },
  portraitContent: {
    padding: 24,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginVertical: 0,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.heading,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  textSection: {
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 12,
  },
  actionButton: {
    width: '100%',
    marginVertical: 6,
  },
  tableCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 8,
    marginVertical: 12,
  },
  tableRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  colFeature: {
    flex: 1.8,
    paddingLeft: 8,
  },
  colIndicator: {
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 14,
  },
  rowLabelText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  badgeCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCross: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  innerWrapper: {
    width: '100%',
  },
  innerWrapperLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  leftColumn: {
    width: '100%',
  },
  leftColumnLandscape: {
    flex: 1,
    marginRight: 24,
  },
  rightColumn: {
    width: '100%',
  },
  rightColumnLandscape: {
    flex: 1.2,
  },
  textLeftAlign: {
    textAlign: 'left',
  },
});
