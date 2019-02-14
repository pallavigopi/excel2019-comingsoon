import React, {Component} from 'react'
import styles from './style.module.css';


export default class EventCard extends Component {
    
    render() {
        return(
            <div className={styles["event-card"]}>
                     {this.props.details.name}

            </div>
        );
    }
}