import React, { Component } from "react";
import { Font } from 'expo';
import { View, Text, FlatList,ActivityIndicator,Image } from "react-native";
import {List, ListItem,SearchBar } from "react-native-elements";
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import {Colors} from '../Themes/'
class FriendPicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
renderSeparator = () => {
  return (
    <View
    style={{
      height: 1,
      width:"86%",
      backgroundColor: Colors.fire,
      marginLeft: "14%"
    }}
    />
  )
}
renderHeader=()=> {
  return <SearchBar placeholder="Type here..." showLoadingIcon  lightTheme round />;
}
renderFooter = () => {
  if (!this.state.loading) return null;
  return (
    <View 
    style={{
      paddingVertical: 20,
      borderTopWidth: 1,
      backgroundColor: Colors.fire,
    }}
    >
    <ActivityIndicator animating size="large" />
    </View>
  )
}
  render() {
    return (
      <List
      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0}}
      >
      <FlatList
      numColumns={3}
       data={this.state.data}
       renderItem ={({item}) => (
           
        //    <ListItem 
        //    roundAvatar
        //    title={`${item.name.title} ${item.name.first} ${item.name.last}`}
        //    subtitle = {`${item.location.city} ${item.location.street}`}
        //    avatar={{ uri: item.picture.thumbnail}}
        //    containerStyle={{ borderBottomWidth: 0}}
        //    />
        <Card>
        <CardItem cardBody>
          <Image source={{uri: item.picture.large}} style={{height: 100,borderRadius: 0, width: null, flex: 1}}/>
        </CardItem>
      </Card>
       )}
       keyExtractor={item => item.email}
       ListFooterComponent = {this.renderFooter}
     />
       </List> 
    );
  }
}

export default FriendPicture;