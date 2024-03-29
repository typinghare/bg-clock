import { Badge, BadgeProps, Box, BoxProps, Card, CardBody, List, ListItem, TabPanel } from '@chakra-ui/react'
import { Changelog, Changelogs, ChangelogSections } from '../../changelog'
import { StyleMap } from '../../common/style'
import moment from 'moment'
import { Horizontal } from '../Horizontal'

/**
 * Changelog panel.
 */
export function ChangelogPanel() {
    const changelogList: Changelog[] = Changelogs.getChangelogList()

    return (
        <TabPanel sx={{ padding: '1rem 0' }}>
            {changelogList.map(((changelog, index) => (
                <ChangelogBlock key={index} changelog={changelog} />
            )))}
        </TabPanel>
    )
}

function ChangelogBlock(props: ChangelogBlockProps) {
    const { changelog } = props
    const styles: StyleMap = {
        version: {
            fontSize: '1.15rem',
            fontWeight: 'bold',
        },
        date: {
            fontSize: '0.9rem',
            color: 'grey',
        },

    }

    const sectionNameList: (keyof ChangelogSections)[] = ['added', 'improved', 'fixed']

    return (
        <Card mb={3}>
            <CardBody>
                <Box sx={styles.version}>
                    {changelog.getVersion()}
                </Box>

                <Box sx={styles.date}>
                    {moment(changelog.getDate()).format('MMM DD, YYYY')}
                </Box>

                <Horizontal width="85%" margin="0.25rem 0" />

                {sectionNameList.map((name, index) => (
                    <ChangelogSection
                        key={index}
                        sectionName={name}
                        section={changelog.getSection(name)}
                        mb="1"
                    />
                ))}
            </CardBody>
        </Card>
    )
}

const sectionNameColorSchemeMap: Record<keyof ChangelogSections, BadgeProps['colorScheme']> = {
    added: 'green',
    improved: 'linkedin',
    fixed: 'red',
}

function ChangelogSection(props: ChangelogSectionProps) {
    const { sectionName, section, ...boxProps } = props

    if (section.length === 0) {
        return (<></>)
    }

    return (
        <Box {...boxProps}>
            <Badge colorScheme={sectionNameColorSchemeMap[sectionName]}>
                {sectionName}
            </Badge>
            <List>
                {section.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </List>
        </Box>
    )
}

interface ChangelogBlockProps {
    changelog: Changelog
}

interface ChangelogSectionProps extends BoxProps {
    sectionName: keyof ChangelogSections
    section: ChangelogSections[keyof ChangelogSections]
}