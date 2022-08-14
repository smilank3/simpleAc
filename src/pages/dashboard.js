
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { CharOfAccounts, Transactions, Journal, profile, Profile,Doc } from '../components';
import { PurchaseJournal,SalesJournal,CashDisbursementsJournal,CashReceiptJournal } from '../components/JournalComponent';
import { GeneralLedger,PayableLedger,ReceivableLedger } from '../components/Ledger';


// nested menus
const NestedMenus=({menuLists,setMenu,menuId})=>{
    return (
        <ul style={{display:'block',padding:0}}>
            {menuLists.map((menu,index)=>{
                console.log(menuId);
                console.log(menu)
                return <li className='menu-list' style={{
                    backgroundColor: menuId === menu.id ? "#faf2f2" : null,
                    color: menuId === menu.id ? '#a74c4c' : null,
                    fontWeight:500,
                }} key={index} onClick={()=>{
                   
                    setMenu(menu)
                }}>  <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '6px', marginRight: '4px', marginLeft: '0px', visibility: menuId === menu.id ? "" : "hidden" }}>'</span>
                <span>{menu.label}</span></li>
            })}
       
       </ul>

    )
}


const SignInComponent=({business,updateBusiness})=>{
    // userName and password

    const [signInInfo,setSignInInfo]=useState({userName:'',password:''})
    return (
        <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    right: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: '400px',


                    boxShadow: 'rgba(0, 30, 43, 0.3) 0px 4px 10px -4px',
                    borderRadius: '20px',
                    padding: '20px'



                }}>
                <div class="form-style-1">
                    <div style={{
                        marginBottom: '10px'
                    }}>
                        <h1>Log in</h1>

                    </div>

                    <form onSubmit={(e)=>{
                        // sign in 
                        // since we have userName and password is in localStorage State
                        // it pretty simple

                        // check the userName and password

                        // if matched the, remove login in modal else show error message

                        e.preventDefault();

                    


                        const _business=JSON.parse(localStorage.getItem("business"));

                        if(_business.userName===signInInfo.userName && _business.password===signInInfo.password){

                            // if matched;
                            //update localStorage isSignOut:false;

                            _business.isSignOut=false;

                            //save new update business;
                            localStorage.setItem("business",JSON.stringify(_business));

                            // re render the dashboard componet
                            updateBusiness({
                                ...business,
                                ..._business,
                            })
                            

                           

                        }else{
                            // check if userName or password is incorrect and show message;

                            if(_business.userName===signInInfo.userName){
                                Swal.fire("Incorrect Password");
                            }else{
                                Swal.fire("Incorrect UserName")

                            }
                            
                        }
                      



                    }}>
                        <input type="text" id="login" name="userName" placeholder="Username" onChange={(e)=>setSignInInfo({...signInInfo,[e.target.name]:e.target.value})} className='field-long' style={{ marginBottom: '20px' }} />

                        <input type="password" name="password" id="password" placeholder="Password" className='field-long' onChange={(e)=>setSignInInfo({...signInInfo,[e.target.name]:e.target.value})}  />
                        <input type="submit" className='button' style={{marginTop:'40px',border:'2px solid ',padding:'auto 10px'}} value="submit" />

                    </form>



                </div>


            </div>

    )
}

