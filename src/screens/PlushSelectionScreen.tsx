import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../localization/i18n';
import { NavigationProp } from '../navigation/navigationTypes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Selectable } from '../components/Selectable';
import { Button } from '../components/Button';

interface LovabiesOption {
  id: string;
  image: any;
  name: string;
}

const LOVABIES_OPTIONS: LovabiesOption[] = [
  { id: 'zeezee', image: require('../assets/zeezee_full.png'), name: 'ZeeZee' },
  { id: 'guffy', image: require('../assets/guffy_full.png'), name: 'Guffy' },
];

export const PlushSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isLandscape = useMemo(() => width > height, [width, height]);
  const isTablet = useMemo(() => Math.min(width, height) >= 600, [width, height]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedId) return;
    navigation.navigate('ParentalGate', {
      targetScreen: 'LandingHome',
      targetParams: {
        selectedPlushId: selectedId,
      },
    });
  }, [navigation, selectedId]);

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

  const textSection = (
    <View style={styles.textSection}>
      <Text style={[styles.title, isLandscape && styles.textLeftAlign]}>
        {t('plush_selection_title')}
      </Text>
      <Text style={[styles.subtitle, isLandscape && styles.textLeftAlign]}>
        {t('plush_selection_subtitle')}
      </Text>
    </View>
  );

  const listOptions = (
    <View style={isLandscape ? styles.cardsRowLandscape : styles.cardsColumn}>
      {LOVABIES_OPTIONS.map((item) => (
        <Selectable.Root
          key={item.id}
          selected={selectedId === item.id}
          onPress={() => handleSelect(item.id)}
          style={[styles.selectableCard, isLandscape && styles.selectableCardLandscape]}
        >
          <Image
            source={item.image}
            style={[
              styles.cardImage,
              !isLandscape && { transform: [{ scale: item.id === 'zeezee' ? 1.3 : 1.1 }] }
            ]}
            resizeMode="cover"
          />
        </Selectable.Root>
      ))}
    </View>
  );

  const buttonsSection = (
    <View style={styles.confirmWrapper}>
      <Button.Root
        variant="primary"
        disabled={!selectedId}
        onPress={handleContinue}
        style={styles.continueButton}
      >
        <Button.Text>{t('parent_gate_verify')}</Button.Text>
      </Button.Root>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
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
              {textSection}
              {buttonsSection}
            </View>
            <View style={rightColumnStyles}>
              {listOptions}
            </View>
          </View>
        ) : (
          <View style={containerStyles}>
            {textSection}
            {listOptions}
            {buttonsSection}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(PlushSelectionScreen);

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
    paddingHorizontal: 24,
  },
  containerTablet: {
    paddingHorizontal: 64,
  },
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
    backgroundColor: colors.background,
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
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  cardsColumn: {
    width: '100%',
    marginVertical: 12,
  },
  cardsRowLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectableCard: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 0,
    marginVertical: 10,
  },
  selectableCardLandscape: {
    flex: 1,
    marginHorizontal: 8,
    height: 190,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  confirmWrapper: {
    width: '100%',
    marginTop: 16,
  },
  continueButton: {
    width: '100%',
  },
  innerWrapper: {
    width: '100%',
  },
  innerWrapperLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  leftColumn: {
    width: '100%',
  },
  leftColumnLandscape: {
    flex: 1,
    paddingRight: 24,
    justifyContent: 'center',
  },
  rightColumn: {
    width: '100%',
  },
  rightColumnLandscape: {
    flex: 1.8,
    justifyContent: 'center',
  },
  textSection: {
    marginBottom: 20,
  },
  textLeftAlign: {
    textAlign: 'left',
    paddingHorizontal: 0,
  },
});
