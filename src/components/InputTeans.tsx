// import './InputTeans.css'


interface InputTeansProps {
    onChange: any
}

const InputTeans: React.FC<InputTeansProps> = ({ onChange }) => {

    return (
        <>
            <select onChange={(e) => onChange(e.target.value)}>

                <option value="">Time</option>
                <option value="1955">Bahia</option>
                <option value="1958">Botafogo</option>
                <option value="1967">Athletico</option>
                <option value="1977">Atlético MG</option>
                <option value="7314">Atlético GO</option>
                <option value="1957">Corinthias</option>
                <option value="1984">Criciúma</option>
                <option value="1954">Cruzeiro</option>
                <option value="49202">Cuibá</option>
                <option value="5981">Flamengo</option>
                <option value="1961">Fluminense</option>
                <option value="2020">Fortaleza</option>
                <option value="5926">Grêmio</option>
                <option value="1966">Internacional</option>
                <option value="1980">Juventude</option>
                <option value="1963">Palmeiras</option>
                <option value="1999">RB Bragantino</option>
                <option value="1981">São Paulo</option>
                <option value="1962">Vitória</option>
                <option value="1974">Vasco</option>
            </select>
        </>

    )
}

export default InputTeans