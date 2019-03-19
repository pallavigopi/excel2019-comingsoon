import React, {Component} from 'react'
import styles from './style.module.css';


export default class ExcelAbout extends Component {
    
    render() {
        return(
                <div className={styles["excel-details"]}>
                    <div className={styles["abouttext"]}>
                        <p className={styles["about-text"]}>First tech fest in the world, better than the rest.</p>
                        <p className={styles["about-text"]}>Random bullshit about how excel is gonna  make the world a better place.</p>
                        <p className={styles["about-text"]}>20th Edition blah blah, ask content team for the rest.</p>
                    </div>
                </div>
        );
    }
}