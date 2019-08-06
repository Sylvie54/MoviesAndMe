/// Components/Search.js

// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

  constructor(props) {
    super(props)
    // Ici on va créer les propriétés de notre component custom Search
    this._films = []
  }


  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() =>  this._loadFilms()}/>
         {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
         <FlatList
          data={this._films}
         // data={films}
          keyExtractor={(item) => item.id.toString()}
         // renderItem={({item}) => <Text>{item.title}</Text>}
         //equivalent à : class FilmItem { var film;} var filmItem = new FilmItem(); filmItem.film = item;
         // Les éléments (item) sont des objets de la classe FilmItem
          renderItem={({item}) => <FilmItem film={item}/>}
        />
      </View>
    )
  }
  _loadFilms() {
   // getFilmsFromApiWithSearchedText("star").then(data => console.log(data))
      getFilmsFromApiWithSearchedText("star").then(data => {
      this._films = data.results
      // La méthode forceUpdate() permet de forcer un component à se rendre à nouveau
      this.forceUpdate()
    })

  }
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search