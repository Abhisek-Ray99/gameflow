import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../../localization/i18n';
import { NavigationProp, RoutePropType } from '../../navigation/navigationTypes';
import { colors } from '../../theme/colors';
import { styles } from './styles';
import { Button } from '../../components/Button';

interface EquationState {
  text: string;
  answer: number;
}

const generateEquation = (): EquationState => {
  const a = Math.floor(Math.random() * 5) + 5; // 5 to 9
  const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
  const c = Math.floor(Math.random() * 4) + 2; // 2 to 5
  return {
    text: `${a} X (${b} + ${c})`,
    answer: a * (b + c),
  };
};

export const ParentalGateScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType<'ParentalGate'>>();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const { targetScreen, targetParams } = route.params;

  const [equation, setEquation] = useState<EquationState>(() => generateEquation());
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const isLandscape = useMemo(() => width > height, [width, height]);
  const isTablet = useMemo(() => Math.min(width, height) >= 600, [width, height]);

  const handleVerify = useCallback(() => {
    const userAnswer = parseInt(inputValue.trim(), 10);
    if (userAnswer === equation.answer) {
      // Successful verification -> reset stack to the target screen (LandingHome)
      navigation.reset({
        index: 0,
        routes: [{ name: targetScreen, params: targetParams }],
      });
    } else {
      setHasError(true);
      setInputValue('');
      // Generate a new equation for retry
      setEquation(generateEquation());
    }
  }, [inputValue, equation, navigation, targetScreen, targetParams]);

  const handleCancel = useCallback(() => {
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

  const textSection = (
    <View style={styles.textSection}>
      <Text style={[styles.title, isLandscape && styles.textLeftAlign]}>
        {t('parent_gate_title')}
      </Text>
      <Text style={[styles.subtitle, isLandscape && styles.textLeftAlign]}>
        {t('parent_gate_subtitle')}
      </Text>
    </View>
  );

  const equationSection = (
    <Text style={styles.equationText}>{equation.text}</Text>
  );

  const inputFormSection = (
    <View style={styles.formContainer}>
      <View style={styles.inputCard}>
        <TextInput
          style={styles.textInput}
          placeholder={t('parent_gate_placeholder')}
          placeholderTextColor="#A0A0A0"
          keyboardType="number-pad"
          value={inputValue}
          onChangeText={(val) => {
            setHasError(false);
            setInputValue(val);
          }}
          onSubmitEditing={handleVerify}
          returnKeyType="done"
        />
      </View>
      
      {hasError && <Text style={styles.errorText}>{t('parent_gate_error')}</Text>}

      <Button.Root
        variant="primary"
        onPress={handleVerify}
        disabled={!inputValue.trim()}
        style={styles.actionBtn}
      >
        <Button.Text>{t('parent_gate_verify')}</Button.Text>
      </Button.Root>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.headerBar}>
        <Button.Root
          variant="primary"
          onPress={handleCancel}
          borderRadius={12}
          width={54}
          height={54}
          stretch={false}
          style={styles.backBtn}
        >
          <Icon name="chevron-left" size={24} color={colors.white} />
        </Button.Root>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          {isLandscape ? (
            <View style={innerWrapperStyles}>
              <View style={leftColumnStyles}>
                {textSection}
                {equationSection}
              </View>
              <View style={rightColumnStyles}>
                {inputFormSection}
              </View>
            </View>
          ) : (
            <View style={containerStyles}>
              {textSection}
              {equationSection}
              {inputFormSection}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ParentalGateScreen);
