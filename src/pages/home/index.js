import React, {Component} from 'react'
import styles from './style.module.css';
import EventCard from 'components/event-card'
import ComingSoon from '../../components/coming-soon';


export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            events:[{name:"Ibeto",link:"http://ibeto.excelmec.org/",description:"la la la la la"},
            {name:"Ibeto",link:"http://ibeto.excelmec.org/",description:"la la la la la"}]
        }
    }
    render() {
        var grid=[]
        var events = this.state.events
        for(var i in events){
			var gridItem = ( <a target="_blank" key={i} style={{textDecoration:'none'}} href={events[i].link}><EventCard details={events[i]}/></a>)
			grid.push(gridItem)
        }
        return(
            <div style={{height: "100vh", overflow: "auto", color: "white"}}>
                <div className={styles["header"]}>
                    <div className={styles["header-left"]}></div>
                    <div className={styles["header-center"]}>
                        <div className={styles["header-title"]}></div>
                        <div className={styles["header-about"]}></div>
                    </div>
                    <div className={styles["header-right"]}></div>
                </div>
                <div id={styles["event-grid"]}>
                  {grid}
                </div>
                <ComingSoon />

            </div>
        );
    }
}
