import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../localization/i18n';
import { NavigationProp } from '../navigation/navigationTypes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { Button } from '../components/Button';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = useMemo(() => width > height, [width, height]);
  const isTablet = useMemo(() => Math.min(width, height) >= 600, [width, height]);

  const handleYesPress = useCallback(() => {
    navigation.navigate('PlushSelection');
  }, [navigation]);

  const handleNoPress = useCallback(() => {
    navigation.navigate('Comparison');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
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

  const illustrationStyles = useMemo(() => [
    styles.illustration,
    isLandscape && styles.illustrationLandscape,
  ], [isLandscape]);

  const textSection = (
    <View style={styles.textSection}>
      <Text style={[styles.welcomeText, isLandscape && styles.textLeftAlign]}>{t('welcome_title')}</Text>
      <Text style={[styles.subtitleText, isLandscape && styles.textLeftAlign]}>{t('welcome_subtitle')}</Text>
    </View>
  );

  const buttonsSection = (
    <View style={styles.buttonContainer}>
      <Button.Root
        variant="primary"
        onPress={handleYesPress}
        style={styles.ctaButton}
      >
        <Button.Text>{t('welcome_yes')}</Button.Text>
      </Button.Root>

      <Button.Root
        variant="secondary"
        onPress={handleNoPress}
        style={styles.ctaButton}
      >
        <Button.Text>{t('welcome_no')}</Button.Text>
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
                source={require('../assets/Img1.png')}
                style={illustrationStyles}
                resizeMode="cover"
              />
            </View>
            <View style={rightColumnStyles}>
              {textSection}
              {buttonsSection}
            </View>
          </View>
        ) : (
          <View style={containerStyles}>
            <Image
              source={require('../assets/Img1.png')}
              style={illustrationStyles}
              resizeMode="cover"
            />
            <View style={styles.portraitContent}>
              {textSection}
              {buttonsSection}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(WelcomeScreen);

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
    paddingHorizontal: 32,
  },
  containerTablet: {
    paddingHorizontal: 64,
  },
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  illustration: {
    width: '100%',
    height: 460,
  },
  illustrationLandscape: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  portraitContent: {
    padding: 24,
    alignItems: 'stretch',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginVertical: 0,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
    lineHeight: 24,
    textAlign: 'center',
  },
  textSection: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },
  ctaButton: {
    width: '100%',
    marginVertical: 8,
  },
  innerWrapper: {
    width: '100%',
  },
  innerWrapperLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftColumn: {
    width: '100%',
  },
  leftColumnLandscape: {
    flex: 1,
    height: 260,
    marginRight: 24,
  },
  rightColumn: {
    width: '100%',
  },
  rightColumnLandscape: {
    flex: 1,
    justifyContent: 'center',
  },
  textLeftAlign: {
    textAlign: 'left',
  },
});
