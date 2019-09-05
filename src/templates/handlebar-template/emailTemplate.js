import Handlebars from "handlebars";
import moment from "moment";
Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("boolToStr", function(value, options) {
  return value ? "Yes" : "No";
});

Handlebars.registerHelper("dateConvert", function(value, options) {
  return moment(value).format("MMM DD YYYY");
});

const templateString = `<div class="template-body" style="margin: 5px;font-family: &quot;Favorit Light&quot;, Arial, sans-serif;">


<div class="rimowaLogoText" style="text-align: center;margin: 5px;font-size: 25px;font-weight: 400;font-family: &quot;Favorit Light&quot;, Arial, sans-serif;color: #00000091;">RIMOWA</div>
<p class="rimowaSubtitle" style="text-align: center;text-transform: uppercase;letter-spacing: 2px;font-size: 10px;margin: 0% 0% 2% 0;color: #00000091;">Client Care</p>
<p class="ticketSummary" style="text-align: center;text-transform: uppercase;letter-spacing: 1px;font-size: 14px;"> Hello {{firstName}}, here is your ticket confirmation </p>

<div class="clientToCompleteTable" style="margin: 2px; border: 1px solid lightgrey; padding: 20px 2px;">
<table style="table-layout: fixed; width: 100%;>
  <tr>
    <td style="padding: 2px 5px 2px 5px;">First Name:</td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{firstName}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 5px 2px 5px;">Last Name: </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{lastName}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 5px 2px 5px;">Email: </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{email}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 5px 2px 5px;">Phone:  </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{phone}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 5px 2px 5px;"> Company Name: </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{companyName}} </td>
  </tr>
     <tr>
    <td style="padding: 2px 5px 2px 5px;">  Shipping Address:  </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{shippingAddress}} </td>
  </tr>
     <tr>
    <td style="padding: 2px 5px 2px 5px;"> Ship when complete:  </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"> {{boolToStr shipWhenComplete}} </td>
  </tr>

</table>
</div>

<div class="associateToCompleteTable" style="margin: 2px;border: 1px solid lightgrey;padding: 20px 2px;">
<p class="ticketSummary" style="text-align: center;text-transform: uppercase;letter-spacing: 1px;font-size: 14px;"> You have requested to repair the following items:
  {{#each items as |item i|}}


        <table style="table-layout: fixed; width: 100%;>
        <tr><th class="itemTitle" style="padding: 2px 5px;text-align: left;">Item {{inc i}}</th></tr>
  <tr>
    <td style="padding: 2px 5px 2px 5px;">Due date:</td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{dateConvert needsBy}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 5px 2px 5px;">Serial Number: </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{serialNumber}}</td>
  </tr>
  <tr>
    <td style="padding: 2px 5px 2px 5px;">Lock Combo: </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{lockCombo}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 5px 2px 5px;">Model:  </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{model}}</td>
  </tr>
   <tr>
    <td style="padding: 2px 5px 2px 5px;"> Reason For Repair  </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"> {{reasonForRepair}} </td>
  </tr>
     <tr>
    <td style="padding: 2px 5px 2px 5px;">  Warranty:  </td>
    <td style="padding: 2px 5px 2px 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{boolToStr warranty}} </td>
  </tr>
  </table>

  {{/each}}
  </p></div>


</div>`;

const templateFunction = Handlebars.compile(templateString);

export const getEmailTemplate = data => {
  return templateFunction(data);
};
