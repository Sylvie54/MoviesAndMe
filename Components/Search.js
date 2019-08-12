/// Components/Search.js

// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    // Ici on va créer les propriétés de notre component custom Search
    this.state = {
      film: [],
      isLoading: false 
    }
    //this._films = []
  }

  render() {
    console.log(this.state.isLoading)
    return (
      <View style={styles.main_container}>
        <TextInput
         style={styles.textinput}
          placeholder='Titre du film'
        //  onChangeText={(text) => this.searchedText = text} // fonctionne aussi
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button
         // color= '#006400'
         // style={styles.boutonRech}
          title='Rechercher' onPress={() =>  this._loadFilms()}/>
         {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
         
        <FlatList
         // data={this._films}
         data={ this.state.film }
         // data={films}
          keyExtractor={(item) => item.id.toString()}
         // renderItem={({item}) => <Text>{item.title}</Text>}
         //equivalent à : class FilmItem { var film;} var filmItem = new FilmItem(); filmItem.film = item;
         // Les éléments (item) sont des objets de la classe FilmItem
          renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }

  _loadFilms() {
    console.log("fims recherchés : " + this.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
    this.setState({ isLoading:true })
    getFilmsFromApiWithSearchedText(this.searchedText).then(data => {

      //  getFilmsFromApiWithSearchedText("star").then(data => {
      //console.log(data)  
      //this._films = data.results
      // La méthode forceUpdate() permet de forcer un component à se rendre à nouveau
      //this.forceUpdate()
      this.setState({
        film: data.results,
        isLoading:false // arrêt du chargement de l'activityIndicator
      })
    })
   } 
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement :
           small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
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
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boutonRech: {
    color: '#006400'
  }

})

export default Search