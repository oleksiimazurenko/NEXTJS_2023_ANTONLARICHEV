import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IHtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>{
	tag: 'h1' | 'h2' | 'h3';
	children: ReactNode;
}