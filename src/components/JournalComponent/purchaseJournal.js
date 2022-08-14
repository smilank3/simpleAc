

import React, { useEffect, useState } from 'react';
import { CalculateTotal } from './utils';


const PurchaseJournal=()=>{

    const [journalEntries,setJournalEntries]=useState([])


    useEffect(()=>{

        // load from localStorage

        const _purchaseJournal=JSON.parse(localStorage.getItem("purchaseJournal"));

        if(!_purchaseJournal){
            setJournalEntries([])
        }else{

            setJournalEntries(_purchaseJournal);
        }

    },[])

    

    return (
        <div>
            <h1 className='label_title'>Purchase Journal</h1>
            <div style={{
                fontWeight:650,
                background:'rgb(245, 244, 244)',
                padding:'6px',
                border:'1px solid rgb(214, 213, 213)',
                borderBottom:'none',
                color:'#787a76',
                marginTop:'30px'

            }}>
                 PURCHASE JOURNAL
            </div>
            <table >
            
                
                <thead >
                
            
                    <th style={{width:'5%'}}>Date</th>
                    <th style={{width:'16%'}}>Vendor's Account Credited</th>
                    <th style={{width:'8%'}}>Invoice Date</th>
                    <th>Payment Terms</th>
                    <th style={{width:'3%'}}>RR</th>
                    <th style={{width:'13%'}} >Account Payable Cr.</th>
                    <th >Inventory Dr.</th>
                    <th>Office Supplies</th>
                    <th>Store Supplies</th>
                  

                </thead>
                <tbody>
                     {journalEntries.map((t,i)=>{
                        return (
                            <tr key={i}>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td style={{textAlign:'left'}}>{t.accountCredited}</td>
                                <td>{new Date(t.invoiceDate).toLocaleDateString()}</td>
                                <td>{t.paymentTerms}</td>
                                <td>{t.pr}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.accountPayable).toFixed(2)}</span></td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.inventory).toFixed(2)}</span></td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.officeSupplies).toFixed(2)}</span></td>
                                <td style={{textAlign:'right',color:'#8e908c',}}><span style={{}}></span><span style={{margin:'0px 2px'}}>$</span>{Number(t.storeSupplies).toFixed(2)}</td>

                            </tr>
                        )
                     })}
                </tbody>
                <tfoot style={{display:journalEntries.length?'':'none'}}>
                    <tr>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td colSpan={4} style={{textAlign:'right',fontWeight:650}}>Totals</td>
                       
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"accountPayable")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"inventory")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"officeSupplies")).toFixed(2)}</td>
                        <td style={{textAlign:'right',color:'#000000',fontWeight:650}}><span style={{margin:'0px 2px'}}>$</span>{Number(CalculateTotal(journalEntries,"storeSupplies")).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default PurchaseJournal;