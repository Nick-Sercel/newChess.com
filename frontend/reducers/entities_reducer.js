import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import GoalsReducer from './goals_reducer';
import GamesReducer from './games_reducer';

const EntitiesReducer = combineReducers({
    users: UsersReducer,
    goals: GoalsReducer,
    games: GamesReducer,
})

export default EntitiesReducer;