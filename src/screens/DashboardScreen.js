import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import axios from 'axios';

export default function DashboardScreen() {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [weatherRes, newsRes] = await Promise.all([
        axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=Kuala Lumpur&units=metric&appid=6f108440b222b5eb4408f74d4ee6b200',
        ),
        axios.get(
          'https://newsapi.org/v2/top-headlines?language=en&apiKey=814488e3c89e4960b638ef0500f64e4d',
        ),
      ]);

      setWeather(weatherRes.data);
      setNews(newsRes.data.articles.slice(0, 7)); // Limit to 3
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.sectionTitle}>☀️ Weather</Text>
      <View style={styles.weatherCard}>
        {weather ? (
          <View style={styles.weatherContent}>
            <Image
              source={{
                uri:
                  'https://openweathermap.org/img/wn/' +
                  weather.weather[0].icon +
                  '@2x.png',
              }}
              style={styles.weatherIcon}
            />
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherLocation}>{weather.name}</Text>
              <Text style={styles.weatherTemp}>
                {Math.round(weather.main.temp)}°C
              </Text>
              <Text style={styles.weatherCondition}>
                {weather.weather[0].main}
              </Text>
            </View>
          </View>
        ) : (
          <Text>Loading weather...</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>📰 Breaking News</Text>
      <View style={styles.card}>
        {news.length > 0 ? (
          news.map((item, index) => (
            <View key={index} style={styles.newsItem}>
              {item.urlToImage ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.urlToImage}}
                    style={styles.newsImage}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
              <Text style={styles.newsTitle}>{item.title}</Text>
              {item.description ? (
                <Text style={styles.newsDesc}>{item.description}</Text>
              ) : null}
              <View style={styles.newsMeta}>
                {item.source?.name && (
                  <Text style={styles.newsSource}>{item.source.name}</Text>
                )}
                {item.publishedAt && (
                  <Text style={styles.newsDate}>
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text>Loading news...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  newsDesc: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  newsDate: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  weatherIcon: {
    width: 64,
    height: 64,
    marginRight: 18,
  },
  weatherDetails: {
    flex: 1,
  },
  weatherLocation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  weatherCondition: {
    fontSize: 16,
    color: '#555',
  },
});
