import React from 'react';
import image from '../images/cloud-upload-download-data-transfer.svg';
import ContactItem from './ContactItem';

class App extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            contacts: []
        }
    }


    componentWillMount() {
        localStorage.getItem('contacts') && this.setState({
            contacts: JSON.parse(localStorage.getItem('contacts')),
            isLoading: false
        })
    }


    componentDidMount(){
        if(!localStorage.getItem('contacts')){
            this.fetchData();
        } else {
            console.log('Using data from localStorage.');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem("contacts", JSON.stringify(nextState.contacts))
        localStorage.setItem("contactsDate", Date.now())
    }


    fetchData(){



        fetch('https://randomuser.me/api/?results=50&nat=us,dk,fr,gb')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.results.map(user => (
                {
                    name: `${user.name.first} ${user.name.last}`,
                    username: `${user.login.username}`,
                    email: `${user.email}`,
                    location: `${user.location.street}, ${user.location.city}`
                }
            )))

            .then(contacts => this.setState({
                contacts,
                isLoading: false
            }))
            .then(console.log(this.contacts))
            .catch(error => console.log('parsing failed', error))

    }

        delateItem(item) {

            const {contacts} = this.state
                console.log(contacts)
            console.log(item)

             const newList = this.state.contacts.filter(items => {
                 return items.name !==item.name
                 }
             )



        }






    render() {
        const {isLoading, contacts} = this.state;
        return (
            <div>
                <header>
                    <img src={image} />
                    <h1>Fetching Data <button className="btn btn-sm btn-danger" onClick={(e)=>this.fetchData(e)}>Fetch now</button></h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                        {
                            !isLoading && contacts.length > 0 ? contacts.map(contact => {
                                const {username, name, email, location} = contact;
                                return <div>
                                <ContactItem key={username} title={name}>
                                    <p>{email}<br />{location}</p>

                                </ContactItem>
                                    <button onClick={(e) => this.delateItem(contact)}></button>
                                </div>
                            }) : null
                        }
                    </div>
                    <div className="loader">
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
