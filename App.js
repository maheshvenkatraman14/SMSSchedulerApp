import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, ListItem, Radio} from 'native-base';
import {
  StyleSheet,
  View,
  TouchableOpacity, TextInput, DatePickerIOS, DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform, Linking, AsyncStorage
} from 'react-native';
import ContactsWrapper from 'react-native-contacts-wrapper';
import SmsAndroid  from 'react-native-get-sms-android';
import BackgroundJob from 'react-native-background-job';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const phonenum = "";
const msg = "";
const msgType = "SMS";
const backgroundJob = {
  jobKey: "myNewJob",
  job: () => {
    console.log("FIRED");
    AsyncStorage.getItem('selectedPhoneNum').then((value)=> { 
      phonenum = value;
    });
    AsyncStorage.getItem('smsMessage').then((value)=> { 
    msg = value;
    SmsAndroid.autoSend(phonenum, msg, (fail) => {
      console.log("Failed with this error: " + fail);
      BackgroundJob.cancelAll();
  }, (success) => {
      BackgroundJob.cancelAll();
  });
  });
  }
 };
 
 BackgroundJob.register(backgroundJob);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectContact = this.onSelectContact.bind(this);
    this.onScheduleTap = this.onScheduleTap.bind(this);
    this.state = { msgType: "SMS", selectedContact: "No contact selected", selectedPhoneNumber: "",date: moment().format('DD-MM-YYYY'), time: moment().format('hh:mm a')};
}

onSelectContact() {
  // BackgroundJob.cancel({jobKey: 'myNewJob'});
  ContactsWrapper.getContact()
  .then((contact) => {
      // Replace this code
      // alert("You selected "+contact.name);
      AsyncStorage.setItem('selectedPhoneNum', contact.phone);
      // selectedPhoneNum = contact.phone;
      this.setState({selectedContact:contact.name});
      this.setState({selectedPhoneNumber: contact.phone})
      console.log("Contact details"+JSON.stringify(contact));
      // Linking.openURL('sms:1234&body=HELLO');
  })
  .catch((error) => {
    alert(error.message);
      console.log("ERROR CODE: ", error.code);
      console.log("ERROR MESSAGE: ", error.message);
  });

}

onScheduleTap() {
console.log(this.state.time);
var sdate = this.state.date.substr(0,2);
var smonth = this.state.date.substr(3,2);
var syear = this.state.date.substr(6,4);

var time = moment(this.state.time, ["h:mm A"]).format("HH:mm");
var shour = time.substr(0,2);
var smin = time.substr(3,2);
// var ssec = this.state.time.substr(6,2);
// var smsec = this.state.time.substr(9,2);

smonth = parseInt(smonth)-1;
smonth = smonth.toString();
console.log("SHOUR BEFORE=>"+shour);
shour = parseInt(shour);
console.log("Hour=>"+shour);
console.log("Moment=>"+moment());
const scheduledDate = 
   moment().set({year: syear, month: smonth, date: sdate, hour: shour, minute: smin});
   console.log("Scheduled date=>"+scheduledDate.milliseconds(0));
   console.log("MOMENT=>"+moment().milliseconds(0));
  const diffTime = moment().diff(scheduledDate.seconds(0).milliseconds(0),"milliseconds", true);
  const msgTime = Math.abs(diffTime);
  console.log(msgTime);
  alert('Task scheduled');
  // console.log("SelectedPhoneNumber=>"+selectedPhoneNum+"SmsMsg=>"+smsMessage);
  BackgroundJob.schedule({
    jobKey: "myNewJob",
    period: msgTime,
    exact: true,
  });
}

  render() {
    return (
      <Container>
                <Header>
                    <Left>
                        <Button transparent>>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Scheduler App</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ListItem onPress={() => msgType= "SMS"}>
                        <Text>SMS</Text>
                        <Right>
                            <Radio selected={ msgType == "SMS"}/>
                        </Right>
                    </ListItem>
                    <TouchableOpacity onPress={this.onSelectContact}>
                        <View style={styles.buttonWrapper}>
                            <Text style={styles.buttonText}>Select a Contact</Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput style={styles.input}
                        // onChangeText={(text) => this.setState({selectedContact})}
                        value={this.state.selectedContact}
                    />
                    <DatePicker
        style={{width: 300}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        // minDate="2000-05-01"
        // maxDate="2018-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 50,
            top: 15,
            marginLeft: 0
          },
          dateInput: {
            left: 50,
            marginTop: 20
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(selectedDate) => {this.setState({date: selectedDate})}}
      />
      <DatePicker
        style={{width: 300}}
        date={this.state.time}
        mode="time"
        placeholder="select date"
        format="hh:mm a"
        // minDate="2018-05-01"
        // maxDate="2018-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 50,
            top: 15,
            marginLeft: 0
          },
          dateInput: {
            left: 50,
            marginTop: 20
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(selectedTime) => {this.setState({time: selectedTime})}}
      />
      <TextInput style={styles.input}
                        onChangeText={(text) =>  AsyncStorage.setItem('smsMessage', text)}
                    />
      <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            BackgroundJob.cancelAll();
          }}
        >
          <Text style={styles.buttonText}>CancelAll</Text>
        </TouchableOpacity>
                    </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={this.onScheduleTap} full>
                            <Text>SCHEDULE</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    marginTop: 20,
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    width: '70%'
  },
  buttonWrapper: {
      alignSelf: 'center',
      marginTop: 20,
      marginLeft: 20,
      marginRight:20,
      flexDirection: 'column',
      backgroundColor: '#00CCFF',
      borderRadius: 4
  },
  buttonText: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 20,
      elevation: 1,
      color: '#FFFFFF'
  }
});
