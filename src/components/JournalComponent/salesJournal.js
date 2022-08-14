

import React,{useState,useEffect} from 'react';
import { CalculateTotal } from './utils';


const SalesJournal=()=>{

    const [journalEntries,setJournalEntries]=useState([])


    useEffect(()=>{

        // load from localStorage

        const _salesJournal=JSON.parse(localStorage.getItem("salesJournal"));

        if(!_salesJournal){
            setJournalEntries([])
        }else{

            setJournalEntries(_salesJournal);
        }

    },[])

    return (
        <div>
            <h1 className='label_title'>Sales Journal</h1>
            <div style={{
                fontWeight:650,
                background:'rgb(245, 244, 244)',
                
                border:'1px solid rgb(214, 213, 213)',
                borderBottom:'none',
                color:'#787a76',
                marginTop:'30px',
                width:'800px'

            }}>
                 SALES JOURNAL
            </div>
            <table style={{width:'802px'}} >
            
                
                <thead  >
                
            
                    <th style={{width:'6%'}}>Date</th>
                    <th style={{width:'16%'}}>Account Debited</th>
                    <th style={{width:'10%'}}>Invoice No.</th>
           
                    <th style={{width:'3%'}}>PR</th>
                    <th  >Account Receivable Dr. Sales Cr.</th>
               
               
                  

                </thead>
                <tbody>
                     {journalEntries.map((t,i)=>{
                        return (
                            <tr key={i}>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td style={{textAlign:'left'}}>{t.accountDebited}</td>
                                
                                <td>{t.invoiceNumber}</td>
                                <td>{t.pr}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.accountReceivable).toFixed(2)}</td>
                                
                                
                            </tr>
                        )
                     })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td colSpan={3} style={{textAlign:'right',fontWeight:650}}>Totals</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"accountReceivable")).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default SalesJournal;