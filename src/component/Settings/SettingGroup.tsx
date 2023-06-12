import { Box, BoxProps, SxProps } from '@mui/material'

export interface SettingGroupProps extends BoxProps {
    title: string
    description?: string
}

export function SettingGroup(props: SettingGroupProps): JSX.Element {
    const { title, description, children, sx, ...otherProps } = props

    function Description(): JSX.Element {
        if (description === undefined || description.length === 0) {
            return <></>
        }

        return <Box sx={styles.description}> {description} </Box>
    }

    const styles: Record<string, SxProps<any>> = {
        root: {
            marginBottom: '1em',
            ...sx,
        },
        title: {
            fontSize: '0.75em',
            margin: '0 0 0.5em 0.5em',
            fontWeight: 'bold',
            color: '#333333',
        },
        childrenContainer: {
            backgroundColor: '#F6F6F6',
            borderRadius: '0.4em',
        },
        description: {
            fontSize: '0.75em',
            color: '#333333',
            margin: '0.5em 0 0 1em',
        },
    }

    return (
        <Box sx={styles.root} {...otherProps}>
            <Box sx={styles.title}> {title} </Box>
            <Box sx={styles.childrenContainer}>
                {children}
            </Box>
            <Description />
        </Box>
    )
}