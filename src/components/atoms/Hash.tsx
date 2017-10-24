import * as React from 'react';
import { ClassNameProps } from 'poet-js';

import { CopyableText } from './CopyableText';

import './Hash.scss';

interface HashProps extends ClassNameProps {
  readonly children?: any
  readonly textClickable?: boolean;
}

export const Hash = (props: HashProps) => (
  <CopyableText text={props.children.toString()} textClickable={props.textClickable} className={props.className} >{props.children.toString().firstAndLastCharacters(6)}</CopyableText>
);