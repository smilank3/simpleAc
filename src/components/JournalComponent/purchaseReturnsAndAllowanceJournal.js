

import React from 'react';

const data=[
{
    entryDate:new Date(), // purchase received date
    debitMemoNo:201,
    vendorName:'Horning Supply Co.',
    pr:'AP2',
    accountPayableDr:23.4,
    inventoryCr:3232,
    purchaseReturnsAndAllowCr:43242,
   

},

]

const PurchaseReturnsAndAllowancesJournal=()=>{

    return (
        <div>
            <div style={{
                fontWeight:650,
                background:'rgb(245, 244, 244)',
                padding:'6px',
                border:'1px solid rgb(214, 213, 213)',
                borderBottom:'none',
                color:'#787a76',
                fontSize:'15px'

            }}>
                 PURCHASE RETURNS AND ALLOWANCES JOURNAL
            </div>
            <table >
            
                
                <thead >
                
            
                    <th style={{width:'5%'}}>Date</th>
                    <th style={{width:'10%'}}>Debit Memo No.</th>
                    <th style={{width:'18%'}}>Vendor's Account Debited</th>
                    <th style={{width:'4%'}}>PR</th>
                    <th>Account Payable Dr.</th>
                    <th>Inventory Cr.</th>
                    <th>Purchase returns & Allow. Cr.</th>
                
                  

                </thead>
                <tbody>
                     {data.map((t,i)=>{
                        return (
                            <tr key={i}>
                                <td>{new Date(t.entryDate).toLocaleDateString()}</td>
                                <td>{t.debitMemoNo}</td>
                                <td style={{textAlign:'left'}}>{t.vendorName}</td>
                                <td >{t.pr}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.accountPayableDr).toFixed(2)}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.inventoryCr).toFixed(2)}</td>
                                <td style={{textAlign:'right',color:'#8e908c'}}><span style={{margin:'0px 2px'}}>$</span>{Number(t.purchaseReturnsAndAllowCr).toFixed(2)}</td>

                            </tr>
                        )
                     })}
                </tbody>
            </table>

        </div>
    )
}

export default PurchaseReturnsAndAllowancesJournal;