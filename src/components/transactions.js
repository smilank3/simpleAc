
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus } from 'react-icons/fi'
import { PurchaseJournal } from "./JournalComponent";

const data = [
  {
    date: new Date(),
    description: 'someting',
    type: 'Purchase',
    category: 'inventory',
    amount: 32424,
  },
  {
    date: new Date(),
    description: 'someting',
    type: 'Purchase',
    category: 'inventory',
    amount: 32424,
  }
  , {
    date: new Date(),
    description: 'someting',
    type: 'Purchase',
    category: 'inventory',
    amount: 32424,
  }
]


// modal
const PurchaseOnCredit = ({ transactions, setTransactions }) => {
  return Swal.fire({
    title: 'New Purchase On Credit',
    html: `
       
        <ul class="form-style-1">
        <li>
        <label>Purchase Type</label>
        <select id="purchaseType" class="field-select" placeholder="fsdf">
        <option value="" >Select ....</option>
        <option value="Inventory">Inventory</option>
        <option value="Office Supplies">Office Supplies</option>
        <option value="Store Supplies">Store Supplies</option>
        </select>
    </li>
    <li><label>Vendor<span class="required">*</span></label>
    <input type="text" id="vendor" class="field-long" placeholder="vendor" />
    </li>
    <li>
        <label>Total Amount <span class="required">*</span></label>
        <input type="number" id="amount" placeholder="credit amount" class="field-long" />
    </li>
    <li>
    <label>Payment Terms <span class="required">*</span></label>
    <input type="text" id="paymentTerms" placeholder="net 30 days" class="field-long" />
</li>
   
<li>
<label>Invoice Date <span class="required">*</span></label>
<input type="date" id="invoiceDate"  class="field-long" />
</li>
</ul>`,
    confirmButtonText: 'Save',
    focusConfirm: false,
    preConfirm: () => {
      const purchaseType = Swal.getPopup().querySelector('#purchaseType').value
      const vendor = Swal.getPopup().querySelector('#vendor').value
      const totalAmount = Swal.getPopup().querySelector('#amount').value
      const paymentTerms = Swal.getPopup().querySelector('#paymentTerms').value
      const invoiceDate = Swal.getPopup().querySelector('#invoiceDate').value
      if (!purchaseType || !vendor || !totalAmount || !invoiceDate || !paymentTerms) {
        Swal.showValidationMessage(`Please enter all the information`)
      }
      return { purchaseType, vendor, totalAmount, invoiceDate, paymentTerms }
    }
  }).then((result) => {
    const { purchaseType, vendor, totalAmount, invoiceDate, paymentTerms } = result.value;
    console.log(result);
    // get data from localStorage
    const _transactions = JSON.parse(localStorage.getItem("transactions"));

    // new purhchase transaction
    const tran = {
      date: new Date(), transactionType: 'Purchase',
      transactionSummary: `Purchase ${purchaseType} from ${vendor} for \$${Number(totalAmount).toFixed(2)} on credit. Terms ${paymentTerms}.`,
      category: purchaseType, totalAmount: totalAmount
    }

    if (!_transactions) {
 
      let new_transactions = [];
      new_transactions.push(tran);

      localStorage.setItem("transactions", JSON.stringify(new_transactions));
      // update state
      setTransactions(new_transactions);






    } else {

      // if there is transcation 
      // push 
      _transactions.push(tran);

      // update db
      localStorage.setItem("transactions", JSON.stringify(_transactions));

      //update state
      setTransactions(_transactions)

    }

    // here we are assuming the previous transactions are saved without any issue.

    // Now, we post transaction to purchase journal

    const _purchaseJournal = JSON.parse(localStorage.getItem("purchaseJournal"));
    // new purchase journal entry
    // format

    const newPurchaseJournalEntry = {
      date:new Date(),
      accountCredited: vendor,
      invoiceDate: new Date(invoiceDate).toLocaleDateString(),
      paymentTerms: paymentTerms,
      pr: '32',
      accountPayable: Number.parseFloat(totalAmount),
      inventory: purchaseType === "Inventory" ? Number.parseFloat(totalAmount) : 0,
      officeSupplies: purchaseType === "Office Supplies" ? Number.parseFloat(totalAmount) : 0,
      storeSupplies: purchaseType === "Store Supplies" ? Number.parseFloat(totalAmount) : 0,


    }
    console.log(newPurchaseJournalEntry)
    if (!_purchaseJournal) {
      // if no purchase journal exist create new 

      let newPurchaseJournal = [];
      newPurchaseJournal.push(newPurchaseJournalEntry);
     // save db.
      localStorage.setItem("purchaseJournal", JSON.stringify(newPurchaseJournal))

    } else {
      _purchaseJournal.push(newPurchaseJournalEntry);
      //save db.

      localStorage.setItem("purchaseJournal", JSON.stringify(_purchaseJournal))

    }
  })
}


