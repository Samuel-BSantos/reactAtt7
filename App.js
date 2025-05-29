import { StatusBar } from 'expo-status-bar';
import {Input} from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';
import { Button } from 'react-native-web';
import { color } from 'react-native-elements/dist/helpers';



export default function App() {
  const [weatherInfo, setWeatherInfo] = useState('');
  const [cidade, setCidade] = useState('');
  const link = `https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=7667aee8&city_name=${cidade}`;
  const attPag = (() => {    
    axios.get(link)
    .then(response => setWeatherInfo(response.data))
    .catch(error => console.error('API Error', error));
  });


  
  const { results } = weatherInfo;
  const limit = 4;
  return (
    <View style={styles.container}>
      <Input style={{backgroundColor: "white"}}placeholder='Cidade' value={cidade} onChangeText={setCidade}></Input>
      <Button onPress={attPag} title='Procurar'></Button>
      <StatusBar style="light" />
      <View style={styles.header}> 
        <Text style={styles.cityName}>{results?.city}</Text>
        {results?.forecast.slice(0, 1).map((item, i) =>
          <SvgUri
            key={i}
            uri={`https://cors-anywhere.herokuapp.com/https://assets.hgbrasil.com/weather/icons/conditions/${item.condition}.svg`}
          />  
        )}
        <Text style={styles.date}>{results?.date}</Text>
      </View>

      <View style={styles.mainInfo}>
        <Text style={styles.temp}>{results?.temp}°C</Text>
        <Text style={styles.rainLabel}>precipitações</Text>
        <Text style={styles.tempRange}>max: {results?.forecast[0].max}°C, min: {results?.forecast[0].min}°C </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>umidade: {results?.humidity}%</Text>
        <Text style={styles.detailText}>Chuva: {results?.forecast[0].rain_probability} %</Text>
        <Text style={styles.detailText}>Vento: {results?.wind_speedy}</Text>
      </View>

      <View style={styles.forecast}>
        <View style={styles.forecastItem}>
          <Text style={styles.forecastText}>Nascer do sol: {results?.sunrise}</Text>
          <Text style={styles.forecastText}>Morrer do sol: {results?.sunset}</Text>
        </View>
        <View style={styles.forecastItem}>
          <Text style={styles.forecastText}>direção do vento: {results?.wind_direction}°</Text>
          <Text style={styles.forecastText}>description: {results?.description}</Text>
        </View>
      </View>
      <ScrollView style={styles.forecast}>
        {results?.forecast.slice(0, limit).map((item, i) => (
      <View style={styles.forecast}>
        <View style={styles.forecastItem}>
          <SvgUri
              uri={`https://cors-anywhere.herokuapp.com/https://assets.hgbrasil.com/weather/icons/conditions/${item.condition}.svg`}
            />  
          <Text style={styles.forecastText}>precipitações:</Text>
          <Text style={styles.forecastText}>{item.date}</Text>
          <Text style={styles.forecastText}>max: {item.max}°C</Text>
          <Text style={styles.forecastText}>min: {item.min}°C</Text>
        </View>
      </View>
      

      ))}
      </ScrollView>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1338BE', 
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  cityName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  precipitation: {
    color: '#fff',
    fontSize: 18,
  },
  minMax: {
    color: '#ddd',
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    backgroundColor: '#1A48D6',
    borderRadius: 12,
    padding: 10,
    marginTop: 15,
    width: '90%',
    justifyContent: 'space-between',
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
  },
  forecast: {
    marginTop: 20,
    width: '100%',
    paddingLeft: 20,
  },
  forecastItem: {
    backgroundColor: '#1A48D6',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  forecastText: {
    color: '#fff',
    fontSize: 14,
  },
});
