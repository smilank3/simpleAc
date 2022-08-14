
import React from 'react'
import { 
    PurchaseJournal,
    PurchaseReturnsAndAllowancesJournal,
    SalesJournal,
    SalesReturnsAndAllowance,
    CashReceiptJournal,
    CashDisbursementsJournal
} from './JournalComponent';

const Journal=()=>{
    return (
        <div>
            <PurchaseJournal />

            <br/>
         
            <PurchaseReturnsAndAllowancesJournal/>
            <br/>
            <SalesJournal />

            <br />
            <SalesReturnsAndAllowance />

            <br/>
            <CashReceiptJournal />

            <br/>
            <CashDisbursementsJournal />
        </div>
    )
}

export default Journal;