{/* Sales on Credit */ }
const SalesOnCredit = ({ transactions, setTransactions }) => {
  return Swal.fire({
    title: 'New Sales On Credit',
    html: `
     
      <ul class="form-style-1">
      <li>
      <label>Sales Type</label>
      <select id="salesType" class="field-select" placeholder="fsdf">
      <option value="" >Select ...</option>
      <option value="Inventory">Inventory</option>
      <option value="Services">services</option>
      <option value="Others">Others</option>
      </select>
  </li>
  <li><label>Customer<span class="required">*</span></label>
  <input type="text" id="customer" class="field-long" placeholder="customer" />
  </li>
  <li>
      <label>Invoice No. <span class="required">*</span></label>
      <input type="number" id="invoiceNumber" placeholder="invoice.." class="field-long" />
  </li>
  <li>
  <label>Total Amount <span class="required">*</span></label>
  <input type="number" id="amount" placeholder="credit amount" class="field-long" />
</li>
 

</ul>`,
    confirmButtonText: 'Save',
    focusConfirm: false,
    preConfirm: () => {
      const salesType = Swal.getPopup().querySelector('#salesType').value
      const customer = Swal.getPopup().querySelector('#customer').value
      const totalAmount = Swal.getPopup().querySelector('#amount').value
      const invoiceNumber = Swal.getPopup().querySelector('#invoiceNumber').value
      if (!salesType || !customer || !totalAmount || !invoiceNumber) {
        Swal.showValidationMessage(`Please enter all the information`)
      }
      return { salesType, customer, totalAmount, invoiceNumber }
    }
  }).then((result) => {
    const { salesType, customer, totalAmount, invoiceNumber } = result.value;
    // get data from localStorage
    const _transactions = JSON.parse(localStorage.getItem("transactions"));

    // new purhchase transaction
    const tran = {
      date: new Date(),
      transactionType: 'Sales',
      transactionSummary: `Sold ${salesType} to ${customer} for \$${Number(totalAmount).toFixed(2)} on credit.`,
      category: salesType, totalAmount: totalAmount
    }

    if (!_transactions) {
      alert('no transactions');
      let new_transactions = [];
      new_transactions.push(tran);

      localStorage.setItem("transactions", JSON.stringify(new_transactions));
      // update state
      setTransactions(new_transactions)

    } else {

      // if there is transcation 
      // push 
      _transactions.push(tran);

      // update db
      localStorage.setItem("transactions", JSON.stringify(_transactions));

      //update state
      setTransactions(_transactions)

    }


        // Similarly, here we are assuming the previous transactions are saved without any issue.

    // Now, we post transaction to  journal

    const _salesJournal = JSON.parse(localStorage.getItem("salesJournal"));
    // new  journal entry
    // format

    const newSalesJournalEntry = {
      date:new Date(),
      accountDebited: customer,
      invoiceNumber:invoiceNumber,
      
      pr: '32',
      accountReceivable: Number.parseFloat(totalAmount),
     


    }

    if (!_salesJournal) {
      // if no purchase journal exist create new 

      let newSalesJournal = [];
      newSalesJournal.push(newSalesJournalEntry);
     // save db.
      localStorage.setItem("salesJournal", JSON.stringify(newSalesJournal))

    } else {
      _salesJournal.push(newSalesJournalEntry);
      //save db.

      localStorage.setItem("salesJournal", JSON.stringify(_salesJournal))

    }
  })
}

