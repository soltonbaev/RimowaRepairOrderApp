const templateString = `<div class="template-body">
<div class="rimowaLogoText">RIMOWA</div>
<p class="rimowaSubtitle">Client Care</p>
<h1>Hello {{firstName}}</h1>
<p> Below is the summary of your repair ticket:</p>


<ul class="items"> <h3> You have requested to repair the following items:</h3>
  {{#each items as |item i|}}
  <h4> Item No. {{i}} </h4>
  
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

</div>`

const templateFunction = Handlebars.compile(templateString)
const htmlOutput = templateFunction(

{ uid: "f86f8794-6d11-4665-9c98-4dc518c930ab",
    date: "2019-08-27T21:35:52.126Z",
    firstName: "Denys",
    lastName: "Andreiev",
    email: "denisandreev64@gmail.com",
    phone: "9292532329",
    companyName: "company name",
    shippingAddress: "1914 Bay Ridge parkway apt. 1R",
    shipWhenComplete: true,
    items: [
      {
        needsBy: "2019-08-29T21:34:00.000Z",
        serialNumber: "123",
        lockCombo: "1234",
        model: "model1",
        reasonForRepair: "broken wheel",
        warranty: true,
        uid: "7902b9f6-79ad-4cdc-aac3-ff23f3f2361e"
      },
      {
        needsBy: "2019-08-30T21:35:00.000Z",
        serialNumber: "12345",
        lockCombo: "5689",
        model: "model2",
        reasonForRepair: "handle broken",
        warranty: true,
        uid: "902f4ae5-85bf-4094-a087-d32b9b94bc01"
      }
    ],
    associateName: "associate 123"
}
)

document.getElementById('output').innerHTML = htmlOutput;