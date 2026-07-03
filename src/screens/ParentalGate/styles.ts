import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerLandscape: {
    paddingHorizontal: 32,
  },
  containerTablet: {
    paddingHorizontal: 96,
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
  textSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
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
  },
  textLeftAlign: {
    textAlign: 'left',
  },
  equationText: {
    fontSize: 48,
    fontFamily: fonts.heading,
    color: colors.yellow,
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 2,
  },
  formContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    height: 140,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  textInput: {
    flex: 1,
    width: '100%',
    fontSize: 26,
    fontFamily: fonts.bold,
    color: '#2C2263',
    textAlign: 'center',
    padding: 0,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 12,
  },
  actionBtn: {
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
    flex: 1.1,
    justifyContent: 'center',
  },
});
