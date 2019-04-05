import React, {Component} from 'react'
import styles from './style.module.css';
import excelLogo from './excel2018.png';
import mecLogo from './Meclogo.png';
import excel2014 from './excel2014.png';
import excel2015 from './excel2015.png';
import excel2016 from './excel2016.png';
import excel2017 from './excel2017.png';

export default class Header extends Component {
    
    render() {
        return(
                <div className={styles["header"]}>

                    <div className={styles["header-left"]}>
                        <a href="http://mec.ac.in" target="_blank"><img className={styles["logomec"]} src={mecLogo}/></a>
                        <div className = {styles["mec"]}><a href="http://mec.ac.in" target="_blank">Govt. Model Engineering College, Kochi</a></div>
                    </div>

                    <div className={styles["header-center"]}>
                        <div className={styles["header-title"]}>
                        <a href="https://excelmec.org" target="_blank"><img className={styles["logoexcel"]} src={excelLogo}/></a>
                            <div className = {styles["excel"]}>EXCEL 2019</div>
                        </div>
                    </div>

                    <div className={styles["header-right"]}>
                        <a href="https://excelmec.org/excel2014" target="_blank"><img className={styles["logolegacy"]} src={excel2014}/></a>
                        <a href="https://excelmec.org/excel2015" target="_blank"><img className={styles["logolegacy"]} src={excel2015}/></a>
                        <a href="https://excelmec.org/excel2016" target="_blank"><img className={styles["logolegacy"]} src={excel2016}/></a>
                        <a href="https://excelmec.org/excel2017" target="_blank"><img className={styles["logolegacy"]} src={excel2017}/></a>
                    </div>
                </div>

        );
    }
}