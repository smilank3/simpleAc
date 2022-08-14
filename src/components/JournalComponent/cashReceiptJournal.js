

import React,{useState,useEffect} from 'react';
import { CalculateTotal } from './utils';



const CashReceiptJournal=()=>{

    const [journalEntries,setJournalEntries]=useState([])


    useEffect(()=>{

        // load from localStorage

        const _cashReceiptJournal=JSON.parse(localStorage.getItem("cashReceiptsJournal"));

        if(!_cashReceiptJournal){
            setJournalEntries([])
        }else{

            setJournalEntries(_cashReceiptJournal);
        }

    },[])

    return (
        <div>
            <h1 className='label_title'>Cash Receipts Journal</h1>
            <div style={{
                fontWeight:650,
                background:'rgb(245, 244, 244)',
                padding:'6px',
                border:'1px solid rgb(214, 213, 213)',
                borderBottom:'none',
                color:'#787a76',
                marginTop:'30px'

            }}>
                 CASH RECEIPT JOURNAL
            </div>
            <table >
            
                
                <thead >
                
            
                    <th style={{width:'5%'}}>Date</th>
                    <th style={{width:'14%'}}> Account Credited</th>
                    <th style={{width:'3%'}}>PR</th>
                    <th>Explanation</th>
                    <th style={{width:'8%'}}>Cash Dr.</th>
                    <th style={{width:'13%'}} >Account Receivable Cr.</th>
                    <th >Sales Discount Dr.</th>
                    <th style={{width:'6%'}}>Sales Cr.</th>
                    <th>Other Accounts Dr.</th>
                    
                  

                </thead>
                <tbody>
                     {journalEntries.map((t,i)=>{
                        return (
                            <tr key={i}>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td style={{textAlign:'left'}}>{t.accountCredited}</td>
                                <td>{t.pr}</td>
                               
                                <td>{t.explanation}</td>
                                
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.cash).toFixed(2)}</td>
                           
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.accountReceivable).toFixed(2)}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.salesDiscount).toFixed(2)}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.sales).toFixed(2)}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.otherAccounts).toFixed(2)}</td>

                            </tr>
                        )
                     })}
                </tbody>
                <tfoot style={{display:journalEntries.length?'':'none'}}>
                    <tr>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td colSpan={3} style={{textAlign:'right',fontWeight:650}}>Totals</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"cash")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"accountReceivable")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"salesDiscount")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"sales")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"otherAccounts")).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default CashReceiptJournal;