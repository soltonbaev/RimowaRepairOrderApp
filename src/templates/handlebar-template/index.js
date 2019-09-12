import Handlebars from "handlebars";
import "./handlebar-css.css";
import moment from "moment";
Handlebars.registerHelper("dateConvert", function(value, options) {
  return moment(value).format("MMM DD YYYY");
});
Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});
const templateString = `<div class="template-body">
<p class="ticketSummary"> Ticket Details</p>

<div class="clientToCompleteTable" >
<h3>Client to Complete:</h3>
<div style="display: flex; flex-direction: row;">
<div style="flex:1;">
<table class="clientTb1">
  <tr>
    <td>First Name:</td>
    <td>{{customer.firstName}}</td>
  </tr>
  <tr>
    <td>Last Name: </td>
    <td>{{customer.lastName}}</td>
  </tr>
  <tr>
    <td>Email: </td>
    <td>{{customer.email}}</td>
  </tr>
   <tr>
    <td>Phone:  </td>
    <td>{{customer.phone}}</td>
  </tr>
  </table>
  </div>

  <div style="flex:1;">
  <table class="clientTb2">
   <tr>
    <td> Company Name: </td>
    <td>  {{customer.companyName}} </td>
  </tr>
     <tr>
    <td>  Shipping Address:  </td>
    <td> {{shippingAddress}} </td>
  </tr>
     <tr>
    <td> Ship when complete:  </td>
    <td>  {{shipWhenComplete}} </td>
  </tr>

</table>
</div>
</div>
</div>
</div>

<div class="associateToCompleteTable">
<h3>Associate to Complete:</h3>
 <table>
 
 <tr><td>Associate Name:</td>
 <td>{{associateName}}</td></tr></table>
  {{#each customer.customer_items as |item i|}}

  <div style="display: flex; flex-direction: row;">
<div style="flex:1;">
        <table class="associateTb1">
        <tr><th class="itemTitle">Item {{inc i}}</th></tr>
  <tr>
    <td>Due date:</td>
    <td>{{dateConvert needsBy}}</td>
  </tr>
  <tr>
    <td>Origin:</td>
    <td>{{walkinOrShipped}}</td>
  </tr>
  <tr>
    <td>Serial Number: </td>
    <td>{{serialNumber}}</td>
  </tr>
  <tr>
    <td>Lock Combo: </td>
    <td>{{lockCombo}}</td>
  </tr>
  </table>
  </div>
  <div style="flex:1;">
  <table class="associateTb2">
  <tr><td><br/></br></td></tr>
   <tr>
    <td>Model:  </td>
    <td>{{model}}</td>
  </tr>
   <tr>
    </td>
  </tr>
     <tr>
    <td>  Warranty:  </td>
    <td> {{warranty}} </td>
  </tr>
  <tr>
  <td>  Replacement Case Issued  </td>
  <td> {{replacementCaseIssued}} </td>
</tr>
<tr>
<td>  Damaged by Third Party (Airline):  </td>
<td> {{damagedBy3rdParty}} </td>
</tr>
  </table>
  </div>
</div>
  <div>
  <ul>

  <h4> Reason For Repair</h4>
  {{#each reasonForRepair as |item i|}}
<li style="margin:10px"> {{item i}} </li>

{{/each}}
</ul>
</div>
  {{/each}}
  </div>
</div>`;

export default Handlebars.compile(templateString);
