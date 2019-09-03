import Handlebars from "handlebars";
Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("boolToStr", function(value, options) {
  return value ? "Yes" : "No";
});

const templateString = `<div class="template-body" style="margin: 5%;font-family: &quot;Favorit Light&quot;, Arial, sans-serif;">


<div class="rimowaLogoText" style="text-align: center;margin: 5px;font-size: 25px;font-weight: 400;font-family: &quot;Favorit Light&quot;, Arial, sans-serif;color: #00000091;">RIMOWA</div>
<p class="rimowaSubtitle" style="text-align: center;text-transform: uppercase;letter-spacing: 2px;font-size: 10px;margin: 0% 0% 2% 0;color: #00000091;">Client Care</p>
<p class="ticketSummary" style="text-align: center;text-transform: uppercase;letter-spacing: 1px;font-size: 14px;"> Hello {{firstName}}, here is your ticket confirmation </p>

<div class="clientToCompleteTable" style="margin: 20px; border: 1px solid lightgrey; padding: 20px 10px;">
<table>
  <tr>
    <td style="padding: 2px 20px 2px 20px;">First Name:</td>
    <td style="padding: 2px 20px 2px 20px;">{{firstName}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 20px 2px 20px;">Last Name: </td>
    <td style="padding: 2px 20px 2px 20px;">{{lastName}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 20px 2px 20px;">Email: </td>
    <td style="padding: 2px 20px 2px 20px;">{{email}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 20px 2px 20px;">Phone:  </td>
    <td style="padding: 2px 20px 2px 20px;">{{phone}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 20px 2px 20px;"> Company Name: </td>
    <td style="padding: 2px 20px 2px 20px;">  {{companyName}} </td>
  </tr>
     <tr>
    <td style="padding: 2px 20px 2px 20px;">  Shipping Address:  </td>
    <td style="padding: 2px 20px 2px 20px;"> {{shippingAddress}} </td>
  </tr>
     <tr>
    <td style="padding: 2px 20px 2px 20px;"> Ship when complete:  </td>
    <td style="padding: 2px 20px 2px 20px;">  {{boolToStr shipWhenComplete}} </td>
  </tr>

</table>
</div>

<div class="associateToCompleteTable" style="margin: 20px;border: 1px solid lightgrey;padding: 20px 10px;">
<p class="ticketSummary" style="text-align: center;text-transform: uppercase;letter-spacing: 1px;font-size: 14px;"> You have requested to repair the following items:
  {{#each items as |item i|}}


        <table>
        <tr><th class="itemTitle" style="padding: 10px 20px;text-align: left;">Item {{inc i}}</th></tr>
  <tr>
    <td style="padding: 2px 20px 2px 20px;">Due date:</td>
    <td style="padding: 2px 20px 2px 20px;">{{needsBy}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 20px 2px 20px;">Serial Number: </td>
    <td style="padding: 2px 20px 2px 20px;">{{serialNumber}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 20px 2px 20px;">Lock Combo: </td>
    <td style="padding: 2px 20px 2px 20px;">{{lockCombo}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 20px 2px 20px;">Model:  </td>
    <td style="padding: 2px 20px 2px 20px;">{{model}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 20px 2px 20px;"> Reason For Repair  </td>
    <td style="padding: 2px 20px 2px 20px;">  {{reasonForRepair}} </td>
  </tr>
     <tr>
    <td style="padding: 2px 20px 2px 20px;">  Warranty:  </td>
    <td style="padding: 2px 20px 2px 20px;"> {{boolToStr warranty}} </td>
  </tr>
  </table>

  {{/each}}
  </p></div>


</div>`;

const templateFunction = Handlebars.compile(templateString);

export const getEmailTemplate = data => {
  return templateFunction(data);
};
