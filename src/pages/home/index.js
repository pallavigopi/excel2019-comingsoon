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

                    <div className={styles["header-left"]}>
                        <div className = {styles["mec-logo"]}></div>
                        <div className = {styles["mec"]}>Govt. Model Engineering College, Kochi</div>
                    </div>


                    <div className={styles["header-center"]}>
                        <div className={styles["header-title"]}>
                            <div className = {styles["excel-logo"]}></div>
                            <div className = {styles["excel"]}><b>EXCEL 2019</b></div>
                        </div>
                        <div className={styles["header-about"]}>
                            <p style={{marginLeft:"20%"}}>First tech fest in the world, better than the rest.</p>
                            <p style={{marginLeft:"3%"}}>Random bullshit about how excel is gonna  make the world a better place.</p>
                            <p style={{marginLeft:"16%"}}>20th Edition blah blah, ask content team for the rest.</p>
                        </div>
                    </div>

                    <div className={styles["header-right"]}>
                        <div className = {styles["excel-legacy"]}>Excel Legacy</div>
                        <div className = {styles["legacy-logo"]}></div>
                    </div>
                </div>

                <div id={styles["event-grid"]}>
                  {grid}
                </div>
                <ComingSoon />

            </div>
        );
    }
}
