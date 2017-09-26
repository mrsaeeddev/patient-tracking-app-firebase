import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
// import { Card, CardSection, Button, LibraryList, LibraryItem } from '../.././common'
import { Container, Content, List, Card, CardItem, ListItem, Body, Text, Button, Input, InputGroup } from 'native-base'
import firebase from 'firebase'

export class PatientsList extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.searchByDate = this.searchByDate.bind(this);
        this.searchByName = this.searchByName.bind(this);
        this.state = {
            normalState: true,
            filterState: false,
            arrdata: []
        }
    }

    componentWillMount() {
        let database = firebase.database().ref('patients')
        database.on('child_added', snap => {
            let arrayToPushedData = this.state.arrdata;
            arrayToPushedData.push(snap.val());
            this.setState({
                status: true,
                arrdata: arrayToPushedData,
                // backupData: arrayToPushedData
            })
        })
    }

    searchByName(text) {
        arrayToPushedData = this.state.arrdata;
        this.setState({ searchedVal: text })
        arrayToPushedData = arrayToPushedData.filter((asset) => asset.name.toLowerCase().indexOf(text) !== -1);

        if (text == '') {
            this.setState({
                normalState: true,
                filterState: false
            })

        }
        else {
            this.setState({
                filterState: true,
                normalState: false,
                filterData: arrayToPushedData,
                date: ''
            })
        }
    }
    searchByDate(date) {
        this.setState({
            date: date
        })
        arrayToPushedData = this.state.data;
        this.setState({ date: date })
       arrayToPushedData = arrayToPushedData.filter(asset => asset.date.indexOf(date) !== -1);

        if (date == '') {
            this.setState({
                normalStatus: true,
                filterStatus: false
            })

        }
        else {
            this.setState({
                filterStatus: true,
                normalStatus: false,
                filterData: arrayToPushedData
            })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log(this.state.arrdata)
        return (
            <Container style={{ backgroundColor:'#ff3232'}}>
                <Content>
                <InputGroup>
                        <Input onChangeText={(date) => this.searchByDate(date)} placeholder="Search By Date"/>
                    </InputGroup>
                    <InputGroup>
                        <Input onChangeText={(text) => this.searchByName(text)}  placeholder="Search By Name"/>
                    </InputGroup>
                    <List>
                        {this.state.normalState &&
                            this.state.arrdata.map((d, i) => {
                                return (
                                    <ListItem key={i}>
                                        <Text>{d.name}</Text>
                                        <Text>{d.age}</Text>
                                        <Text>{d.email}</Text>
                                        <Text>{d.disease}</Text>
                                        <Text>{d.date}</Text>
                                    </ListItem>

                                )
                            })

                        }{
                            this.state.filterState &&
                            this.state.filterData.map((d, i) => {
                                return (
                                    <ListItem key={i}>
                                        <Text>{d.name}</Text>
                                        <Text>{d.age}</Text>
                                        <Text>{d.email}</Text>
                                        <Text>{d.disease}</Text>
                                        <Text>{d.date}</Text>
                                    </ListItem>

                                )})
                            }
                    </List>
                    {/* <Button onPress={() => { this.getData }}><Text>Get Data</Text></Button> */}
                </Content>
            </Container>
                )
    }
}

