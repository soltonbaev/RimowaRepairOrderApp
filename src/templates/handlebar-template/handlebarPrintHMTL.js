import Handlebars from "handlebars";
import moment from "moment";
Handlebars.registerHelper("dateConvert", function (value, options) {
  return moment(value).format("MMM DD YYYY");
});
export const templateString = `

        <div class="pageContainer" style="border: 1px solid lightgrey;  width: 100vw; height: 100vh; page-break-after: always;">
                    <div class="rimowaLogoText" style="text-align: center;margin: 5px;font-size: 25px;font-weight: 400;font-family: &quot;Favorit Light&quot;, Arial, sans-serif;color: #00000091;">
                    RIMOWA
                    </div>
                <p class="rimowaSubtitle" style="text-align: center;text-transform: uppercase;letter-spacing: 2px;font-size: 10px;margin: 0% 0% 2% 0;color: #00000091;">Client Care</p>
                <p class="ticketSummary" style="text-align: center;text-transform: uppercase;letter-spacing: 1px;font-size: 14px;"> Ticket Summary </p>


                <div class="clientToCompleteTable" style=" border: 1px solid grey;padding: 20px 10px;margin: 20px;">

                    <table>
                    <tr><th style="padding: 10px 20px;text-align: left;">Client to Complete:</th></tr>
                      <tr>
                        <td style="padding: 2px 20px 2px 20px;">First Name:</td>
                        <td style="padding: 2px 20px 2px 20px;">{{customer.firstName}}</td>
                      </tr>
                      <tr>
                        <td style="padding: 2px 20px 2px 20px;">Last Name: </td>
                        <td style="padding: 2px 20px 2px 20px;">{{customer.lastName}}</td>
                      </tr>
                      <tr>
                        <td style="padding: 2px 20px 2px 20px;">Email: </td>
                        <td style="padding: 2px 20px 2px 20px;">{{customer.email}}</td>
                      </tr>
                      <tr>
                        <td style="padding: 2px 20px 2px 20px;">Phone:  </td>
                        <td style="padding: 2px 20px 2px 20px;">{{customer.phone}}</td>
                      </tr>
                      <tr>
                        <td style="padding: 2px 20px 2px 20px;"> Company Name: </td>
                        <td style="padding: 2px 20px 2px 20px;">  {{customer.companyName}} </td>
                      </tr>
                        <tr>
                        <td style="padding: 2px 20px 2px 20px;">  Shipping Address:  </td>
                        <td style="padding: 2px 20px 2px 20px;"> {{shippingAddress}} </td>
                      </tr>
                        <tr>
                        <td style="padding: 2px 20px 2px 20px;"> Ship when complete:  </td>
                        <td style="padding: 2px 20px 2px 20px;">  {{shipWhenComplete}} </td>
                      </tr>

                    </table>

                 </div>
                    <div class="signatureContainer" style="margin: 20px;text-align: center;">
                          <h3 style="margin: 5% 0 5% 0;"> Client's Signature: </h3>
                          <img class="signature-image" src="{{{signature}}}" style="max-width: 50%;"/>
                    </div>
        </div>



  {{#each customer.customer_items as |item i|}}
 
  <div class="pageContainer"style="width: 100vw; height: 100vh; page-break-after: always; border: 1px solid lightgrey;">

  <table>
<tr><th style="padding: 10px 20px;text-align: left;">Associate to Complete:</th>
</tr><tr><td style="padding: 2px 20px 2px 20px;">Associate Name:</td>
<td style="padding: 2px 20px 2px 20px;">{{associateName}}</td></tr></table>
          <table >
            <tr><th class="itemTitle" style="padding: 10px 20px;text-align: left;">Item {{inc i}}</th></tr>
      <tr>
        <td style="padding: 2px 20px 2px 20px;">Due date:</td>
        <td style="padding: 2px 20px 2px 20px;">{{dateConvert needsBy}}</td>
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
        <td style="padding: 2px 20px 2px 20px;"> {{warranty}} </td>
      </tr>
      </table>
  </div>
      {{/each}}

`;



const templateFunction = Handlebars.compile(templateString);

export const getHTMLDBTemplate = data => {
  return templateFunction(data);
};
