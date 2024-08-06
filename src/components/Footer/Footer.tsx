import './Footer.css'

const Footer = () => {

    return (
        <footer >
            <div className="footer__logo">
                <img src='/AllTiips-Sfundo.png' alt='All Tiips' />
                <h1>All Tiips - Score</h1>
            </div>

            <span className="footer__divider"></span>

            <div className="footer__content">

                <div className="footer__content-item">
                    <h3>Aposte</h3>
                    <nav>
                        <a href='https://www.365sb.com/#/HO/' target='_blank'>bet365</a>
                        <a href='https://br.betano.com/' target='_blank'>Betano</a>
                        <a href='https://pixbet.com/' target='_blank'>PixBet</a>
                        <a href='' target='_blank'>Sportingbet</a>
                    </nav>
                </div>
 
                <div className="footer__content-item">
                    <h3>Links</h3>
                    <nav>
                        <a href='https://t.me/AllTiips' target='_blank'>Telegram</a>
                        <a href='' target='_blank'>WhatsApp</a>
                        <a href='https://www.instagram.com/all_tiips.bet/?utm_source=ig_web_button_share_sheet' target='_blank'>Instagram</a>
                        <a href='https://www.facebook.com/herbert.richards.9237' target='_blank'>Facebook</a>
                    </nav>
                </div>

            </div>

            <span className="footer__divider"></span>

            <p>&#169; 2024 - All Enterprise /  Todos os Direitos Reservados</p>

        </footer>
    )
}

export default Footer