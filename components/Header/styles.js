import { StyleSheet } from 'react-native';
import theme from '../../modules/theme';

const borderRadius = 20;

const { accent, black } = theme.colors;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 80,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: accent
  },
  headerIcon: {
    borderRadius: 30,
    color: black
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: black,
    flex: 0.7
  },

});

export default styles;
