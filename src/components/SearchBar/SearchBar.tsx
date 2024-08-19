import { useEffect, useState } from 'react'
import './SearchBar.css'
import { getTeamTournaments, searchData } from '../../api/sofaScore'
import { ApiSearchData } from '../../interfaces/searchData'
import { ApiTeamTournament, ApiTeamTournamentsSeason } from '../../interfaces/teamTournament'
import { v4 as uuidv4 } from 'uuid'

interface SearchProps {
    type: 'team' | 'league'
    setTeamId: (a: number) => void
    setTeamLeague: (a: number) => void
    setTeamSeason: (a: number) => void
    setStatistics: (a: any) => void
    valueInput: string
}

const SearchBar: React.FC<SearchProps> = ({ setTeamId, setTeamLeague, setTeamSeason, setStatistics, valueInput }) => {

    const [result, setResult] = useState<ApiSearchData[]>([])

    const [showSearchList, setShowSearchList] = useState<boolean>(false)

    const [tournaments, setTournaments] = useState<ApiTeamTournament[]>()

    const [seasons, setSeasons] = useState<ApiTeamTournamentsSeason[]>()

    const [NameTeam, setNameTeam] = useState<string>('')

    useEffect(() => { setNameTeam(valueInput) }, [valueInput])

    const handleInput = async (text: string) => {
        setNameTeam(text)
        try {
            setShowSearchList(true)
            const response = await searchData(text.toLowerCase())
            setResult(response)
        } catch (error) {

        }
    }

    const handleItem = async (team: ApiSearchData) => {
        setTeamId(team.entity.id) // set o Id do time selecionado
        setNameTeam(team.entity.name) // muda no input para o nome do time selecionado
        setShowSearchList(false) // fecha a lista de pesquisa
        setStatistics(undefined) // limpar as estatísticas
        setTournaments(undefined) // limpa os torneios
        setSeasons(undefined) // limpa as temporadas
        loadTeamTournaments(team.entity.id) // busca os torneios do time selecionado
    }

    const loadTeamTournaments = async (e: any) => {
        try {
            const response = await getTeamTournaments(e)
            setTournaments(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleTournament = (leagueId: string) => {

        const tournament = tournaments?.find(ele => ele.uniqueTournament.id === Number(leagueId))
        setTeamLeague(Number(leagueId))
        setTeamSeason(0)
        setStatistics(undefined)

        setSeasons(undefined)
        setTimeout(() => { setSeasons(tournament?.seasons) }, 0);
    }


    return (
        <div className='searchBar'>
            <div className="searchBar__input">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type='search' placeholder='Pesquisar Time' value={NameTeam} onChange={(e) => handleInput(e.target.value)} />
            </div>

            <div className="searchBar__dataLeagues">

                {tournaments &&
                    <select onChange={(e) => handleTournament(e.target.value)}>
                        <option value='' selected disabled>Liga</option>
                        {tournaments && tournaments?.map(element => <option value={element.uniqueTournament.id}>{element.uniqueTournament.name}</option>)}
                    </select>
                }

                {seasons &&
                    <select onChange={(e) => setTeamSeason(Number(e.target.value))}>
                        <option value='' selected disabled>Ano</option>
                        {seasons?.map(element => <option value={element.id}>{element.year}</option>)}
                    </select>
                }
            </div>

            {
                result.length > 0 && showSearchList && <div className="searchBar__content">
                    <ul className='searchBar__content_list'>
                        {result.map(element => <li key={uuidv4()} className='searchBar__content_list_item' onClick={() => handleItem(element)}>
                            <img className='searchBar__content_list_item-img' src={`https://api.sofascore.app/api/v1/${element.type}/${element.entity.id}/image`} alt={element.entity.shortName} />
                            <div className="searchBar__content_list_item_data">
                                <p className="searchBar__content_list_item_data-name">{element.entity.name} </p>
                                {element.type === 'player' && <span className="searchBar__content_list_item_data-legend">{element.entity.team?.shortName}</span>}
                                {element.type === 'team' && <span className="searchBar__content_list_item_data-legend">{element.entity.country.name}</span>}
                            </div>
                        </li>)}

                    </ul>
                </div>
            }
        </div >
    )
}

export default SearchBar