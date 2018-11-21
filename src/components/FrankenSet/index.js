import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { AllHtmlEntities as Entities} from 'html-entities';
const entities = new Entities();

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F5FCFF', 
    },
    name: {
        fontSize: 20, 
        textAlign: 'center', 
        margin: 5, 
    },
    type: {
        fontSize: 10, 
        textAlign: 'center',
        margin: 1, 
    }
});


export default class FrankenSet extends Component {

  constructor(props) {
    super(props);
    this.state = {frankenSet: []};
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
        this.setState({frankenSet: this._shuffle()})
    }
  }
  
  _shuffle = () => {
    return this.props.tuneBook.tunes.reduce( (p,c,i) => {
        if (c.type === this.props.setType) {
            p.push(c);
        }
        return p;
    }, []).sort(() => {return 0.5 - Math.random()}).slice(0,this.props.setLength);
  }

  render() {
    return (
        <View style={styles.container}>
            <Tunes tunes={this.state.frankenSet} />
            <Button onPress={() => {this.setState({frankenSet: this._shuffle()})}} title="Shuffle" />
        </View>
    )
  }
}

const Tunes = (props) => {
    const tunes = props.tunes;
    const tuneList = tunes.map((tune) => {
        return (<Tune {...tune} key={tune.id} />);
    });
    return (<View>
        {tuneList}
    </View>)
}

const Tune = (props) => {
    return (
        <View>
            <Text style={styles.name}>{entities.decode(props.name)}</Text>
        </View>
      );
}
