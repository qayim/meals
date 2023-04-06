import { Text, StyleSheet, View, Pressable } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon, color, onPress, onLongPress}) {
    return (
      <Pressable onLongPress={onLongPress} onPress={onPress} style={(pressed) => pressed ? styles.pressed : null }>
        <Ionicons name={icon} size={24} color={color}/>
      </Pressable>
    )
}
export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    }
})
