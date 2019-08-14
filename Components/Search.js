// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

  constructor(props) {
    super(props)
     // Ici on va créer les propriétés de notre component custom Search
    this.searchedText = ""  // vaut la valeur du texte saisi dans le TextInput
    this.page = 0 // compteur page courante
    this.totalPages = 0 // nb pages totales
    this.state = {
      films: [],
      isLoading: false 
    }
    //this._films = []
  }

  render() {
    //console.log(this.state.isLoading)
    return (
      <View style={styles.main_container}>
        <TextInput
         style={styles.textinput}
          placeholder='Titre du film'
        //  onChangeText={(text) => this.searchedText = text} // fonctionne aussi
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button
         // color= '#006400'
        //  style={styles.boutonRech}
          title='Rechercher' onPress={() =>  this._searchFilms()}/>
         {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
         
        <FlatList
         // data={this._films}
         data={ this.state.films }
         // data={films}
          keyExtractor={(item) => item.id.toString()}
         // renderItem={({item}) => <Text>{item.title}</Text>}
         //equivalent à : class FilmItem { var film;} var filmItem = new FilmItem(); filmItem.film = item;
         // Les éléments (item) sont des objets de la classe FilmItem
          renderItem={({item}) => <FilmItem film={item}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }

  _loadFilms() {
    //console.log("fims recherchés : " + this.searchedText + " page : " + this.page) // Un log pour vérifier qu'on a bien le texte du TextInput
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
    this.setState({ isLoading:true })
    getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {

      //  getFilmsFromApiWithSearchedText("star").then(data => {
      //console.log(data)  
      //this._films = data.results
      // La méthode forceUpdate() permet de forcer un component à se rendre à nouveau
      //this.forceUpdate()
      this.page = data.page
      this.totalPages = data.total_pages
      this.setState({
        films: [ ...this.state.films, ...data.results ], // équivaut à une concaténation : films: this.state.films.concat(data.results)
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

  _searchFilms() {
    // Ici on va remettre à zéro les films de notre state
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    // paramètre de setState : une fonction callback qui attend que les compterus soient remis à zéro  pour lancer le log
    // et la méthode _loadFilms  
    }, () => {
    
    // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
    console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
    this._loadFilms()
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
    backgroundColor: '#006400'
  }

})

export default Search