const Dashboard = () => {

    const [menu, setMenu] = useState({ id: 1, label: 'Transactions' });



    // business info pass as prop to Only Profile.

    const [business, setBusiness] = useState(null);


    useEffect(() => {
      

        // save sample data to localStroage.
        const _transactions = JSON.parse(localStorage.getItem("transactions"));
        const _purchaseJournal = JSON.parse(localStorage.getItem("purchaseJournals"));
        const _salesJournal = JSON.parse(localStorage.getItem("salesJournals"));
        const _cashReceiptJournal = JSON.parse(localStorage.getItem("cashReceiptJournals"));

        const _business = JSON.parse(localStorage.getItem("business"));

        if (!_business) {
            let newBusiness = {
                businessName: 'Sample Business',
                businessEmail: 'sampeEmail@gmail.com',
                businessPhone: '3234242344243',
                businessAddress: '111 sample street 12 test Ave, NY',
                businessType: 'distributors',
                userName: "Joh_Doe",
                password: "",
                isSampleAccount: true,
                isSignOut: false,


            }
            // save new business to localStorage

            localStorage.setItem("business", JSON.stringify(newBusiness));

            setBusiness(newBusiness);


        } else {
            // stored business
            setBusiness(_business)

        }



    }, [business?.isSignOut])

    if (!business) {
        return (
            <div>loading..</div>
        )
    }


    if (business.isSignOut) {
        return (

            <SignInComponent business={business} updateBusiness={setBusiness}/>
            
        )
    }

    return (
        <div>
            <div style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                height: '40px',
                backgroundColor: '#fffcfc',
                borderBottom: '1px solid #efefef',
            }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: '',

                        height: '40px'

                    }}>

                    <div
                        style={{
                            width: '180px',
                            borderRight: '1px solid #efefef'
                        }}>
                        <h3 ><span style={{background:'lightcoral',padding:'2px 4px',color:'white',borderRadius:'3px'}}>Simple AC</span></h3>
                    </div>

                    <div
                        style={{
                            border: '',
                            display: 'flex',
                            flex: 1,
                            marginRight: '40px',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                        <div style={{ flex: 1, border: '' }}><h3></h3></div>

                        <div style={{ flex: 1, border: '', textAlign: 'left' }}><h3>{business.businessName}</h3></div>

                        <div style={{ flex: 1, border: '', textAlign: 'right' }}>
                            <button
                             style={{
                                border: 'none',
                                borderRadius: '15px',
                                padding: '4px 8px',
                                backgroundColor: menu.id === 101 ? "#faf2f2" : null,
                                color: menu.id === 101 ? '#a74c4c' : null,
                                minWidth: '100px'

                            }}
                            className="button"
                            onClick={()=>{
                                setMenu({ id: 101, label: "Documentation" })

                            }}>
                                  <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '9px', marginRight: '6px', marginLeft: '0px', textAlign: 'left', visibility: menu.id === 101 ? "" : "hidden" }}>''</span>Documentation</button>

                            <button
                                style={{
                                    border: 'none',
                                    borderRadius: '15px',
                                    padding: '4px 8px',
                                    backgroundColor: menu.id === 100 ? "#faf2f2" : null,
                                    color: menu.id === 100 ? '#a74c4c' : null,
                                    minWidth: '100px'

                                }}
                                className="button"
                                onClick={() => {

                                    setMenu({ id: 100, label: "Account" })
                                }}>
                                <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '9px', marginRight: '6px', marginLeft: '0px', textAlign: 'left', visibility: menu.id === 100 ? "" : "hidden" }}>''</span>

                                John_Doe
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            {/** side menu */}
            <div
                style={{

                    height: '100%',
                    width: '180px',
                    position: 'fixed',
                    backgroundColor: '#fffcfc',
                    top: 40

                }}>

                {/* Menus */}
                <div style={{



                    marginTop: '20px',
                    textAlign: 'left'

                }}>

                    <ul style={{

                        padding: 0

                    }}>
             
                        <li className='menu-submenu'>Accounting</li>


                        <li className='menu-list' onClick={() => setMenu({ id: 1, label: 'Transactions' })}
                            style={{
                                backgroundColor: menu.id === 1 ? "#faf2f2" : null,
                                color: menu.id === 1 ? '#a74c4c' : null
                            }}
                        >
                            <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '6px', marginRight: '4px', marginLeft: '0px', visibility: menu.id === 1 ? "" : "hidden" }}>'</span>
                            Transcations
                        </li>

                        <li className='menu-list' onClick={() => setMenu({ id: 2, label: 'Chart Of Accounts' })}
                            style={{
                                backgroundColor: menu.id === 2 ? "#faf2f2" : null,
                                color: menu.id === 2 ? '#a74c4c' : null,
                                display:'none'
                            }}
                        >
                            <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '6px', marginRight: '4px', marginLeft: '0px', visibility: menu.id === 2 ? "" : "hidden" }}>'</span>
                            Chart Of Accounts
                        </li>
                        <li className='menu-list' 
                            style={{
                                backgroundColor: menu.id === 3 ? "#faf2f2" : null,
                                color: menu.id === 3 ? '#a74c4c' : null
                            }}
                        >
                    
                        <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '6px', marginRight: '4px', marginLeft: '0px', visibility: menu.id === 3 ? "" : "hidden" }}>'</span>
                          <span style={{display:'inline-block'}}>Journals</span>
                         
                            <NestedMenus menuLists={[
                                {id:301,label:'Purchase Journal',label2:'purchaseJournal'},
                                {id:302,label:'Sales Journal',label2:'salesJournal'},
                                {id:303,label:'Cash Receipts ',label2:'cashReceiptsJournal'},
                                {id:304,label:'Cash Disbursements ',label2:'cashDisbursementsJournal'}
                            ]} menuId={menu.id} setMenu={setMenu}/>
                           
                        </li>
                        <li className='menu-list' 
                            style={{
                                backgroundColor: menu.id === 4 ? "#faf2f2" : null,
                                color: menu.id === 4 ? '#a74c4c' : null
                            }}
                        >
                    
                        <span style={{ borderRadius: '8px', backgroundColor: '#fca9a9', color: '#fca9a9', height: '', width: '6px', marginRight: '4px', marginLeft: '0px', visibility: menu.id === 3 ? "" : "hidden" }}>'</span>
                          <span style={{display:'inline-block'}}>Ledgers</span>
                         
                            <NestedMenus menuLists={[
                                {id:401,label:'General Ledger',label2:'generalLedger'},
                                {id:402,label:'A/C R.A Ledger',label2:'accontReceivableLedger'},
                                {id:403,label:'A/C P.A Ledger',label2:'accountPayableLedger'},
                                
                            ]} menuId={menu.id} setMenu={setMenu}/>
                           
                        </li>
                        

                    </ul>

                </div>

            </div>

            {/* main content */}

            <div style={{
                marginLeft: '180px',





            }}>

                {/* pages content */}
                <div
                    style={{
                        marginTop: '40px',
                        padding: '20px'
                    }}>


                    {/* component */}

                    {menu.id === 1 ? (
                        <Transactions />
                    ) : menu.id === 2 ? (
                        <CharOfAccounts />
                    ) : menu.id === 322 ? (
                        <Journal />
                    ) : menu.id === 100 ? (
                        <Profile business={business} updateBusiness={setBusiness} />
                    ) : menu.id===301?(
                        <PurchaseJournal />
                    ): menu.id===302?(
                        <SalesJournal />
                    ): menu.id===303?(
                        <CashReceiptJournal />
                    ): menu.id ===304?(
                        <CashDisbursementsJournal />
                    ): menu.id===101?(
                        <Doc />
                    ): menu.id===401?(
                        <GeneralLedger />
                    ): menu.id===402?(
                        <ReceivableLedger />
                    ): menu.id===403?(
                        <PayableLedger/>
                    ):null}




                </div>

            </div>
        </div>
    )
}

export default Dashboard;