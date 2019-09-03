import Handlebars from "handlebars";

export const templateString = `<div class="template-body">
<div class="template-body">
<div class="rimowaLogoText">RIMOWA</div>
<p class="rimowaSubtitle">Client Care</p>
<p class="ticketSummary"> Ticket Summary </p>

<div class="clientToCompleteTable">
<table>
<tr><th>Client to Complete:</th></tr>
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

<div class="associateToCompleteTable">
 <table>
 <tr><th>Associate to Complete:</th>
 <tr><td>Associate Name:</td>
 <td>{{associateName}}</td></tr></table>
  {{#each customer.customer_items as |item i|}}


        <table>
        <tr><th class="itemTitle">Item {{i}}</th></tr>
  <tr>
    <td>Due date:</td>
    <td>{{needsBy}}</td>
  </tr>
  <tr>
    <td>Serial Number: </td>
    <td>{{serialNumber}}</td>
  </tr>
  <tr>
    <td>Lock Combo: </td>
    <td>{{lockCombo}}</td>
  </tr>
   <tr>
    <td>Model:  </td>
    <td>{{model}}</td>
  </tr>
   <tr>
    <td> Reason For Repair  </td>
    <td>  {{reasonForRepair}} </td>
  </tr>
     <tr>
    <td>  Warranty:  </td>
    <td> {{warranty}} </td>
  </tr>
  </table>

  {{/each}}
  </div>


<div class="signatureContainer">
<h3> Client's Signature: </h3>
<img class="signature-image" src="{{signature}}">
</div>

</div>`;

const templateFunction = Handlebars.compile(templateString);

export const getPDFTemplate = data => {
  return templateFunction(data);
};