{/* Cash Receipt */ }
const CashReceipt = ({ transactions, setTransactions }) => {
  return Swal.fire({
    title: 'Recive Cash',
    html: `
     
      <ul class="form-style-1">
      <li>
      <label>Cash Receive For: </label>
      <select id="paymentReceiveFor" class="field-select" placeholder="fsdf">
      <option value="" >Select ....</option>
     
      <option value="Sales"> Sales</option>
      <option value="Services"> Service</option>
      <option value="Others">others</option>
      </select>
  </li>
  <li><label>Payer<span class="required">*</span></label>
  <input type="text" id="payer" class="field-long" placeholder="vendor" />
  </li>
  <li>
      <label>Total Amount <span class="required">*</span></label>
      <input type="number" id="amount" placeholder="credit amount" class="field-long" />
  </li>
  <li>
  <label>Explanation <span class="required">*</span></label>
 
  <select id="explanation" class="field-select" placeholder="">
  <option value="" >Select ....</option>
 
  <option value="Invoice Sales"> Invoice Sales</option>
  <option value="Cash Sales"> Cash Sales</option>
  <option value="Bank Account">Bank Account</option>
  <option value="Others">Others </option>
  </select>
</li>
 

</ul>`,
    confirmButtonText: 'Save',
    focusConfirm: false,
    preConfirm: () => {
      const paymentReceiveFor = Swal.getPopup().querySelector('#paymentReceiveFor').value
      const payer = Swal.getPopup().querySelector('#payer').value
      const totalAmount = Swal.getPopup().querySelector('#amount').value;
      const explanation = Swal.getPopup().querySelector('#explanation').value
      if (!paymentReceiveFor || !payer || !totalAmount || !explanation) {
        Swal.showValidationMessage(`Please enter all the information`)
      }
      return { paymentReceiveFor, payer, explanation, totalAmount }
    }
  }).then((result) => {
    const {value}=result;
    const { paymentReceiveFor, payer, explanation, totalAmount } = value;
    // get data from localStorage
    const _transactions = JSON.parse(localStorage.getItem("transactions"));

    // new purhchase transaction
    const tran = {
      date: new Date(),
      transactionType: 'Cash Receipts',
      transactionSummary: `Received paymennt from ${payer}.`,
      category: paymentReceiveFor, totalAmount: totalAmount
    }

    if (!_transactions) {
      alert('no transactions');
      let new_transactions = [];
      new_transactions.push(tran);

      localStorage.setItem("transactions", JSON.stringify(new_transactions));
      // update state
      setTransactions(new_transactions)

    } else {

      // if there is transcation 
      // push 
      _transactions.push(tran);

      // update db
      localStorage.setItem("transactions", JSON.stringify(_transactions));

      //update state
      setTransactions(_transactions)

    }


      // Similarly, here we are assuming the previous transactions are saved without any issue.

    // Now, we post transaction to  journal

    const _cashReceiptsJournal = JSON.parse(localStorage.getItem("cashReceiptsJournal"));
    // new  journal entry
    // format

    const newCashReceiptJournalEntry = {
      date:new Date(),
      accountCredited: payer,
      explanation:explanation,

      
      pr: '32',
      cash:Number.parseFloat(totalAmount),
      salesDiscount:0,
      accountReceivable:explanation==="Invoice Sales"?Number.parseFloat(totalAmount):0,
      sales:explanation==="Cash Sales"?Number.parseFloat(totalAmount):0,
      otherAccounts:explanation==="Bank Account" ?Number.parseFloat(totalAmount):0,
     


    }
console.log(newCashReceiptJournalEntry)
    if (!_cashReceiptsJournal) {
      // if no purchase journal exist create new 

      let newCashReceiptJournal = [];
      newCashReceiptJournal.push(newCashReceiptJournalEntry);
     // save db.
      localStorage.setItem("cashReceiptsJournal", JSON.stringify(newCashReceiptJournal))

    } else {
      _cashReceiptsJournal.push(newCashReceiptJournalEntry);
      //save db.

      localStorage.setItem("cashReceiptsJournal", JSON.stringify(_cashReceiptsJournal))

    }
  })
}

{/* Cash payment */ }

