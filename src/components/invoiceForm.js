import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles , useTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import './invoiceForm.css'
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  multiline:{
    width:'400px',
  },
  payment:{
    width:'195px',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  item:{
    width:'500px',
    padding:'5px'
  },
  quantity:{
    width:'50px',
    padding:'5px'
  },
  rate:{
    width:'70px',
    padding:'5px'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function FormPropsTextFields() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [clientData, setClientdata] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("https://codeunity-invoice-backend.herokuapp.com/client")
      .then((res) => {
        setClientdata(res.data.data.results)
      })
  };


  ///functions for add item

  const [fields, setFields] = React.useState([{ item: '' ,quantity: 0,rate:0,amount:0}]);
  const [subTotal,setSubTotal]= React.useState(0);
  const [total,setTotal]= React.useState(0);
  const [tax,setTax]= React.useState(0);


  const [invoiceData,setState] = React.useState({from:'',billTo:'',shipTo:'',items:fields,notes:'',terms:'',date:'',dueDate:'',paymentTerms:'',subTotal,total,tax});
  function handleChanges(i, event) {
    const items = [...fields];
    items[i].item = event.target.value;
    setFields(items);
  }
  function handleChangesforQuantity(i, event) {
    const items = [...fields];
    let sub = subTotal;
    let tot = total;
    sub=sub-items[i].amount;
    items[i].quantity = event.target.value;
    items[i].amount = event.target.value * items[i].rate ;
    sub=sub+items[i].amount;
    tot= sub+sub*tax/100;
    setSubTotal(sub);
    setTotal(tot);
    setFields(items);
  }
  function handleChangesforRate(i, event) {
    const items = [...fields];
    let sub = subTotal;
    let tot = total;
    sub=sub-items[i].amount;
    items[i].rate = event.target.value;
    items[i].amount = event.target.value*items[i].quantity;
    sub=sub+items[i].amount;
    tot= sub+sub*tax/100;
    setSubTotal(sub);
    setTotal(tot);
    setFields(items);
  }

  function handleAdd() {
    const items = [...fields];
    items.push({ item: '',quantity:0,rate:0 ,amount:0});
    setFields(items);
  }

  function handleRemove(i) {
    const items = [...fields];
    items.splice(i, 1);
    setTotal(Math.ceil((subTotal-(fields[i].amount))*(1+tax/100)));
    setSubTotal(subTotal-(fields[i].amount));
    setFields(items);
  }

  function handleTaxChange(e){
    setTax(e.target.value);
    setTotal(Math.ceil(subTotal*(1+e.target.value/100)));
  }

  function printdata(){
    const data = invoiceData;
    data.items = fields;
    data.subTotal = subTotal;
    data.total = total;
    data.tax= tax;
    setState(data);
    console.log(invoiceData);
    console.log(clientData);
  }

  const handleDataChange = e =>{
    setState({
      ...invoiceData,
      [e.target.name]: e.target.value

    })
  }




  return (
    <div>
      <h1 style={{marginLeft:'300px',marginTop:'50px'}}>
        Generate Invoice
      </h1>
        <Box className="form">
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Select Client</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  value={personName}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {clientData.map((name) => (
                    <MenuItem key={name.client_name} value={name.client_name} style={getStyles(name.client_name, personName, theme)}>
                      {name.client_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </div>
          <div style ={{marginLeft:'10px'}}>
              <form  noValidate autoComplete="off">
                  <div className="leftDivision">
                    <div style={{ marginRight: '15px'}} >
                        <TextField
                          id="outlined-full-width"
                          required
                          placeholder="Who is invoice from (required)"
                          fullWidth
                          margin="normal"
                          name="from"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          onChange={handleDataChange}
                          
                        />
                    </div>
                      <div style={{float:"left",marginRight :"15px",marginTop:'30px',marginBottom:'30px'}}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Bill To"
                        name="billTo"
                        variant="outlined"
                        onChange={handleDataChange}
                        />
                      </div>
                      <div style={{float:"left",marginRight :"15px",marginTop:'30px',marginBottom:'30px'}}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Ship To"
                        name="shipTo"
                        variant="outlined"
                        onChange={handleDataChange}
                        />
                      </div>
                  </div>
                  <div>
                      <div style={{float:"right",marginTop:'30px',marginRight :"15px",marginBottom:'10px',marginLeft :"45px"}}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Date"
                        name="date"
                        placeholder="yyyy-mm-dd"
                        variant="outlined"
                        onChange={handleDataChange}
                        />
                      </div>
                      <div style={{float:'right',marginLeft :"45px",marginBottom:'10px',marginRight :"15px"}}>
                        <TextField
                            id="outlined-textarea"
                            label="Payment Terms"
                            multiline
                            variant="outlined"
                            name="paymentTerms"
                            onChange={handleDataChange}
                            inputProps={{className:classes.payment}}

                          />
                      </div>
                      <div style={{float:"right",marginBottom:'10px',marginRight :"15px",marginLeft :"45px"}}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Due Date"
                        placeholder="yyyy-mm-dd"
                        name="dueDate"
                        variant="outlined"
                        onChange={handleDataChange}
                        />
                      </div>

                  </div>
                  <div className="addItem">
                    <div className="item">
                      Item
                    </div>
                    <div className = "quantity">
                      Quantity
                    </div>
                    <div className = "rate">
                      Rate
                    </div>
                    <div className = "rate">
                      Amount
                    </div>          
                  </div>
              </form>    
          </div>
          <div className="itemInput">
              {fields.map((field, idx) => {
                return (
                  <div key={`${field}-${idx}`}>
                    <TextField
                      name
                      id="outlined"
                      style={{ margin: 8 }}
                      placeholder="Description of service or product.."
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        className:classes.item,
                      }}
                      variant="outlined"
                      value={field.item || ""}
                      onChange={e => handleChanges(idx, e)}
                    />
                    <TextField
                      id="outlined"
                      style={{ margin: 8}}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        className:classes.quantity,
                      }}
                      variant="outlined"
                      value={field.quantity}
                      onChange={e => handleChangesforQuantity(idx, e)}
                    />
                    <TextField
                      id="outlined"
                      style={{ margin: 8}}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        className:classes.rate,
                      }}
                      variant="outlined"
                      value={field.rate}
                      onChange={e => handleChangesforRate(idx, e)}
                    />
                    <TextField
                      id="outlined"
                      style={{ margin: 8}}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        className:classes.rate,
                        readOnly: true,
                      }}
                      variant="outlined"
                      value={field.amount}
                      onChange={e => handleChangesforRate(idx, e)}
                    />
                    <IconButton size ="small" aria-label="Delete" onClick={() => handleRemove(idx)} style={{marginTop:"6px"}}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  
                );
                
              })}
              <Button variant="contained" color="primary" onClick={handleAdd}>
                  Add item
              </Button>
              </div>
              <div>
                <div style={{float:'left',overflow:'hidden'}}>
                  <div style={{marginTop:'15px',marginRight:"300px"}}>
                    <TextField
                      id="outlined-textarea"
                      label="Notes"
                      placeholder="Notes - any relevant information already not covered"
                      multiline
                      variant="outlined"
                      name="notes"
                      onChange={handleDataChange}
                      inputProps={{
                        className:classes.multiline
                      }}

                    />
                  </div>
                  <div style={{marginTop:"15px",marginRight:"200px"}}>
                    <TextField
                      id="outlined-textarea"
                      label="Terms"
                      placeholder="Terms and conditions"
                      multiline
                      name="terms"
                      variant="outlined"
                      onChange={handleDataChange}
                      inputProps={{
                        className:classes.multiline
                      }}
                    />
                  </div>
                </div>
                
                <div style={{float:'right',marginBottom:'10px',marginRight :"15px"}}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Sub total in ₹"
                  inputProps={{
                    readOnly: true,
                  }}
                  value={subTotal}
                  variant="outlined"
                  />
                </div>
                <div style={{float:'right',marginBottom:'10px',marginRight :"15px"}}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Tax in %"
                  variant="outlined"
                  onChange ={e=> handleTaxChange(e)}
                  defaultValue='0'
                  />
                </div>
                <div style={{float:'right',marginBottom:'10px',marginRight :"15px"}}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Total in ₹"
                  value={total}
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  />
                </div>
                <div style={{clear:'both'}}>
                </div>
              </div>
      </Box>
      <div style={{marginLeft:"300px",marginBottom:"30px",marginTop:"10px"}}>
        <Button variant="contained" color="primary" onClick={printdata}>
                Download Invoice
        </Button>
      </div>
    </div>
  );
}