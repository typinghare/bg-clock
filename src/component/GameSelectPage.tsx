import { Page } from './Page'
import { PageEnum } from '../redux/slice/PageSlice'
import bannerChess from '../assets/images/banner-chess.png'

export function GameSelectPage(): JSX.Element {
    return (
        <Page pageIndex={PageEnum.GAME_SELECT}>
            <img src={bannerChess} alt={''} />
        </Page>
    )
}