const CashPayment = ({ setTransactions }) => {
  return Swal.fire({
    title: 'Pay Cash',
    html: `
     
      <ul class="form-style-1">
      <li>
      <label>Pay For</label>
      <select id="payFor" class="field-select" placeholder="fsdf">
      <option value="" >Select....</option>
      <option value="Inventory">Purchased Inventory</option>
      <option value="Payroll">Payroll </option>
    
      <option value="others">Others</option>
      </select>
  </li>
  <li><label>Payee <span class="required">*</span></label>
  <input type="text" id="payee" class="field-long" placeholder="payee" />
  </li>
  <li>
      <label>Total Amount <span class="required">*</span></label>
      <input type="number" id="amount" placeholder="credit amount" class="field-long" />
  </li>
 

</ul>`,
    confirmButtonText: 'Save',
    focusConfirm: false,
    preConfirm: () => {
      const payFor = Swal.getPopup().querySelector('#payFor').value
      const payee = Swal.getPopup().querySelector('#payee').value
      const totalAmount = Swal.getPopup().querySelector('#amount').value
      if (!payFor || !payee || !totalAmount) {
        Swal.showValidationMessage(`Please enter all the information`)
      }
      return { payFor, payee, totalAmount }
    }
  }).then((result) => {
    const { payFor, payee, totalAmount } = result.value;
    // get data from localStorage
    const _transactions = JSON.parse(localStorage.getItem("transactions"));

    // new purhchase transaction
    const tran = {
      date: new Date(),
      transactionType: 'Cash Payment/Disbursements',
      transactionSummary: `Paid to ${payee}.`,
      category: payFor, totalAmount: totalAmount
    }

    if (!_transactions) {
      alert('no transactions');
      let new_transactions = [];
      new_transactions.push(tran);

      localStorage.setItem("transactions", JSON.stringify(new_transactions));
      // update state
      setTransactions(new_transactions)

    } else {

      // if there is transcation 
      // push 
      _transactions.push(tran);

      // update db
      localStorage.setItem("transactions", JSON.stringify(_transactions));

      //update state
      setTransactions(_transactions)

    }


          // Similarly, here we are assuming the previous transactions are saved without any issue.

    // Now, we post transaction to  journal

    const _cashDisbursementsJournal = JSON.parse(localStorage.getItem("cashDisbursementsJournal"));
    // new  journal entry
    // format

    const newCashDisbursementsJournalEntry = {
      date:new Date(),
      checkNo:324,
      payee:payee,
      accountDebited:payFor==="Inventory"?payee:payFor==="Payroll"?"Salaries Expense":"Other Expenses",
      pr: '32',
      cash:Number.parseFloat(totalAmount),
      inventory:0, // if discount.
      accountPayable:payFor==="Inventory"?Number.parseFloat(totalAmount):0,
      otherAccounts:payFor!=="Inventory"?Number.parseFloat(totalAmount):0,

     
     


    }

    if (!_cashDisbursementsJournal) {
      // if no purchase journal exist create new 

      let newCashDisbursementsJournal = [];
      newCashDisbursementsJournal.push(newCashDisbursementsJournalEntry);
     // save db.
      localStorage.setItem("cashDisbursementsJournal", JSON.stringify(newCashDisbursementsJournal))

    } else {
      _cashDisbursementsJournal.push(newCashDisbursementsJournalEntry);
      //save db.

      localStorage.setItem("cashDisbursementsJournal", JSON.stringify(_cashDisbursementsJournal))

    }

  })
}

const Transactions = () => {

  const [transactions, setTransactions] = useState([]);


  useEffect(() => {

    // intiial load.

    const _transactions = JSON.parse(localStorage.getItem("transactions"));
    if (!_transactions) {

      // 

      setTransactions([]);

    } else {
      setTransactions(_transactions)

    }
  }, [])

  return (
    <div>


      {/*  */}
      <h1 className="label_title">Transaction</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '30px',
          marginBottom: '30px'
        }}>
        <button className="button" style={{ fontWeight: 650, display: 'inline-flex', alignItems: 'center' }} onClick={() => {
          PurchaseOnCredit({ transactions, setTransactions });
        }}><FiPlus style={{ marginRight: '4px' }} />Purchase On Credit </button>
        <button className="button" style={{ fontWeight: 650, display: 'inline-flex', alignItems: 'center' }} onClick={() => {
          SalesOnCredit({ transactions, setTransactions });
        }}

        > <FiPlus style={{ marginRight: '4px' }} />Sales On Credit</button>
        <button className="button" style={{ fontWeight: 650, display: 'inline-flex', alignItems: 'center' }} onClick={() => {
          CashReceipt({ transactions, setTransactions });
        }}

        > <FiPlus style={{ marginRight: '4px' }} />Cash Receipt</button>
        <button className="button" style={{ fontWeight: 650, display: 'inline-flex', alignItems: 'center' }} onClick={() => {
          CashPayment({ transactions, setTransactions });
        }}

        > <FiPlus style={{ marginRight: '4px' }} />Cash Payment/Disbursement</button>

      </div>

      <div>
        <table
          style={{
            maxWidth: '70%',

          }}>
          <thead >
            <th>Date</th>
            <th style={{ width: '25%' }}>Transaction summary</th>
            <th>Type</th>
            <th>Category</th>
            <th style={{ width: '10%' }}>Amount</th>


          </thead>
          <tbody>
            {transactions.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{new Date(el.date).toLocaleDateString()}</td>
                  <td>{el.transactionSummary}</td>
                  <td>{el.transactionType}</td>
                  <td>{el.category}</td>
                  <td style={{ textAlign: 'right', color: '#8e908c' }}><span style={{ margin: '0px 2px' }}>$</span>{Number(el.totalAmount).toFixed(2)}</td>

                </tr>
              )
            })}

          </tbody>
          <tfoot>

          </tfoot>
        </table>
      </div>



    </div>
  )
}

export default Transactions;