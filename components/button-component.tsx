import { Button } from 'tamagui'

export default function ButtonComponent(props:any) {
  return (
    <>
      <Button bg={props.btColor} mt={ props.mt? props.mt : 40 } height={58} width={320} borderRadius={40} fontSize={22} onPress={props.func}>{props.title}</Button>
    </>
  )
}