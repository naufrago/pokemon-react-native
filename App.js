import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    var pokemons = [];
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      console.log('pokemones',response);
      const json = await response.json();
      (json.results).forEach((poke) => {
        api(poke.name).then(res => {
          pokemons.push(
            {
              name: poke.name,
              url: poke.url,
              img: res
            }
          )
          
          setData(pokemons)
        })
      });
      // console.log(data);
      
    } catch (error) {
      console.error(error);
    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  const api = async (pokemon) => {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
  }

  
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={({ name }) => name}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri:item.img
                     
                  }}
                />
                <Text>
                  {item.name}
                </Text>
              </View>

            )}
          />
        </>



      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  
  tinyLogo: {
    width: 150,
    height: 150,
  }
});