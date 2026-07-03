import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../localization/i18n';
import { RoutePropType, NavigationProp } from '../navigation/navigationTypes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface PlushConfig {
  name: string;
  image: any;
}

const PLUSH_CONFIGS: Record<string, PlushConfig> = {
  zeezee: { name: 'ZeeZee', image: require('../assets/zeezee.png') },
  guffy: { name: 'Guffy', image: require('../assets/guffy.png') },
};

interface FeatureItem {
  id: string;
  emoji: string;
  titleKey: 'landing_card_games' | 'landing_card_stories' | 'landing_card_music' | 'landing_card_parent';
  descKey: 'landing_card_games_desc' | 'landing_card_stories_desc' | 'landing_card_music_desc' | 'landing_card_parent_desc';
  color: string;
}

const FEATURES: FeatureItem[] = [
  { id: 'games', emoji: '🎮', titleKey: 'landing_card_games', descKey: 'landing_card_games_desc', color: '#DB1A4E' },
  { id: 'stories', emoji: '📖', titleKey: 'landing_card_stories', descKey: 'landing_card_stories_desc', color: '#2C2263' },
  { id: 'music', emoji: '🎵', titleKey: 'landing_card_music', descKey: 'landing_card_music_desc', color: '#FFB300' },
  { id: 'parent', emoji: '⚙️', titleKey: 'landing_card_parent', descKey: 'landing_card_parent_desc', color: '#FFDF17' },
];

export const LandingHomeScreen: React.FC = () => {
  const route = useRoute<RoutePropType<'LandingHome'>>();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const selectedPlushId = route.params?.selectedPlushId;
  const plushInfo = useMemo(() => {
    if (selectedPlushId && PLUSH_CONFIGS[selectedPlushId]) {
      return PLUSH_CONFIGS[selectedPlushId];
    }
    return null;
  }, [selectedPlushId]);

  const isLandscape = useMemo(() => width > height, [width, height]);
  const isTablet = useMemo(() => Math.min(width, height) >= 600, [width, height]);

  const handleRestart = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelection' }],
    });
  }, [navigation]);

  const containerStyles = useMemo(() => [
    styles.container,
    isLandscape && styles.containerLandscape,
    isTablet && styles.containerTablet,
  ], [isLandscape, isTablet]);

  const mainLayoutStyles = useMemo(() => [
    styles.mainLayout,
    isLandscape && styles.mainLayoutLandscape,
  ], [isLandscape]);

  const leftPanelStyles = useMemo(() => [
    styles.leftPanel,
    isLandscape && styles.leftPanelLandscape,
  ], [isLandscape]);

  const rightPanelStyles = useMemo(() => [
    styles.rightPanel,
    isLandscape && styles.rightPanelLandscape,
  ], [isLandscape]);

  const featureGridStyles = useMemo(() => [
    styles.featureGrid,
    isLandscape && styles.featureGridLandscape,
  ], [isLandscape]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={containerStyles}>
          {/* Dashboard Header */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{t('landing_title')}</Text>
              <Text style={styles.headerSubtitle}>{t('landing_subtitle')}</Text>
            </View>
            <Button.Root variant="outline" onPress={handleRestart} style={styles.restartBtn}>
              <Button.Text style={styles.restartBtnText}>↩</Button.Text>
            </Button.Root>
          </View>

          {/* Main Layout (Split-screen on Landscape, stacked on Portrait) */}
          <View style={mainLayoutStyles}>
            
            {/* Left Panel: Active Plush Status */}
            <View style={leftPanelStyles}>
              {plushInfo ? (
                <Card.Root style={styles.plushCard}>
                  <Card.Header>
                    <Text style={styles.plushCardTitle}>⚡ Active Buddy</Text>
                  </Card.Header>
                  <Card.Body style={styles.plushCardBody}>
                    <View style={styles.imageContainer}>
                      <Image source={plushInfo.image} style={styles.plushCutout} resizeMode="contain" />
                    </View>
                    <Text style={styles.plushGreeting}>{t('landing_greeting')}</Text>
                    <Text style={styles.plushName}>{plushInfo.name}</Text>
                  </Card.Body>
                </Card.Root>
              ) : (
                <Card.Root style={styles.plushCard}>
                  <Card.Header>
                    <Text style={styles.plushCardTitle}>⚡ Demo Mode</Text>
                  </Card.Header>
                  <Card.Body style={styles.plushCardBody}>
                    <View style={styles.imageContainer}>
                      <Text style={styles.largeEmoji}>📱</Text>
                    </View>
                    <Text style={styles.plushGreeting}>{t('landing_no_plush')}</Text>
                  </Card.Body>
                </Card.Root>
              )}
            </View>

            {/* Right Panel: Feature Dashboard */}
            <View style={rightPanelStyles}>
              <View style={featureGridStyles}>
                {FEATURES.map((item) => (
                  <Card.Root key={item.id} style={styles.featureCard}>
                    <View style={styles.featureHeader}>
                      <View style={[styles.featureIconContainer, { backgroundColor: item.color }]}>
                        <Text style={styles.featureEmoji}>{item.emoji}</Text>
                      </View>
                    </View>
                    <Card.Body style={styles.featureBody}>
                      <Text style={styles.featureTitle}>{t(item.titleKey)}</Text>
                      <Text style={styles.featureDesc}>{t(item.descKey)}</Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(LandingHomeScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    padding: 24,
  },
  containerLandscape: {
    paddingHorizontal: 32,
  },
  containerTablet: {
    paddingHorizontal: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
    marginTop: 4,
  },
  restartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 0,
    marginVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
  },
  restartBtnText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  mainLayout: {
    flexDirection: 'column',
    gap: 16,
  },
  mainLayoutLandscape: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftPanel: {
    width: '100%',
  },
  leftPanelLandscape: {
    width: '35%',
  },
  rightPanel: {
    width: '100%',
  },
  rightPanelLandscape: {
    width: '65%',
  },
  plushCard: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
  },
  plushCardTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  plushCardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    marginVertical: 12,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  plushCutout: {
    width: 110,
    height: 110,
  },
  largeEmoji: {
    fontSize: 54,
  },
  plushGreeting: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  plushName: {
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.white,
    textAlign: 'center',
    marginTop: 4,
  },
  featureGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  featureGridLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureCard: {
    padding: 16,
    marginVertical: 0,
    flex: 1,
    minWidth: 220,
    backgroundColor: colors.cardBackground,
  },
  featureHeader: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureBody: {
    flex: 0,
    marginBottom: 0,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
