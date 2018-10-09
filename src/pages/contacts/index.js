import React, {Component} from 'react';
import styles from './style.module.css';
import ContactCard from 'components/contact-card';
import axios from 'axios'

export default class Contacts extends Component{

    constructor(props){
        super(props)
        this.state={
            cardInfo:[]
        }
    }

    componentWillMount(){
		var comp = this;
		axios.get("https://cms.excelmec.org/contact/")
			.then(function (response) {
				comp.setState({cardInfo: response.data})
			})
    }

    render(){
        var grid = []
        for(var i=0 ; i<this.state.cardInfo.length ; i++){
			var gridItem = <ContactCard key={i} details={this.state.cardInfo[i]} />
               grid.push(gridItem) 
        }  
        return(
            <div>
               <div className={styles["white-bg"]}></div>
               <div>
                    <header><h1>Get In Touch</h1></header>
                    <div className={styles["container"]}>
                        {grid}
                    </div>
                </div>
            </div>
        )
    }
}