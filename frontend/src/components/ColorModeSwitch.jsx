import { IconButton, useColorMode, useColorModeValue, DarkMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";


const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('blue.500', 'blue.400')
  const color = useColorModeValue('white', 'gray.800')

  return (
    <DarkMode>
      <IconButton onClick={() => toggleColorMode()} bg={bg} color={color}>
        {colorMode === 'light' ? <FaMoon /> : <IoSunny size='50%' />}
      </IconButton>
    </DarkMode>

  )
}

export default ColorModeSwitch;
