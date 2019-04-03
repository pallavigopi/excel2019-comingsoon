import React, {Component} from 'react'
import styles from './style.module.css';


export default class ComingSoon extends Component {
    
    render() {
        
        return(
            <div className={styles["coming-soon"]}>
                <div className = {styles["gear-gif"]}></div>
                
                    <div className = {styles["comingSoon"]}>COMING SOON</div>
              
            </div>
        );
    }
}