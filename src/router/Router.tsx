import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './routes/Home';
import Recipes from './routes/Recipes';
import BasketList from './routes/BasketList';

const HomeRoute = () => <Home/>
const RecipesRoute = () => <Recipes/>
const BasketListRoute = () => <BasketList/>

export default function Router() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
      { key: 'basketList', title: 'Basket', focusedIcon: 'album' },
      { key: 'recipes', title: 'Recipes', focusedIcon: 'history' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      home: HomeRoute,
      basketList: BasketListRoute,
      recipes: RecipesRoute,
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    );
  };