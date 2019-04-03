import React, { Component } from 'react'
import styles from './style.module.css';
import $ from 'jquery';

export default class ComingSoon extends Component {

    render() {
        
        $(document).ready(function(){
  
            var $randomnbr = $('.nbr');
            var $timer= 10;
            var $it;
            var $data = 0;
            var index;
            var change;
            var letters = ["C", "O", "M", "I", "N", "G"," ", "S", "O", "O", "N"];
            
            $randomnbr.each(function(){
                
              change = Math.round(Math.random()*300);
              $(this).attr('data-change', change);
              
            });
            
            function random(){
              return Math.round(Math.random()*9);
            };
            
            function select(){
              return Math.round(Math.random()*$randomnbr.length+1);
            };
            
            function value(){
              $('.nbr:nth-child('+select()+')').html(''+random()+'');
              $('.nbr:nth-child('+select()+')').attr('data-number', $data);
              $data++;
              
              $randomnbr.each(function(){
                  if(parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))){
                    index = $('.ltr').index(this);
                    $(this).html(letters[index]);
                    $(this).removeClass('nbr');
                  }
              });
              
            };
            
            $it = setInterval(value, $timer);
              
          })

        return (
            
            <div className={styles["coming-soon"]}>

                <div className="content">
                    <div className="random">
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                        <span className="nbr ltr">0</span>
                    </div>
                </div>
            </div>
        );
    }
}