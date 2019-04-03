import React, {Component} from 'react';
import styles from './style.module.css';
import EventCard from 'components/event-card';
import ComingSoon from '../../components/coming-soon';
import Header from 'components/header';
import ExcelAbout from 'components/excel-about';
import ibetoLogo from './ibetologo.png';
import hackfortomorrow from './hftlogo.png';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            events:[{name:"IBETO 2019",imgsrc:ibetoLogo,link:"http://ibeto.excelmec.org/",description:"Lots of cash, low competition, easy win. More info here "},
            {name:"HackForTomorrow 2019",imgsrc:hackfortomorrow,link:"https://hackfortomorrow.excelmec.org/",description:"Literally the same as last year. More info here "}]
        }
    }
    render() {
        var grid=[]
        var events = this.state.events
        for(var i in events){
			var gridItem = ( <a target="_blank" key={i} className={styles["events"]} href={events[i].link} ><EventCard details={events[i]}/></a>)
			grid.push(gridItem)
        }
        return(
            <div className={styles["home"]}>
                <Header />
                <ExcelAbout />
                <div id={styles["event-grid"]}>
                  {grid}
                </div>
                <ComingSoon />

            </div>
        );
    }
}
