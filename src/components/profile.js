import React, { useEffect, useState } from 'react';

import {FaRegEdit,FaSignOutAlt} from 'react-icons/fa'
import Swal from 'sweetalert2'


const EditInfoModal=({business,updateBusiness})=>{
    return Swal.fire({
        title: "Edit Company's Information",
        html: `
       
        <ul class="form-style-1">
    <li>
    <label>Business Name <span class="required">*</span></label>
    <input type="text" id="companyName" value='${business.businessName}' class="field-long" placeholder="Company Name" /> </li>
    <li>
        <label>Business Email <span class="required">*</span></label>
        <input type="email" id="businessEmail" value=${business.businessEmail} class="field-long" />
    </li>
    <li>
        <label>Business Type</label>
        <select  id="businessType" value='${business.businessType}' class="field-select">
        <option value="Distributors">Distributors</option>
    
      
        </select>
    </li>
    <li>
    <label>Business Phone No. <span class="required">*</span></label>
    <input type="text" id="businessPhone" value=${business.businessPhone} class="field-long" />
</li>
<li>
<label>Business Address. <span class="required">*</span></label>
<input type="text"  id="businessAddress" value='${business.businessAddress}' class="field-long" />
</li>
  
</ul>`,
        confirmButtonText: 'Save',
        focusConfirm: false,
        preConfirm: () => {
          const businessName = Swal.getPopup().querySelector('#companyName').value
          const businessEmail = Swal.getPopup().querySelector('#businessEmail').value
          const businessType = Swal.getPopup().querySelector('#businessType').value
          const businessPhone = Swal.getPopup().querySelector('#businessPhone').value
          const businessAddress = Swal.getPopup().querySelector('#businessAddress').value

          console.log(businessName)
          if (!businessName || ! businessEmail || !businessType || !businessPhone ) {
            Swal.showValidationMessage(`Please enter all information`)
          }
          return { businessName,businessEmail,businessType,businessPhone,businessAddress}
        }
      }).then((result) => {
        console.log(result)
        const { businessName,businessEmail,businessType,businessPhone,businessAddress}=result.value;

        // save to localStorage;

        const _business=JSON.parse(localStorage.getItem("business"));
        if(!_business){
            alert("Sorry. Something went wrong.")
        }else{

            _business.businessName=businessName;
            _business.businessEmail=businessEmail;
            _business.businessType=businessType;
            _business.businessPhone=businessPhone;
            _business.businessAddress=businessAddress;

            // update localStorage
            localStorage.setItem("business",JSON.stringify(_business));

            // update state
            updateBusiness({
                ...business,
                ..._business,
            })
        }

      })
}


// UserName form modal
const userNameInfoModal=({business,updateBusiness})=>{
    return Swal.fire({
        title: 'Yod do not have an Account. Create Account',
        text:"you do not have an account.",
        html: `
        <div class="form-style-1">
        <input type="text" id="userName" placeholder="Username" class="field-long" style="margin-bottom:20px;">
        <input type="password" id="password"  placeholder="Password" class="field-long">
        </div>
        
       `,
        confirmButtonText: 'Submit',
        focusConfirm: false,
        preConfirm: () => {
          const userName = Swal.getPopup().querySelector('#userName').value
          const password = Swal.getPopup().querySelector('#password').value
          if (!userName || !password) {
            Swal.showValidationMessage(`Please enter login and password`)
          }
          return { userName,password}
        }
      }).then((result) => {

        // update bussiness table and signOut.
        /*
        isSignOut:true,
        isSampleAccount:false,

        
        
        */

        const _business=JSON.parse(localStorage.getItem("business"));

        if(!_business){
            Swal.fire({
                title:"Sorry. Something Went Wrong."
            })
        }else{
       


            _business.userName=result.value.userName;
            _business.password=result.value.password;
            _business.isSampleAccount=false;    // no more sample account
            // when user create account then sign out
            // user can enter the information and sign in again.
            _business.isSignOut=true;

            // update localStorage

            localStorage.setItem("business",JSON.stringify(_business));

            // update business with new updated _business
            updateBusiness({
                ...business,
                ..._business,
            })
        }

   

     


      })
}

const Profile=({business,updateBusiness})=>{

    // businessInfo
    //const [business,setBusiness]=useState(null);

    useEffect(()=>{
        //load from localStorage

       /* setTimeout(()=>{
            setBusiness({
                businessName:'Sample Business',
                businessEmail:'sampeEmail@gmail.com',
                businessPhone:'3234242344243',
                businessAddress:'111 sample street 12 test Ave, NY',
                businessType:'distributors',
                userName:"",
                password:"",
                isSampleAccount:true,
                isSignOut:false,
            });

        },2000)*/
   
    },[])

    if(!business){
        return <div>
            loading..
        </div>
    }
    return (
        <div>

            {/* buttons */}
            <div
            style={{
        
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginRight:''
                
            }}>
                <div>
                    <h1 className='label_title'>Account</h1>
                </div>
                <div>
                <button
                style={{
                    margin:'0px 4px',
                    borderRadius:'15px',
                    border:'none',
                    padding:'4px 10px',
                    display:'inline-flex',
                    alignItems:'center'
                    }}
                    className="button"
                    
                    onClick={()=>{
                        // edit business info
                    
                        EditInfoModal({business,updateBusiness});
                    }}>
                        <FaRegEdit style={{marginRight:"5px"}}/>Edit Info</button>
                <button
                style={{
                    margin:'0px 4px',
                    borderRadius:'15px',
                    border:'none',
                    padding:'4px 10px',
                    display:'inline-flex',
                    alignItems:"center"
                    }}
                    className="button"
                    
                    onClick={()=>{
                    
                      // only ask user to create an account if user has not created one.
                      // here, if isSampleAccount:false , then user switch to Real account.

                      if(business.isSampleAccount){
                        userNameInfoModal({business,updateBusiness});

                      }else{
                        // sign out
                        const _business=JSON.parse(localStorage.getItem("business"));
                        _business.isSignOut=true;
                        localStorage.setItem("business",JSON.stringify(_business));
                        // update the state, so it re-renders 
                        updateBusiness({
                            ...business,
                            ..._business
                        })
                      }
                       
                    }}>
                        
                        <FaSignOutAlt style={{marginRight:'4px'}} />Sign Out</button>
                </div>
                
            </div>
            <div>

               
            </div>

   
        <div
        style={{
            flex:1,
            display:'flex',
            justifyContent:"center",
            marginTop:'40px',
           
           
         
        }}>
            <div
            style={{
                width: '400px',
                boxShadow: 'rgba(0, 30, 43, 0.3) 0px 4px 10px -4px',
                padding:'50px',
                borderRadius:'20px'
            }}>

          
            
             <table className='business_info'>
                    <tbody>
                    <tr >
                            <td>Business Name</td>
                            <td>{business.businessName}</td>
                        </tr>
                        <tr>
                            <td>Business Address</td>
                            <td>{business.businessAddress}</td>
                        </tr>
                        <tr>
                            <td>Business Phone</td>
                            <td>{business.businessPhone}</td>
                        </tr>
                        <tr>
                            <td>Business Email</td>
                            <td>{business.businessEmail}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
           
          
           
       
        </div>
        </div>
    )
}

export default Profile;