

import React,{useState,useEffect} from 'react';
import { CalculateTotal } from './utils';



const CashDisbursementsJournal=()=>{
    const [journalEntries,setJournalEntries]=useState([])


    useEffect(()=>{

        // load from localStorage

        const _cashDisbursementsJournal=JSON.parse(localStorage.getItem("cashDisbursementsJournal"));

        if(!_cashDisbursementsJournal){
            setJournalEntries([])
        }else{

            setJournalEntries(_cashDisbursementsJournal);
        }

    },[])


    return (
        <div>
            <h1 className='label_title'>Cash Disbursements Journal</h1>
            <div style={{
                fontWeight:650,
                background:'rgb(245, 244, 244)',
                padding:'6px',
                border:'1px solid rgb(214, 213, 213)',
                borderBottom:'none',
                color:'#787a76',
                marginTop:'30px'

            }}>
                 CASH DISBURSEMENTS JOURNAL
            </div>
            <table >
            
                
                <thead >
                
            
                    <th style={{width:'5%'}}>Date</th>
                    <th style={{width:'8%'}}>Check No.</th>
                    <th>Payee</th>
                    <th style={{width:'14%'}}> Account Debited</th>
                    <th style={{width:'3%'}}>PR</th>
                  
                    <th style={{width:'8%'}}>Cash Cr.</th>
                    <th style={{width:'9%'}}>Inventory Cr.</th>
                    <th style={{width:'13%'}} >Account Payable Dr.</th>
                  
                    
                    <th>Other Accounts Dr.</th>
                    
                  

                </thead>
                <tbody>
                     {journalEntries.map((t,i)=>{
                        return (
                            <tr key={i}>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td>{t.checkNo}</td>
                                <td>{t.payee}</td>
                                <td style={{textAlign:'left'}}>{t.accountDebited}</td>
                                <td>{t.pr}</td>
                               
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.cash).toFixed(2)}</td>
                           
                                
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.inventory).toFixed(2)}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.accountPayable).toFixed(2)}</td>
 
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.otherAccounts).toFixed(2)}</td>

                            </tr>
                        )
                     })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td colSpan={4} style={{textAlign:'right',fontWeight:650}}>Totals</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"cash")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"inventory")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"accountPayable")).toFixed(2)}</td>
                       
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"otherAccounts")).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default CashDisbursementsJournal;