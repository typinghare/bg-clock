import { Page } from './Page'
import { PageEnum } from '../redux/slice/PageSlice'

export function PortalPage(): JSX.Element {
    return <Page pageIndex={PageEnum.PORTAL}></Page>
}