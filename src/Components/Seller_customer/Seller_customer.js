import { useState,useEffect } from 'react';
//import { Rings } from 'react-loader-spinner'
import * as XLSX from 'xlsx';
import './index.css';

//Creating SellerCustomer Component
const SellerCustomer=()=> {

  //Implementing The State For The Functionality
  const [excelFile,setExcelFile]=useState(null)
  const [typeError,setTypeError]=useState(null)
  const [excelData,setExcelData]=useState(null)
  const [invalidData,setInvalidData]=useState(null)

  const [form_name,setFormName]=useState('')
    
  // Handling the input file type and storing the excel data in the State
  const handleFile=(e)=>{
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    setFormName(e.target.files[0].name)
    console.log(e.target.files[0].name)
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }
      }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  }

  // Styles For Table
  const tableStyle = {
    fontFamily: "Arial, sans-serif",
    borderCollapse: "collapse",
    borderColor:'#000000',
  };

  // Styles For TableHeader
  const thStyle = {
    backgroundColor: "#ffffe0",
    border: "1px solid #333",
    textAlign: "center",
    paddingBottom: "11px",
    color:'rgb(105, 104, 104)',
    height: "50px",
    fontSize: "15px",
    width: "300px",
    padding:'10px',
    fontFamily: "sans-serif"
  };

  // Styles For Table Data
  const tdStyle = {
    backgroundColor: "#f5f5f5",
    border: "1px solid #000000",
    textAlign: "left",
    padding: "8px",
    width: "300px",
    padding:'10px',
    fontFamily: "sans-serif",
    fontSize: "14.5px"
  };

  // const renderLoadingView= () => (
  //   <div className="flex justify-center items-center ">
  //     <Rings color="#00BFFF" height={80} width={80} />
  //   </div>
  // );//

  //

  function areGSTINandPANSimilar(gstin, pan) {
    // checking Whether PAN AND GSTIN are similar or Not
      console.log(gstin.slice(2, 12) === pan)
      return gstin.slice(2, 12) === pan;
  } 

  //Checking The All The Feilds Whther Valid Or Not For Seller_customer File
  const handleValidationsForSeller_Customer=(data1)=>{

    const data=data1.slice(0,20)
    const allRowsHaveValidData = data.filter((row) => 
    row['ERP CUSTOMER CODE'] && row['Legal Name*'] && row['GSTIN'] && row['PAN'] && areGSTINandPANSimilar(row['GSTIN'], row['PAN']));
    setExcelData(allRowsHaveValidData)
    
    const allRowsDOntHaveERPCode1 = data.filter((row)=>!row['ERP CUSTOMER CODE'])
    const allRowsDOntHaveLegalName = data.filter((row)=>!row['Legal Name*'])
    const allRowsDOntHaveGSTIN = data.filter((row)=>!row['GSTIN'])
    const allRowsDOntHavePAN = data.filter((row)=>!row['PAN'])
    const allRowsPANANDGSTINNOTMATCHED = data.filter((row)=>((row['GSTIN']&& row['PAN'])&&!areGSTINandPANSimilar(row['GSTIN'], row['PAN'])))
 
    if (allRowsDOntHaveERPCode1.length>0 || allRowsDOntHaveLegalName.length>0 || allRowsDOntHaveGSTIN.length>0 || allRowsDOntHavePAN.length>0 || allRowsPANANDGSTINNOTMATCHED.length>0){
      
      const mappedInvalidERPCode =allRowsDOntHaveERPCode1&& allRowsDOntHaveERPCode1.map((row) => {
        if (!row['ERP CUSTOMER CODE']) {
         
          row['Reason'] = "Invalid ERP Code";
          
        }
        return row;
      });

      const mappedInvalidLegalName =allRowsDOntHaveLegalName&& allRowsDOntHaveLegalName.map((row) => {
        if (!row['Legal Name*']) {
         
          row['Reason'] = "Invalid Legal Name";
          
        }
        return row;
      });

      const mappedInvalidGSTIN =allRowsDOntHaveGSTIN&& allRowsDOntHaveGSTIN.map((row) => {
        if (!row['GSTIN']) {
          
          row['Reason'] = "Invalid GSTIN Number";
          
        }
        return row;
      });

      const mappedInvalidPAN =allRowsDOntHavePAN&& allRowsDOntHavePAN.map((row) => {
        if (!row['PAN']) {
         
          row['Reason'] = "Invalid PAN Number";
          
        }
        return row;
      });

      const mappedInvalidGSTINPAN =allRowsPANANDGSTINNOTMATCHED.map((row) => {
          
          row['Reason'] = "GSTIN & PAN IS NOT Matching";
          
        
        return row;
      });
       
      // concating all invalid data by using spred operator
      const res = [
        ...mappedInvalidERPCode,
        ...mappedInvalidLegalName,
        ...mappedInvalidGSTIN,
        ...mappedInvalidPAN,
        ...mappedInvalidGSTINPAN
      ];
      
      setInvalidData(res);
      
    }

  }

  //Checking The All The Feilds Whther Valid Or Not For Seller_Invoice File
  const handleValidationsForSeller_Invoice=(data1)=>{
    const data=data1.slice(0,20)
    const allRowsHaveValidData = data.filter((row) => 
    row['ERP Customer Code'] && row['Legal Name'] && row['Invoice No*'] && row['Invoice Date*'] && row['GSTIN'] && row['PAN'] && areGSTINandPANSimilar(row['GSTIN'], row['PAN']));
    setExcelData(allRowsHaveValidData)
    
    const allRowsDOntHaveERPCode1 = data.filter((row)=>!row['ERP Customer Code'])
    const allRowsDOntHaveLegalName = data.filter((row)=>!row['Legal Name'])
    const allRowsDOntHaveGSTIN = data.filter((row)=>!row['GSTIN'])
    const allRowsDOntHaveInvoiceNumber = data.filter((row)=>!row['Invoice No*'])
    const allRowsDOntHaveInvoiceDate = data.filter((row)=>!row['Invoice Date*'])
    const allRowsDOntHavePAN = data.filter((row)=>!row['PAN'])
    const allRowsPANANDGSTINNOTMATCHED = data.filter((row)=>((row['GSTIN']&& row['PAN'])&&!areGSTINandPANSimilar(row['GSTIN'], row['PAN'])))
    
 
    if (allRowsDOntHaveERPCode1.length>0 || allRowsDOntHaveLegalName.length>0 || allRowsDOntHaveGSTIN.length>0 || allRowsDOntHavePAN.length>0 || allRowsPANANDGSTINNOTMATCHED.length>0 || allRowsDOntHaveInvoiceNumber.length>0 || allRowsDOntHaveInvoiceDate.length>0){
      
      const mappedInvalidERPCode =allRowsDOntHaveERPCode1&& allRowsDOntHaveERPCode1.map((row) => {
        if (!row['ERP Customer Code']) {
         
          row['Reason'] = "Invalid ERP Code";
          
        }
        return row;
      });

      const mappedInvalidLegalName =allRowsDOntHaveLegalName&& allRowsDOntHaveLegalName.map((row) => {
        if (!row['Legal Name']) {
         
          row['Reason'] = "Invalid Legal Name";
          
        }
        return row;
      });

      const mappedInvalidGSTIN =allRowsDOntHaveGSTIN&& allRowsDOntHaveGSTIN.map((row) => {
        if (!row['GSTIN']) {
          
          row['Reason'] = "Invalid GSTIN Number";
          
        }
        return row;
      });

      const mappedInvalidPAN =allRowsDOntHavePAN&& allRowsDOntHavePAN.map((row) => {
        if (!row['PAN']) {
         
          row['Reason'] = "Invalid PAN Number";
          
        }
        return row;
      });

      const mappedInvalidGSTINPAN =allRowsPANANDGSTINNOTMATCHED.map((row) => {
          
          row['Reason'] = "GSTIN & PAN IS NOT Matching";
          
        
        return row;
      });

      const mappedInvalidInvoiceNumber =allRowsDOntHaveInvoiceNumber.map((row) => {
        if (!row['Invoice No*']) {
         
          row['Reason'] = "Invalid Invoice Number";
          
        }
        return row;
      });

      const mappedInvalidInvoiceDate =allRowsDOntHaveInvoiceDate&& allRowsDOntHaveInvoiceDate.map((row) => {
        if (!row['Invoice Date*']) {
         
          row['Reason'] = "Invalid Invoice Date";
          
        }
        return row;
      });

      // concating all invalid data by using spred operator
      const res = [
        ...mappedInvalidERPCode,
        ...mappedInvalidLegalName,
        ...mappedInvalidGSTIN,
        ...mappedInvalidPAN,
        ...mappedInvalidGSTINPAN,
        ...mappedInvalidInvoiceNumber,
        ...mappedInvalidInvoiceDate
      ];

    setInvalidData(res);}
  }

  //handling Sumbit Of Excel File
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
  
      //Based On Form Name handling validations Of Form By Using SwitchCase
      switch (form_name) {
        case 'Seller_customer.xlsx':
          handleValidationsForSeller_Customer(data)
          break;
        case 'Seller_invoice.xlsx':
           handleValidationsForSeller_Invoice(data)
          break;
        default:
          break;
      }
    }
  };
 
  //rendering Valid And Invalid Tables for all files based on file Name
  const renderTablesView=()=>(
    excelData ? (
      <div className='row'>
      <>
      <h3 className='custom-heading-1'>Valid data</h3>
      
        <div className="table-container">
           <table style={tableStyle} className="new-table-styles">
         <thead>
           <tr>
             {Object.keys(excelData[0]).map((key) => (
               <th style={thStyle} key={key}>
                 {key}
               </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {excelData.map((individualData, index) => (
             <tr key={index}>
               {Object.keys(individualData).map((key) => (
                 <td style={tdStyle} key={key}>
                   {(individualData[key]==='')?'hello':individualData[key]}
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
       </div>
       </>

       {invalidData && (
        <>
        <h3 className='custom-heading-2'>InValid data</h3>
         <div className="table-container">
            <table style={tableStyle} className="new-table-styles">
             <thead>
               <tr>
                 {Object.keys(invalidData[0]).map((key) => (
                   <th style={thStyle} key={key}>
                     {key}
                   </th>
                 ))}
               </tr>
             </thead>
             <tbody>
               {invalidData.map((individualData, index) => (
                 <tr key={index}>
                   {Object.keys(individualData).map((key) => (
                     <td style={tdStyle} key={key} className={(individualData[key] === 'Invalid ERP Code' || individualData[key] === 'Invalid Legal Name' || individualData[key] === 'Invalid GSTIN Number' || individualData[key] === 'Invalid PAN Number' || individualData[key]==='PAN & GSTIN Didnt Matched' || individualData[key]==='GSTIN & PAN IS NOT Matching' || individualData[key]==='Invalid Invoice Number' || individualData[key]==='Invalid Invoice Date') &&'err-msg'}>
                       {individualData[key]}
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         </>
         )
       }
         </div>
       
       
       ) : (
     <img
       src='https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg?size=626&ext=jpg&ga=GA1.1.1688508127.1693215068&semt=ais'
       className='no-data-image'
       alt='no-data'
     />
   )
  )

  // rendering Final Output
  return (
    <div className={!excelData?"App":'App-1'}>
      <h2 className='custom-heading'>{excelData?form_name:'Upload & View Excel Sheets'}</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='flex'>
      <input type="file" required onChange={handleFile}/>
      <button className='upload-button' type='submit'>Upload</button>
      </div>
      {typeError&&(
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>
      
      <div className='viewer'>
      {renderTablesView()}
      </div>

    </div>
  );
  

}

// Exporting App Component
export default SellerCustomer;