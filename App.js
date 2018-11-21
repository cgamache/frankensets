import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MemberId from './src/components/MemberId';
import FrankenSet from './src/components/FrankenSet';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {setLength: 3, setType: 'jig', memberId: -1, tuneBook: { tunes: [] }};
  }

  componentDidMount() {
    this._fetchTuneBook();
  }

  _idSwitcher = (memberId) => {
    this.setState({memberId})
    setTimeout(this._fetchTuneBook, 1000);
  }

  _fetchTuneBook = () => {
    if (this.state.fetching) {
      return;
    }
    if (!this.state.memberId || this.state.memberId === -1) {
      this.setState({tuneBook: {tunes: []}, fetching: false});
      return;
    }
    this.setState({fetching:true});
    const tunebookUrl = `https://thesession.org/members/${this.state.memberId}/tunebook?format=json`;
    fetch(tunebookUrl)  
        .then(response => {
            return response.json();
        }).then(obj => {
            this.setState({tuneBook: obj, fetching: false});
        }).catch((err) => {
            this.setState({tuneBook: {tunes: []}, fetching: false});
        });
  }

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FrankenSets</Text>
        <MemberId updater={this._idSwitcher}/>
        <SetLength doDecrease={() => {this.setState({setLength: this.state.setLength - 1})}}
          doIncrease={() => {this.setState({setLength: this.state.setLength + 1})}} 
          setLength={this.state.setLength}
        />
        <SetType doJigs={() => {this.setState({setType: 'jig'})}} doReels={() => {this.setState({setType: 'reel'})}} />
        <FrankenSet setType={this.state.setType} setLength={this.state.setLength} tuneBook={this.state.tuneBook}></FrankenSet>
      </View>
    );
  }
}

const SetLength = (props) => {
  return (
    <View>
      <Text style={styles.label}>Set Length</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button onPress={props.doDecrease} title="-" /><Text>{props.setLength}</Text><Button onPress={props.doIncrease} title="+" />
      </View>
    </View>
  )
}

const SetType = (props) => {
  return (
    <View>
      <Text style={styles.label}>Set Type</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button onPress={props.doJigs} title="Jigs"/><Button onPress={props.doReels} title="Reels" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  label: {
    fontSize: 10, 
    textAlign: 'center',
    margin: 0
  }
});
