export const SET_USERDATA = "usernames/SET_USERDATA";
export const SET_MATCHES = "usernames/SET_MATCHES";
export const SET_MATCH_DATA = "usernames/SET_MATCH_DATA";

const setUserData = (userData) => ({
    type: SET_USERDATA,
    userData,
});

const setMatches = (matches) => ({
    type: SET_MATCHES,
    matches,
});

const setMatchData = (matchData) => ({
    type: SET_MATCH_DATA,
    matchData,
});


export const getUserData = (username, region) => async (dispatch) => {
    try {
        const res = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=RGAPI-53a06b4b-e15d-45d3-ab8c-fcf8481703a2`)
        const data = await res.json()
        dispatch(setUserData(data))
        localStorage.setItem("userData", JSON.stringify(data))
        return data
    }
    catch (e) {
        console.log("!!!!!!!!!!!!!!!!!", e, "!!!!!!!!!!!!!!!!!")
    }

}

export const getMatches = (puuid) => async (dispatch) => {
    try {
        const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=RGAPI-53a06b4b-e15d-45d3-ab8c-fcf8481703a2`)
        const data = await res.json()
        dispatch(setMatches(data))
        localStorage.setItem("matches", JSON.stringify(data))
        return data
    }
    catch (e) {
        console.log("!!!!!!!!!!!!!!!!!", e, "!!!!!!!!!!!!!!!!!")
    }
}

export const getMatchData = (matchId) => async (dispatch) => {
    try {
        const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-53a06b4b-e15d-45d3-ab8c-fcf8481703a2`)
        const data = await res.json()
        dispatch(setMatchData(data))
        localStorage.setItem("matchData", JSON.stringify(data))
        return data
    }
    catch (e) {
        console.log("!!!!!!!!!!!!!!!!!", e, "!!!!!!!!!!!!!!!!!")
    }
}

const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userData")) || null,
    matchHistory: JSON.parse(localStorage.getItem("matches")) || null,
    matchData: JSON.parse(localStorage.getItem("matchData")) || null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERDATA:
            return { userInfo: action.userData }
        case SET_MATCHES:
            return { 
                ...state,
                matchHistory: action.matches 
            }
        case SET_MATCH_DATA:
            return {
                ...state,
                matchData: action.matchData
            }
        default:
            return state;
    }
}

export default usersReducer;