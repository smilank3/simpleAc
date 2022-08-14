
import React from 'react'


const Doc = () => {
    return (
        <div>
            <h1 className='label_title'>Documentation</h1>
            <div style={{
                marginTop: '30px'
            }}>
                <div style={{textAlign:'left'}}><a href="https://courses.lumenlearning.com/suny-finaccounting/chapter/sales-journal/" target="_blank">More Information</a></div>
                <div style={{ margin: '10px 0px' }}>

                    <h4 className='label_title'>Sales Journal</h4>

                    <p style={{ textAlign: 'left', padding: '5px' }}>
                        Sales journal is used to record <bold>ALL CREDIT SALES</bold>. This means the customer has not paid but we will receive payment in the future.
                    </p>

                </div>
                <div style={{ margin: '10px 0px' }}>
                    <h4 className='label_title'>Purchase Journal</h4>
                    <p style={{ textAlign: 'left', padding: '5px' }}>
                    Purchases journal is used to record <bold>ALL CREDIT PURCHASES</bold>. This means purchases we have not paid for but will pay for in the future.

                    </p>

                </div>
                <div style={{ margin: '10px 0px' }}>
                    <h4 className='label_title'>Cash receipts Journal</h4>
                    <p style={{ textAlign: 'left', padding: '5px' }}> 
                   Cash receipts journal is used to record <bold>ALL CASH RECEIPTS</bold>. Anytime money comes into the company, the cash receipts journal should be used.

                    </p>

                </div>
                <div style={{ margin: '10px 0px' }}>
                    <h4 className='label_title'>Cash disbursements Journal</h4>
                    <p style={{ textAlign: 'left', padding: '5px' }}>
                        Cash disbursements journal is used to record <bold>ALL CASH PAYMENTS</bold>.Anytime cash leaves the company, it should be recorded in the cash disbursement journal.
                    </p>

                </div>
                <div style={{ margin: '10px 0px' }}>

                    <h4 className='label_title'>General Journal</h4>
                    <p style={{ textAlign: 'left', padding: '5px' }}>

                    General journal is used to record adjusting and closing entries and any other entries that do not fit in one of the special journals.
                    </p>

                </div>







            </div>
        </div>
    )
}

export default Doc;