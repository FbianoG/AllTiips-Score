import './Header.css'

const Header = () => {

    return (
        <header>
            <div className='logo'>
                <img src="/AllTiips-Sfundo.png" alt="" />
            </div>
            <a href='https://t.me/AllTiips' target='_blank'>
            <i className="fa-brands fa-telegram"></i>
                Telegram
            </a>
        </header>
    )
}

export default Header