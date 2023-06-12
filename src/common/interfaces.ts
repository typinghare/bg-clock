import { SxProps } from '@mui/material'

export type MuiStyle<Theme extends object = any> = SxProps<Theme>

export type MuiStyles<S extends string = any> = Record<S, MuiStyle>