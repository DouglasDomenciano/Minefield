
import React, {Component} from 'react'
import {StyleSheet, Text, View, Alert} from 'react-native'
import Params from './src/Params'
import MineField from './src/components/MineField'
import { createMineBoard, cloneBoard, openField, hasExplosion, wonGame, showMines } from './src/Functions'


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = Params.getColumnsAmount()
    const rows = Params.getRowsAmount()
    return Math.ceil(cols * rows * Params.difficultLevel)
  }
  createState = () => {
    const cols = Params.getColumnsAmount()
    const rows = Params.getRowsAmount()
    return {
      board: createMineBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Perdeu', 'Tente novamente!')
    }
    if(won){
      Alert.alert('Parabéns', 'Você venceu!')
    }
    this.setState({ board, lost, won })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines</Text>
        <Text style={styles.instructions}>Tamanho da grade: {Params.getRowsAmount()} X {Params.getColumnsAmount()}</Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
