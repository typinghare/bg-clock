import {
    Badge,
    BadgeProps,
    Box,
    BoxProps,
    Card,
    CardBody,
    ListItem,
    TabPanel,
    UnorderedList,
} from '@chakra-ui/react'
import { Changelog, Changelogs, ChangelogSections } from './Changelog'
import moment from 'moment'
import { Horizontal } from '../Horizontal'

/**
 * Changelog panel.
 */
export function ChangelogPanel() {
    const changelogList: Changelog[] = Changelogs.getChangelogList()

    return (
        <TabPanel padding="1rem 0">
            {changelogList.map(((changelog, index) => (
                <ChangelogBlock key={index} changelog={changelog} />
            )))}
        </TabPanel>
    )
}

function ChangelogBlock(props: ChangelogBlockProps) {
    const { changelog } = props
    const sectionNameList: (keyof ChangelogSections)[] = ['added', 'improved', 'fixed']

    return (
        <Card mb={3}>
            <CardBody>
                <Box fontSize="1.15rem" fontWeight="bold">
                    {changelog.getVersion()}
                </Box>

                <Box fontSize="0.9rem" color="grey">
                    {moment(changelog.getDate()).format('MMM DD, YYYY')}
                </Box>

                <Horizontal width="85%" margin="0.25rem 0" />

                {sectionNameList.map((name, index) => (
                    <ChangelogSection
                        key={index}
                        sectionName={name}
                        section={changelog.getSection(name)}
                        marginBlock="2"
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
            <UnorderedList marginLeft="1.5em">
                {section.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </UnorderedList>
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
