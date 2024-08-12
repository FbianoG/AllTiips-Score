import './Footer.css'

const Footer = () => {

    return (
        <footer >
            <div className="footer__logo">
                <img src='/AllTiips-Sfundo.png' alt='All Tiips' />
                <h1>All Tiips - Score</h1>
                <nav>
                    <a href='https://t.me/AllTiips' target='_blank'><i className="fa-brands fa-telegram"></i></a>
                    <a href='' target='_blank'><i className="fa-brands fa-whatsapp"></i></a>
                    <a href='https://www.facebook.com/herbert.richards.9237' target='_blank'><i className="fa-brands fa-facebook"></i></a>
                    <a href='https://www.instagram.com/all_tiips.bet/?utm_source=ig_web_button_share_sheet' target='_blank'><i className="fa-brands fa-instagram"></i></a>
                </nav>
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
                    <h3>Políticas e Termos</h3>
                    <nav>
                        <a href=''>Política de Privacidade</a>
                        <a href=''>Termos de Uso</a>
                        <a href=''>Política de Cookies</a>
                        <a href=''>Avisos Legais</a>
                    </nav>
                </div>
                <div className="footer__content-item">
                    <h3>FAQ</h3>
                    <nav>
                        <a href=''>Perguntas Frequentes</a>
                        <a href=''>Sobre Nós</a>
                        <a href=''>API</a>
                        {/* <a href=''></a> */}
                    </nav>
                </div>

            </div>

            <span className="footer__divider"></span>

            <p>&#169; 2024 - All Enterprise /  Todos os Direitos Reservados</p>

        </footer>
    )
}

export default Footer