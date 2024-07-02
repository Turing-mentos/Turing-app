import React from 'react';
import {SvgProps} from 'react-native-svg';

import * as Icons from './';

export type IconTypes = keyof typeof Icons;

type IconProps = SvgProps & {
  // res 에서 re-export 되는 SVG 파일들의 이름을 name 으로 받을 수 있다.
  name: IconTypes;
  size?: number;
};
function Icon({
  name,
  width: _width,
  height: _height,
  size,
  ...props
}: IconProps) {
  const Comp = Icons[name];
  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
  };

  return <Comp {...props} {...sizeProps} />;
}

export default Icon;
