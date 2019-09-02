import Handlebars from "handlebars";

const templateString = `<div class="template-body">
<div class="rimowaLogoText">RIMOWA</div>
<p class="rimowaSubtitle">Client Care</p>
<h1>Hello {{firstName}}</h1>
<p> Below is the summary of your repair ticket:</p>


<ul class="items"> <h3> You have requested to repair the following items:</h3>
  {{#each items as |item i|}}
  <h4> Item No. {{inc i}} </h4>

   			<li> Due date: {{needsBy}} </li>
        <li> Serial Number: {{serialNumber}}</li>
        <li>Lock Number Combination: {{lockCombo}}</li>
        <li>Model: {{model}}</li>
        <li>Description: {{reasonForRepair}}</li>
        <li>Warranty: {{warranty}}</li>

  {{/each}}
</ul>


<h3>You have provided the following contact information:</h3>
<p>Phone number: {{phone}}</p>
<p>Email: {{email}}</p>

<h3> Your shipping and billing address is:</h3>
<p> {{firstName}} {{lastName}}</p>
<p>{{shippingAddress}}</p>

</div>`;

const templateFunction = Handlebars.compile(templateString);

export const getEmailTemplate = data => {
  return templateFunction(data);
};
