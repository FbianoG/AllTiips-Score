import { useEffect, useState } from 'react'
import './SearchBar.css'
import { getTeamTournaments, searchData } from '../../api/sofaScore'
import { ApiSearchData } from '../../interfaces/searchData'
import { ApiTeamTournament, ApiTeamTournamentsSeason } from '../../interfaces/teamTournament'
import { v4 as uuidv4 } from 'uuid'

interface SearchProps {
    type: 'team' | 'league'
    onClick: (a: string) => void
    setTeamLeague: (a: number) => void
    setTeamSeason: (a: number) => void
    setStatistics: (a: any) => void
}

const SearchBar: React.FC<SearchProps> = ({ onClick, setTeamLeague, setTeamSeason, setStatistics }) => {

    const [result, setResult] = useState<ApiSearchData[]>([])

    const [showSearchList, setShowSearchList] = useState<boolean>(false)


    const [tournaments, setTournaments] = useState<ApiTeamTournament[]>()

    const [seasons, setSeasons] = useState<ApiTeamTournamentsSeason[]>()

    // useEffect(() => {
    //     loadTeamTournaments
    // }, [])


    const handleInput = async (text: string) => {
        try {
            setShowSearchList(true)
            const response = await searchData(text.toLowerCase())
            setResult(response)
        } catch (error) {

        }
    }

    const handleItem = (elementId: number) => {
        onClick(elementId.toString())
        setShowSearchList(false)
        loadTeamTournaments(elementId)
    }

    const loadTeamTournaments = async (e: any) => {
        try {
            const response = await getTeamTournaments(e)
            setTournaments(response)
        } catch (error) {
            setStatistics(undefined)
        }
    }

    useEffect(() => {
        if (!tournaments) return
        const tourn = tournaments[0]
        const season = tournaments[0].seasons[0]
        setTeamLeague(tourn.uniqueTournament.id)
        setTeamSeason(season.id)
        setSeasons(tournaments[0].seasons)
    }, [tournaments])

    const handleTournament = (leagueId: string) => {

        const tournament = tournaments?.find(element => element.uniqueTournament.id === Number(leagueId))

        if (!tournament) return
        setSeasons(undefined) // set undefined para quando alterar o 'select' do torneio, resetar o 'select' da season para o ano atual
        setTimeout(() => { setSeasons(tournament.seasons) }, 0)
        setTeamSeason(tournament.seasons[0].id)
        setTeamLeague(Number(leagueId))
    }



    return (
        <div className='searchBar'>
            <div className="searchBar__input">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type='search' placeholder='Pesquisar Time' onChange={(e) => handleInput(e.target.value)} />
            </div>

            <div className="searchBar__dataLeagues">
                <select onChange={(e) => handleTournament(e.target.value)}>
                    {tournaments?.map(element => <option value={element.uniqueTournament.id}>{element.uniqueTournament.name}</option>)}
                </select>

                {seasons &&

                    <select onChange={(e) => setTeamSeason(Number(e.target.value))}>
                        {seasons?.map((element, index) => <option value={element.id} selected={index === 0 && true}>{element.year}</option>)}
                    </select>
                }
            </div>

            {
                result.length > 0 && showSearchList && <div className="searchBar__content">
                    <ul className='searchBar__content_list'>
                        {result.map(element => <li key={uuidv4()} className='searchBar__content_list_item' onClick={() => handleItem(element.entity.id)}>
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