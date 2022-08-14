

const CalculateTotal=(journalEntries,field)=>{
    return journalEntries.reduce((prev,curr)=>prev+curr[field],0);


}


export {
    CalculateTotal,
}