import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { client } from './src/graphql/Client'
import { Headlines } from './src/graphql/Queries'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native'
import Article from './src/components/Article'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerText: {
    marginBottom: 5,
    fontSize: 30,
    fontWeight: 'bold'
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  }
})
const [articles, setArticles] = useState([])
const Header = ()=>(
  <View style={styles.header}> 
    <Text style={styles.headerText}>New App 2</Text>
  </View>
)




function App(){
  useEffect(() => {
    requestHeadlines()
  }, [])
  const requestHeadlines = () => {
    client
      .query({
        query: Headlines
      })
      .then(response => {
        console.log('RESPONSE ==>', response)
        setArticles(response.data.headlines.articles)
      })
      .catch(error => {
        console.log('ERROR ==>', error)
      })
  }
  return (
    <View style={styles.container}> 
      <Header />
      <View style={styles.contentContainer}>
        <FlatList
          data={articles}
          renderItem={({ item }) => <Article {...item} />}
          keyExtractor={item => `${item.url}`}
        />
      </View>
    </View>
  )
}
export default App