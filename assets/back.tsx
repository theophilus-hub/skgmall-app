import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512" width={24} height={24} {...props}>
    <Path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="M244 400 100 256l144-144M120 256h292"
    />
  </Svg>
)
export default BackIcon;