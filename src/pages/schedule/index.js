import React, {Component} from 'react';
import styles from './style.module.css';
import ScheduleGridCard from 'components/schedule-grid-card';

export default class Events extends Component {

	constructor(props) {
		super(props);

		 //initialise state
		this.state = {
			index: 0
		}

		this.cardInfo = ["day_one", "day_two", "day_three"]
		this.changeTab = this.changeTab.bind(this)
	};

	changeTab = (i) => (e) => {
		this.setState({ index: i})
	}

	render() {
		var grid = []
		var tabs = []
		var cards = this.cardInfo
		for(var i in cards){
			i = parseInt(i)
			console.log(i===this.state.index, i)
			var classn = (i===this.state.index)?styles['active']:{}
			var gridItem = ( <ScheduleGridCard key={i} delay={i*100} details={cards[i]}/>)
			var tabItem = ( <div key={i} className={styles['schedule-tab'] + " " + classn} onClick={this.changeTab(i)}>Day {cards[i].day}</div>)
			grid.push(gridItem)
			tabs.push(tabItem)
		}
		
		return(
			<div className={styles["container"]}>
				<h1 className={styles['title']}>SCHEDULE</h1>
				<div className={styles['schedule-tab-container']}>
					{tabs}
				</div>
				<div className={styles["schedule-scroll"]}>
					<div id='scheduleContainer' className={styles["schedule-grid"]} style={{transform: "translateX(-"+this.state.index*100+"%)"}}>
							{grid}
					</div>
				</div>
			</div>
		);
	}
}