// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
  render() {
    // affiche dans le log, dans la console ouverte, les propriétés de ce component custom FilmItem
    //console.log(this.props)
    const { film, varDisplayDetailForFilm } = this.props /**  equivalent à :
      const film = this.props.film
      const displayDetailForFilm = this.props.displayDetailForFilm  */

    return (

     // <View
     <TouchableOpacity
       style={styles.main_container}
       onPress={() => varDisplayDetailForFilm(film.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            {/* nombre maximum de lignes pour un texte. Si le texte fait plus de 6 lignes, votre texte est coupé et l'application affiche "..." à la fin du texte */}
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
        </TouchableOpacity>
    //  </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
      flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    /* backgroundColor: 'gray' */
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    // passe à la ligne si le texte est trop long
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem