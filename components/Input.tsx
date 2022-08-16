import {
  Input,
  type InputProps,
  useColorMode
} from '@chakra-ui/react'

const CustomInput = (props: InputProps) => {
  const { colorMode } = useColorMode()

  return (
    <Input
      {...props}

      // style overwrites
      border='none'
      borderBottom='2px solid white'
      borderRadius='0'
      _focus={
        {
          boxShadow: 'none',
          borderColor: 'white !important',
          color: colorMode === 'dark' ? 'white' : 'gray.700',
          bgColor: colorMode === 'dark' ? 'gray.700' : 'gray.300'
        }
      }
      _hover={
        {
          borderColor: 'white !important',
          bgColor: colorMode === 'dark' ? 'gray.700' : 'gray.300',
          color: colorMode === 'dark' ? 'white' : 'gray.700'
        }
      }
      color={
        colorMode === 'dark' ? 'white' : 'gray.700'
      }
    />
  )
}

export default CustomInput