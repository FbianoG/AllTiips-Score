import './Hero.css'

const Hero = () => {

    return (
        <div className="hero">
            <div className="hero__data">
                <h2>Bem vindo ao</h2>
                <h2>All Tiips - Score</h2>
                <p>Nosso serviço 100% online está aqui para te ajudar a maximizar seus ganhos de forma eficiente e inteligente.</p>
            </div>

            <img src="/ball2.jpg" alt="" className="deep" />
            <div className="backdrop"></div>
        </div>
    )
}

export default Hero