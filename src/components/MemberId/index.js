import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
      container: {
          width: 100,
          height: 40,
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: '#FFFFFF',
          margin: 10
      },
      input: { 
          width: 100,
          fontSize: 15, 
          textAlign: 'center',
          borderColor: 'gray',
          borderWidth: 1,
        },
      label: {
        fontSize: 10, 
        textAlign: 'center',
        margin: 0
      }
  }); 

export default class MemberId extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', placeholder: "TheSession.org member ID" };
  }

  _onChangeText = (text) => {
    this.setState({text});
    this.props.updater(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Member ID</Text>
        <TextInput
          style={styles.input}
          placeholder={this.state.placeholder}
          onChangeText={this._onChangeText}
          keyboardType="numeric"
          value={this.state.text}
        />
      </View>
    );
  }
}

